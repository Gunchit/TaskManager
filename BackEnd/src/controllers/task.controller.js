const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const asyncHandler = require("../utils/AsyncHandler")
const Task = require("../models/task.model")
const mongoose = require("mongoose")

const getAllTask = asyncHandler(async (req, res) => {
  const allTask = await Task.find().select("-createdAt -updatedAt -__v")
  
  if (!allTask)
    throw new ApiError(500, "Something Wen Wrong While Retrieving Data")

  res.status(201).json(new ApiResponse(200, allTask, "Success"))
})

const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) throw new ApiError(400 , "Enter Valid ID")
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400 ,"Enter Valid ID")

  const task = await Task.findById(id).select("-createdAt -updatedAt -__v")

  if (!task)
    throw new ApiError(500, "Something Wen Wrong While Retrieving Data")

  res.status(201).json(new ApiResponse(200, task, "Success"))
})

const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body

  if (!title || !title?.trim())
    throw new ApiError(400, "Enter The Valid Title Name of Task")

  const existedTask = await Task.findOne({ title })

  if (existedTask)
    throw new ApiError(409, "A Task Already Exist with Given Name")

  const newTask = await Task.create({ title })
  if (!newTask)
    throw new ApiError(500, "Something Went Wrong While Creating Task")

  const createdTask = await Task.findById(newTask?._id).select(
    "-createdAt -updatedAt -__v"
  )
  if (!createdTask)
    throw new ApiError(500, "Something Went Wrong While Creating Task")

  return res
    .status(201)
    .json(new ApiResponse(200, createdTask, "Task Created Successfully"))
})

const editTask = asyncHandler(async (req, res) => {
  const { title, completed } = req.body
  const { id } = req.params

  if (!id || !title || !title?.trim() || completed === undefined)
    throw new ApiError(400, "Enter Valid Credentials")

  const alreadyPresentTask = await Task.findOne({
    title,
  })

  if (alreadyPresentTask && alreadyPresentTask._id != id) {
    throw new ApiError(400 , "Task With Given Name Already Present")
  }


  const task = await Task.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        completed,
      },
    },
    { new: true }
  ).select("-createdAt -updatedAt -__v")

  if (!task)
    throw new ApiError(500, "Something Went Wrong While Updating the Task")

  res
    .status(201)
    .json(new ApiResponse(200, task, "Updated the Task Successfully"))
})

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Enter A Valid ID")
  const deletedTask = await Task.findByIdAndDelete(id)
  if (!deletedTask)
    throw new ApiError(500, "Some Error Occured While Deleting the Task")

  res
    .status(200)
    .json(new ApiResponse(200, deletedTask, "Task Deleted Succesfully"))
})

module.exports = { createTask, editTask, deleteTask, getTask, getAllTask }
