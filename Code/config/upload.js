var multer = require('multer');
var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-_-' + file.originalname);
    }
});

module.exports.upload = multer({ storage: store }).single('file');