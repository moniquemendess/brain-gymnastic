const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

const configCloudinary = () => {
  // Creamos la configuración de Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};
// Creamos el almacenamiento de Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "braingym",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

// Creamos la función de subida de imágenes
const upload = multer({ storage });

// Función de borrado de imágenes en Cloudinary
const deleteImgCloudinary = (imgUrl) => {
  const public_id = imgUrl
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "");
  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) {
      console.error("Error deleting image from Cloudinary:", error);
    } else {
      console.log("Image deleted from Cloudinary:", result);
    }
  });
};

module.exports = { configCloudinary, upload, deleteImgCloudinary };
