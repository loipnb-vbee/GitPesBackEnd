const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');

const createUser = async ({
  firstname,
  lastname,
  password,
  birthDate,
  email,
  refreshTokenId
}) => {
  const user = await User.create({
    firstname,
    lastname,
    password,
    birthDate,
    email,
    refreshTokenId,
  });
  return user;
};

const findUser = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const user = await User.findById(condition).populate('refreshTokenId', {
      _id: 1,
      value: 1,
    });
    return user;
  }

  if (typeof condition === 'object' && condition !== null) {
    const user = await User.findOne(condition).populate('refreshTokenId', {
      _id: 1,
      value: 1,
    });
    return user;
  }

  return null;
};

const updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  return user;
};

module.exports = { createUser, findUser, updateUser };
