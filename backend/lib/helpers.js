const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');
const CONFIG = require('../config/config');

let nameImage = uuid();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/images'),
  filename: (req, file, cb) => {
    let nameFinalImg = `${nameImage}${path.extname(file.originalname).toLowerCase()}`;
    cb(null, nameFinalImg);
  }
});

let maxFileSize = CONFIG.MAX_MEGABYTES * 1024 * 1024;
const upload = multer({
  storage,
  dest: path.join(__dirname, '../uploads/images'),
  limits: {
    fileSize: maxFileSize
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extnmae = fileTypes.test(path.extname(file.originalname));
    if ( mimetype && extnmae ) {
      cb(null, true)
    } else {
        req.fileValidationError = 'No es un archivo de tipo imágen';
        return cb(null, false, new Error('No es un archivo de tipo imágen'));
      }
  }
}).single('file');

function encryptPassword (password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

module.exports = {
  encryptPassword,
  storage,
  upload,
  nameImage
}