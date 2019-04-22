const mongoose = require('mongoose');

//Setting schema
const SettingModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const Setting = module.exports = mongoose.model('SettingModel', SettingModel);

module.exports.getSettingById = function (id, callback) {
    Setting.findById(id, callback);
}

module.exports.getSettingByName = function (name, callback) {
    Setting.find({name:name}, callback);
}

module.exports.updateSetting = function (id, updateQuery, callback) {
    Setting.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.getSettings = function (callback) {
    Setting.find().exec(callback);
}

module.exports.addSetting = function (newSetting, callback) {
    newSetting.save(callback);
}










