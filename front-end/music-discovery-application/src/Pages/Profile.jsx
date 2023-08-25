import React from "react"
import {Outlet } from "react-router-dom"
import ProfileHeader from "../components/ProfileHeader"
import { useEffect } from "react";
import { api } from "../utilities.jsx"
import { useAppContext } from "./context";



export default function Profile () {
  const {setIsTokenAvailable} = useAppContext()

  const getAccessToken = async (code, state) => {
    try {
      let response = await api.get(`/spotifyauthentication/?code=${code}&state=${state}`)
      localStorage.setItem('Bearer' , response.data.access_token)
      localStorage.setItem('expires_in', response.data.expires_in)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      setIsTokenAvailable(true)
      console.log('User Authenticated');
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {

      getAccessToken(code, state);
    }
  }, []);

    return (
        <div className="profile">
            <ProfileHeader />
            <Outlet />
        </div>
    )
}