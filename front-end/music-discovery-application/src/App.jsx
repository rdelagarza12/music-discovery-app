import Header from "./Pages/Header.jsx"
import { Outlet } from "react-router-dom"
import appContext from "./Pages/context.jsx"
import { useState, useSyncExternalStore } from "react"


function App() {
  const [token, setToken] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState("");
  const [userName, setUserName]  = useState("");
  const [password, setPassword] = useState("");
  const [library, setLibrary] = useState([]);
  const [allGenres, setAllGenres] = useState([])
  const [search, setSearch] = useState([])
  return (
    
      <>
      <appContext.Provider value={{token, setToken, loggedIn, setLoggedIn, user, setUser, userName, setUserName, password, setPassword, library, setLibrary, allGenres, setAllGenres
      ,search, setSearch}}>
        <div className="App">
          <Header />
          <Outlet />
        </div> 
      </appContext.Provider>

      </>
   


  )
}

export default App
