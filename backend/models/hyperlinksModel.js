const express = require('express')
const mongoose = require('mongoose')

module.exports = mongoose.model('coll1', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    heading: {
        type: String
    },
    subheading: {
        type: String
    },
    extra: {
        type: String
    },
    favourite: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true })
)