import React from "react"

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Layout from "./Pages/Layout"
import Home from "./Pages/Home"
import Error from "./Pages/Error"
import EditTask from "./Pages/EditTask"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route path="" element={<Home />} />
        <Route path="editTask/:editID" element={<EditTask />} />
      </Route>
      <Route path="*" element={<Error />} />
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
