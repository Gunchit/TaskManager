import { createContext, useContext, useState } from "react"

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [list, setList] = useState([])
  return (
    <AppContext.Provider value={{ list, setList }}>
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
export default useGlobalContext
