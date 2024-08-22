import React from "react"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import useGlobalContext from "../context"
import { useNavigate } from "react-router-dom"

const url = "http://localhost:5000/api/v1/task/deleteTask/"

const SingleTask = ({ _id: id, completed, title }) => {

  const navigate = useNavigate()
  const { list, setList } = useGlobalContext()
  const deleteTask = async () => {
    const resp = await fetch(`${url}${id}`, { method: "DELETE" })
    if (!resp.ok) return
    const data = await resp.json()
    if (!data?.data) return
    removeItem(data.data)
  }

  const removeItem = (data) => {
    setList((prevValue) => {
      const newList = prevValue.filter((item) => item._id != data._id)
      return newList
    })
  }
  return (
    <div className="singleTask">
      <div className={`text ${completed ? "taskComplete" : null}`}>{title}</div>
      <div className="icons">
        <FaEdit className="icon" id="editBtn" onClick={()=>navigate(`editTask/${id}`)}/>
        <MdDelete
          className="icon"
          id="deleteBtn"
          onClick={() => deleteTask()}
        />
      </div>
    </div>
  )
}

export default SingleTask
