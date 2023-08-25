import Header from "./Pages/Header.jsx"
import { Outlet } from "react-router-dom"
import { AppProvider } from "./Pages/context.jsx"





function App() {

  return (
      <>
      <AppProvider>
        <div className="App">
          <Header />
          <Outlet />
        </div> 
      </AppProvider>
      </>
  )
}

export default App
