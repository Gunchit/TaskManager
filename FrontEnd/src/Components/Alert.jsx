import React, { useEffect } from "react"

const Alert = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={`alert`}
    >
      Success, Task Added
    </div>
  )
}

export default Alert
