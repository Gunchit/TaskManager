const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "16kb" }))
app.use(express.static(path.resolve(__dirname, "../public")))

const taskRouter = require("./routes/task.route")
app.use("/api/v1/task", taskRouter)

// const errorMiddleware = require("./middlewares/errorMiddleware.js")
// app.use(errorMiddleware)


module.exports = app
