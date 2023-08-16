import { createBrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import Homepage from "./Pages/Homepage.jsx"
import SignUp from "./components/SignUp.jsx"
import SignIn from "./components/SignIn.jsx"
import Profile from "./Pages/Profile.jsx"
import PlaylistGenerator from "./Pages/PlaylistGenerator.jsx"
import ProfileMain from "./components/ProfileMain.jsx"

const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: "signup",
                element: <SignUp />
            },
            {
                path: "signin",
                element: <SignIn />
            },
            {
                path: "signin/profile",
                element: <Profile />,
                children: [
                    {
                        index: true,
                        element: <ProfileMain />
                    },
                    {
                        path: "playlist-generator",
                        element: <PlaylistGenerator />
                    }
                ]
            }
        ]
    }
])

export default router