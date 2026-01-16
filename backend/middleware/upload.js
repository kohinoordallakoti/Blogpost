import multer from "multer";

const uploadDir ="upload"


const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });
    
  const upload = multer({ storage });

export default upload