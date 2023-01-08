const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({

    "UserName": { type: String },
    "TodoSubject": { type: String },
    "TodoDescription": { type: String },
    "TodoStatus": { type: String, default: "New" },
    "TodoDate": { type: Date, default: Date.now },
    "todoCreateDate": { type: Date, default: Date.now },
    "todoUpdateDate": { type: Date, default: Date.now }



}, {

    versionKey: false
})

const todoListModel = mongoose.model('todoList', DataSchema)

module.exports = todoListModel;