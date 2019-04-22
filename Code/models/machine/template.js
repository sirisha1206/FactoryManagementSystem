const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Template schema
const TemplateModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    machine: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'MachineModel'
    },
    reason: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'ReasonModel'
    },
    stepgroups : [{
        type: Schema.Types.ObjectId,
        ref: 'StepgroupModel'
    }],
});

const Template = module.exports = mongoose.model('TemplateModel', TemplateModel);

module.exports.getTemplateById = function (id, callback) {
    Template.findById(id, callback);
}

module.exports.getTemplateByMachine = function (mTemp, callback) {
    Template.find({ machine: mTemp.machineId, reason: mTemp.reasonId }).populate('stepgroups').exec(callback);
}

module.exports.addTemplate = function (newTemplate, callback) {
    //console.log(newTemplate);
    newTemplate.save(callback);
}

module.exports.updateTemplate = function (id, updateQuery, callback) {
    Template.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteTemplate = function (id, callback) {
    Template.remove({ _id: id }, callback);
}

module.exports.getTemplates = function (callback) {
    Template.find().populate('stepgroups').exec(callback);
}

module.exports.getTemplateNames = function(name,callback){
    //console.log(name);
    Template.find({ "name": { $regex: '.*' + name + '.*' }}, callback);
}