const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    }, 
    taskTitle: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);