import React, { useState, useEffect } from "react"
import SingleTask from "./SingleTask"
import useGlobalContext from "../context"

const url = "http://localhost:5000/api/v1/task/getAllTask"
const TaskList = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { list, setList } = useGlobalContext()

  const fetchData = async () => {
    try {
      const resp = await fetch(url)
      if (!resp.ok) {
        setLoading(false)
        setError(true)
      }
      const data = await resp.json()
      if (data?.data) setList(data.data)
      else setError(true)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="loading">Some Error Occured</div>
  return (
    <div className="taskList">
      {list.map((item, index) => {
        return <SingleTask key={index} {...item} />
      })}
    </div>
  )
}

export default TaskList
