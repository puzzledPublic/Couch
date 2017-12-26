const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/KHM/Documents/GitHub/Couch/backend/public/images');
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype.includes('image')) {
            cb(null, true);
        }else {
            cb(null, false);
        }
    }
});

module.exports = upload;