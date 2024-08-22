const express = require("express")
const {
  createTask,
  editTask,
  deleteTask,
  getTask,
  getAllTask,
} = require("../controllers/task.controller")

const Router = express.Router()


Router.route('/getAllTask').get(getAllTask);
Router.route('/getTask/:id').get(getTask);
Router.route("/createTask").post(createTask)
Router.route("/editTask/:id").patch(editTask)
Router.route("/deleteTask/:id").delete(deleteTask)

module.exports = Router
