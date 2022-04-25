const mongoose = require('mongoose')

const Package = mongoose.model('Package', {
    name: String,
    id: String,
    batch: String,
    manufacturingDate: String,
    expiringDate: String,
    origin: String,
    amount: Number,
})

module.exports = Package
