const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    password: String,
    birthDate: String,
    email: String,
    refreshTokenId: { type: String, ref: 'Refreshtoken' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('User', userSchema);
