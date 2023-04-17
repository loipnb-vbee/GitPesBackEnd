const bcrypt = require('bcrypt');

const generateSalt = () => bcrypt.genSaltSync(10);

const encryptPassword = async (password, salt) => {
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

const comparePassword = async (inputPassWord, userPassword) => {
  const isCorrectPassword = await bcrypt.compare(inputPassWord, userPassword);
  return isCorrectPassword;
};

module.exports = { generateSalt, encryptPassword,comparePassword };
