const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Middleware su file system internal storage
const internalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    //funzione di callback per dire a multer dove salvare i file
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    //funzione di callback che specifica con quale nome salvare il file all'interno dell'harddisk
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtensions = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtensions}`);
  },
});

//Middleware su Cloudinary per la cover del post
const cloudCoverStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "CoverPosts",
    format: async (req, file) => "png",
    public_id: (req, file) => file.name,
  },
});

//Middleware su Cloudinary per l'immagine dell'autore
const cloudAuthorAvatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "AuthorAvatar",
    format: async (req, file) => "png",
    public_id: (req, file) => file.name,
  },
});

const internalUpload = multer({ storage: internalStorage });
const cloudCoverUpload = multer({ storage: cloudCoverStorage });
const cloudAuthorAvatarUpload = multer({ storage: cloudAuthorAvatarStorage });

module.exports = { internalUpload, cloudCoverUpload, cloudAuthorAvatarUpload };
