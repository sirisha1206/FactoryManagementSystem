const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Maintenance schema
const MaintenanceModel = mongoose.Schema({
    machineName: {
        type: String,
        required: true
    },
    machineId: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    }
});

const Maintenance = module.exports = mongoose.model('MaintenanceModel', MaintenanceModel);

module.exports.getMaintenanceById = function (id, callback) {
    Maintenance.findById(id, callback);
}

module.exports.getRMaintenanceByMachineId = function (id, callback) {
    console.log(id);
    Maintenance.find({machineName:id}, callback);
}

module.exports.getMaintenanceByName = function (name, callback) {
    Maintenance.find({name:name},callback);
}

module.exports.addMaintenance = function (newMaintenance, callback) {
    newMaintenance.save(callback);
}

module.exports.updateMaintenance = function (id, updateQuery, callback) {
    Maintenance.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteMaintenance = function (id, callback) {
    Maintenance.remove({ _id: id }, callback);
}

module.exports.getMaintenances = function (callback) {
    Maintenance.find().exec(callback);
}
