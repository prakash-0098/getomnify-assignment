const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    start_time: String,
    end_time: String,
    week_day: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema); 