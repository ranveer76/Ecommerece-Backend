const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    method: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);