const mongoose = require('mongoose');

//Import schema
const ImportModel = mongoose.Schema({
    moduleName: {
        type: String,
        required: true
    },
    date:{
        type: String
    }
});

const Import = module.exports = mongoose.model('ImportModel', ImportModel);

module.exports.addImport = function (newImport, callback) {
    //console.log(newLine);
    newImport.save(callback);
}

module.exports.getImports = function (callback) {
    Import.find().exec(callback);
}
