const bcrypt = require('bcrypt');

function encryptPassword (password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

module.exports = {
  encryptPassword
}