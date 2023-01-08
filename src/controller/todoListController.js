

const asyncHandler = require('express-async-handler');

const todoListModel = require('../model/todoListModel');


///*******************createTodo********************************/

exports.createTodo = asyncHandler(async (req, res) => {

    const { TodoSubject, TodoDescription, TodoStatus, TodoDate, todoCreateDate, todoUpdateDate } = req.body;




    const todoList = await todoListModel.create(
        {
            UserName: req.headers.username,
            TodoDescription,
            TodoSubject,
            TodoStatus,
            TodoDate,
            todoCreateDate,
            todoUpdateDate


        }
    );

    if (todoList) {
        res.status(201).json({ status: "success", 'message': 'Todo created successfully', data: todoList })
    } else {
        res.status(401)
        throw new Error({ status: 'fail', 'message': 'todo created failed' })
    }


})

///******************************getTodo******************************** */


exports.selectTodo = asyncHandler(async (req, res) => {

    const username = req.headers.username;

    const todo = await todoListModel.find({ UserName: username })

    if (todo) {
        res.status(200).json({ status: "success", todo: todo })
    } else {
        res.status(400).json({ status: "fail", msg: 'authentication failed' })
    }
})


///*******************************updateTodo********************************/


exports.updateTodo = asyncHandler(async (req, res) => {

    const { TodoSubject, TodoDescription, TodoStatus, _id } = req.body;
    const id = req.params.id

    const todo = await todoListModel.findByIdAndUpdate(
        id,

        {
            TodoSubject: TodoSubject,
            TodoDescription: TodoDescription,
            TodoStatus: TodoStatus
        }
    )

    if (todo) {
        res.status(200).json({ status: "success", Todo: todo })
    } else {
        res.status(401)
        throw new Error({ status: "updated failed" })
    }


})



///********************************update todo status**********************/


exports.updateTodoStatus = asyncHandler(async (req, res) => {

    const id = req.params.id
    const TodoStatus = req.body.TodoStatus

    const filter = { _id: id };
    const options = { upsert: true };

    const updateDoc = {
        $set: {

            TodoStatus: TodoStatus

        },
    };

    const todo = await todoListModel.updateOne(filter, updateDoc, options)

    if (todo) {
        res.status(200).json({ status: "updated", todo: todo })
    } else {
        res.status(400)
        throw new Error({ status: 'updated failed' })
    }
})
//***********************remove todo************************************ */

exports.RemoveTodo = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const getTodo = todoListModel.find({ _id: id })

    if (!getTodo) {

        res.status(200).json({ status: "Donot found  ", })

    }

    const result = await todoListModel.deleteOne({ _id: id })

    if (result.deletedCount === 1) {
        res.status(200).json({ status: "deleted successfully" })
    } else {
        res.status(204).json({ status: "todo not exist" })
    }
})


//***********************select todo by date *************************** */

exports.selectTodobydate = asyncHandler(async (req, res) => {

    const username = req.headers.username;

    const fromDate = req.body
    const toDate = req.body

    const todo = await todoListModel.find({ UserName: username, $gte: new Date(fromDate), $lte: new Date(toDate) })

    if (todo) {

        res.status(200).json({ status: "updated", todo: todo })

    } else {
        res.status(400)
        throw new Error({ status: 'Donot found anything' })

    }


})


