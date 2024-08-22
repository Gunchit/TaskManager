import React, { useRef, useState } from "react"
import useGlobalContext from "../context"

const url = "http://localhost:5000/api/v1/task/createTask"
const InputContainer = () => {
  const { list, setList } = useGlobalContext()
  const ref = useRef(null)

  const postData = async (value) => {
    value = value.slice(0, 10)
    const obj = {
      title: value,
    }
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })

      if (!resp.ok) return;
      const data = await resp.json()
      if (!data?.data) return
      setList((prevValue) => {
        return [...prevValue, { ...data.data }]
      })
    } catch (error) {
      return;
    }
  }
  const handleClick = () => {
    if (!ref?.current) return

    const value = ref.current.value
    if (!value || !value?.trim()) return

    postData(value)
    ref.current.value = ""
  }
  return (
    <div className="input-container">
      <input
        type="text"
        name="itemName"
        id="itemName"
        placeholder="e.g wash dishes"
        ref={ref}
      />
      <button className="btn" onClick={() => handleClick()}>
        Submit
      </button>
    </div>
  )
}

export default InputContainer
