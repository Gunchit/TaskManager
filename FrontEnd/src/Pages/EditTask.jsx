import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useGlobalContext from "../context"

const url = "http://localhost:5000/api/v1/task/getTask/"
const url2 = "http://localhost:5000/api/v1/task/editTask/"

function EditTask() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState({})
  const { list, setList } = useGlobalContext()
  const { editID } = useParams()

  const editTask = () => {
    const newTitle = data.title
    if (!newTitle || !newTitle?.trim()) return
    data.title = data.title.slice(0, 10)
    edit()
  }

  const fetchData = async () => {
    try {
      const resp = await fetch(`${url}${editID}`)
      if (!resp.ok) {
        setLoading(false)
        setError(true)
        return
      }
      const data = await resp.json()
      if (!data?.data) setError(true)
      setData(data.data)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  const edit = async () => {
    try {
      const resp = await fetch(`${url2}${editID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if(!resp.ok) return
      const editedTask = await resp.json()
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <div className="loading">Loading ...</div>
  if (error) return <div className="loading">Some Error Occured</div>
  return (
    <>
      <div className="taskBox">
        <div className="heading">Edit Task</div>
        <div className="taskID">
          <div className="name">Task ID</div>
          <div className="id">{data._id}</div>
        </div>
        <div className="taskName">
          <div className="name">Name</div>
          <input
            type="text"
            className="field"
            onChange={(e) => {
              setData((prevValue) => {
                return { ...prevValue, title: e.target.value }
              })
            }}
            value={data.title}
          />
        </div>
        <div className="completedFlag">
          <div className="name">Completed</div>
          <div className="field">
            <input
              type="checkbox"
              className="checkBox"
              onChange={(e) => {
                setData((prevValue) => {
                  return { ...prevValue, completed: e.target.checked }
                })
              }}
              checked={data.completed}
            />
          </div>
        </div>
        <button className="editBtn" onClick={editTask}>
          Edit
        </button>
      </div>
      <Link to="/" className="backToHomeBtn">
        Back To Tasks
      </Link>
    </>
  )
}
export default EditTask
