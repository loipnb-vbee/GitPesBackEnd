const RefreshToken = require('../models/refreshToken');

const createToken = async ({ value }) => {
  const token = await RefreshToken.create({
    value,
  });
  return token;
};

const updateToken = async (tokenId, data) => {
  const token = await RefreshToken.findByIdAndUpdate(tokenId, data, {
    new: true,
  });
  return token;
};

module.exports = { createToken, updateToken };
