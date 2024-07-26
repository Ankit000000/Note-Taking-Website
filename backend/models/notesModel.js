const express = require('express')
const mongoose = require('mongoose')

module.exports = mongoose.model('coll2', new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false
    },
    imageUrls: [{ type: String }]
}, { timestamps: true })
)