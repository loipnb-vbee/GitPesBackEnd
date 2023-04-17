const authService = require('../services/auth');

const register = async (req, res) => {
  const { firstname, lastname, password, birthDate, email } = req.body;
  const user = await authService.register({
    firstname,
    lastname,
    password,
    birthDate,
    email,
  });
  return res.send({ status: 1, result: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  return res.send({ status: 1, result: { token } });
};

const sendAccessToken = async (req, res) => {
  const user = req.user;
  const accessToken = await authService.creatAccessToken(user._id);
  return res.send({ status: 1, result: { accessToken } });
};

module.exports = { register, login, sendAccessToken };
