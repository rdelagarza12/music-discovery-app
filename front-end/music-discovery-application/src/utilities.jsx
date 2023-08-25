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

export const getGenre = async (e) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.spotify.com/v1/recommendations/available-genre-seeds',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('Bearer')}`
            }
        };

        const response = await axios.request(config);
        const availableGenres = response.data.genres;
        return availableGenres
    } catch (error) {
        console.log(error);
    }
};