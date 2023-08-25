import React from "react"
import {Outlet } from "react-router-dom"
import ProfileHeader from "../components/ProfileHeader"



export default function Profile () {
    return (
        <div className="profile">
            <ProfileHeader />
            <Outlet />
        </div>
    )
}