const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const userDao = require('../daos/user');
const refreshTokenDao = require('../daos/refreshToken');
const {
  generateSalt,
  encryptPassword,
  comparePassword,
} = require('../utils/security');

const {
  JWT_REFRESH_KEY,
  JWT_REFRESH_KEY_EXPIRES_TIME,
  JWT_ACESS_KEY,
  JWT_ACESS_KEY_EXPIRES_TIME,
} = require('./../configs');

const generateToken = async (user) => {
  const accessToken = await creatAccessToken(user._id);
  let refreshToken = user.refreshTokenId;
  try {
    jwt.verify(refreshToken.value, JWT_REFRESH_KEY);
  } catch (err) {
    const value = await creatRefreshToken(user);
    refreshToken = await refreshTokenDao.updateToken(refreshToken._id, {
      value,
    });
  }

  return { accessToken, refreshToken: refreshToken.value };
};

const register = async ({
  firstname,
  lastname,
  password,
  birthDate,
  email,
}) => {
  let user = await userDao.findUser({ email });
  const salt = await generateSalt();
  const hash_pass = await encryptPassword(password, salt);
  if (user) throw new CustomError(errorCodes.USER_EXISTS);

  user = await userDao.createUser({
    firstname,
    lastname,
    password: hash_pass,
    birthDate,
    email,
    refreshTokenId: null,
  });
  const userId = user._id;
  //add refreshtoken to new user register
  const valueToken = await jwt.sign({ userId }, JWT_ACESS_KEY, {
    expiresIn: JWT_ACESS_KEY_EXPIRES_TIME,
  });
  const refreshToken = await refreshTokenDao.createToken({ value: valueToken });
  user = await userDao.updateUser(userId, { refreshTokenId: refreshToken._id });
  return user;
};

const login = async (email, password) => {
  const user = await userDao.findUser({ email });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);
  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) throw new CustomError(errorCodes.WRONG_PASSWORD);
  const token = await generateToken(user);
  return token;
};

const creatAccessToken = async (userId) => {
  const token = await jwt.sign({ userId }, JWT_ACESS_KEY, {
    expiresIn: JWT_ACESS_KEY_EXPIRES_TIME,
  });
  return token;
};
const creatRefreshToken = async (user) => {
  const token = await jwt.sign(
    { userId: user._id, refreshTokenId: user.refreshTokenId._id },
    JWT_REFRESH_KEY,
    {
      expiresIn: JWT_REFRESH_KEY_EXPIRES_TIME,
    },
  );
  await refreshTokenDao.updateToken(user.refreshTokenId._id, {
    value:token,
  });
  return token;
};

const verifyToken = async (token, type = 'refresh') => {
  let data;
  if (type == 'access') {
    data = await jwt.verify(token, JWT_ACESS_KEY);
  } else {
    data = await jwt.verify(token, JWT_REFRESH_KEY);
  }
  const { userId } = data;
  const user = await userDao.findUser(userId);
  return user;
};



module.exports = {
  register,
  login,
  verifyToken,
  creatAccessToken,
  creatRefreshToken,
};
