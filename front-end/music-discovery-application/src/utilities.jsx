import React from "react"
import axios from "axios"

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});

export const getLibrary = async (e) => {
    let response = await api.get('/libraries/', {
        headers: {
            'Authorization' : `Token ${localStorage.getItem('token')}`
        }
    })
    let user_library = response.data
    return user_library
}


