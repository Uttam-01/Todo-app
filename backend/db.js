const mongoose = require("mongoose");
mongoose.connect(a.env.MONGO_URI);


const schemaTodo = mongoose.Schema({
    title: String,
    description: String,
    iscompleted: Boolean
})

const todo = mongoose.model('todos', schemaTodo);

module.exports = {
    todo
}