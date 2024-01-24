const mongoose = require('mongoose')

//Ledger schema
const LedgerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})

LedgerSchema.pre('save', function (next) {
    const record = this
    // ensure date object has no time associated with it
    if (record.isModified('date')) {
        record.date.setHours(0, 0, 0, 0)
        next()
    } else {
        next()
    }
})

const Ledger = mongoose.model('Ledger', LedgerSchema)

module.exports = { Ledger }