import axios from "axios";

export const key = '91ad65d8e4321265ad69f76230e5b0a8'

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

