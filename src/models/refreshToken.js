const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
  {
    value: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Refreshtoken', refreshTokenSchema);
