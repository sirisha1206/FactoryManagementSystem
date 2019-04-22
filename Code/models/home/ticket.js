const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Ticket schema
const TicketModel = mongoose.Schema({
    machineName: {
        type: String,
        required: true
    },
    reasonName: {
        type: String,
        required: true
    },
    machineId: {
        type: String,
        required: true
    },
    reasonId: {
        type: String,
        required: true
    }
});

const Ticket = module.exports = mongoose.model('TicketModel', TicketModel);

module.exports.getTicketById = function (id, callback) {
    Ticket.findById(id, callback);
}

module.exports.getTicketByMachineId = function (id, callback) {
    console.log(id);
    Ticket.find({machineName:id}, callback);
}

module.exports.getTicketByName = function (name, callback) {
    Ticket.find({name:name},callback);
}

module.exports.addTicket = function (newTicket, callback) {
    newTicket.save(callback);
}

module.exports.updateTicket = function (id, updateQuery, callback) {
    Ticket.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteTicket = function (id, callback) {
    Ticket.remove({ _id: id }, callback);
}

module.exports.getTickets = function (callback) {
    Ticket.find().exec(callback);
}
