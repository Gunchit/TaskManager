import React from "react"
import Alert from "./Alert"
import InputContainer from "./InputContainer"


const HeaderBox = () => {
  return (
    <div className="headerBox">
      <div className="heading">Task Manager</div>
      <InputContainer />
      <Alert />
    </div>
  )
}

export default HeaderBox
