require("dotenv").config()

const connectDB = require("./db/index.js")
const app = require("./app.js")

connectDB()
  .then(() => {
    app.on("error", () => {
      console.log("Some Error Occured While Starting the Server")
    })

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server Listening on PORT ${process.env.PORT || 3000}`)
    })
  })
  .catch((err) => {
    console.log("Error Connecting to the Database", err)
  })
