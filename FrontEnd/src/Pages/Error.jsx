import React from "react"
import { Link } from "react-router-dom"
const Error = () => {
  return (
    <div className="error">
      <img src="/not-found-076062c6.svg" alt="Not Found Error Image" />
      <div className="erorrMsg">
        <div className="first">Ohh!</div>
        <div>We can't seem to find page you are looking for</div>
      </div>
      <Link to="/" className="errorBtn">
        Back to Home
      </Link>
    </div>
  )
}

export default Error
