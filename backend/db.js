const mongoose = require("mongoose");
const { string } = require("zod");
const dotenv = require('dotenv');
dotenv.config();
const URI = String(process.env.MONGO_URL);
console.log(URI);
mongoose.connect(URI);


const schemaTodo = mongoose.Schema({
    title: String,
    description: String,
    iscompleted: Boolean
})

const todos = mongoose.model('todos', schemaTodo);

module.exports = {
    todos
}