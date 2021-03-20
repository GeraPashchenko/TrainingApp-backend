const multer  = require("multer");
const path = require("path");

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__appRoot + "/uploads"));
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};

module.exports.multerConfigured = multer({storage: storageConfig, fileFilter: fileFilter}).single(process.env.FILE_UPLOAD_FIELD);
module.exports.fileFilter = fileFilter;
module.exports.storageConfig = storageConfig;