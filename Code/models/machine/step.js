const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Step schema
const StepModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    parts: [{
        type: Schema.Types.ObjectId,
        ref: 'PartModel'
    }],
    documents : [{
        type: Schema.Types.ObjectId,
        ref: 'DocumentModel'
    }]
});

const Step = module.exports = mongoose.model('StepModel', StepModel);

module.exports.getStepById = function (id, callback) {
    Step.findById(id).populate('parts').populate('documents').exec(callback);
}

module.exports.addStep = function (newStep, callback) {
    //console.log(newReason);
    newStep.save(callback);
}

module.exports.updateStep = function (id, updateQuery, callback) {
    Step.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteStep = function (id, callback) {
    console.log(id);
    Step.remove({ _id: id }, callback);
}

module.exports.getSteps = function (callback) {
    Step.find().populate('parts').populate('documents').exec(callback);
}
