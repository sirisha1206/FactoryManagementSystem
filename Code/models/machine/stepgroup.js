const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Step group schema
const StepgroupModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    steps : [{
        type: Schema.Types.ObjectId,
        ref: 'StepModel'
    }],
});

const Stepgroup = module.exports = mongoose.model('StepgroupModel', StepgroupModel);

module.exports.getStepgroupById = function (id, callback) {
    Stepgroup.findById(id, callback);
}

module.exports.addStepgroup = function (newStepgroup, callback) {
    //console.log(newReason);
    newStepgroup.save(callback);
}

module.exports.updateStepgroup = function (id, updateQuery, callback) {
    Stepgroup.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteStepgroup = function (id, callback) {
    Stepgroup.remove({ _id: id }, callback);
}

module.exports.getStepgroups = function (callback) {
    Stepgroup.find().populate('steps').exec(callback);
}

module.exports.getStepGroupNames = function(name,callback){
    //console.log(name);
    Stepgroup.find({ "name": { $regex: '.*' + name + '.*' }}, callback);
}
