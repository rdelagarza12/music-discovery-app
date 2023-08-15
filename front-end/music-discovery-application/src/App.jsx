import Header from "./Pages/Header.jsx"
import { Outlet } from "react-router-dom"
import appContext from "./Pages/context.jsx"
import { useState } from "react"


function App() {
  const [token, setToken] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState("");
  const [userName, setUserName]  = useState("");
  const [password, setPassword] = useState("");
  return (
    
      <>
      <appContext.Provider value={{token, setToken, loggedIn, setLoggedIn, user, setUser, userName, setUserName, password, setPassword}}>
        <div className="App">
          <Header />
          <Outlet />
        </div> 
      </appContext.Provider>

      </>
   


  )
}

export default App
