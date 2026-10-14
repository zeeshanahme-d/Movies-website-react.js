import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const headers = {
    Authorization: "bearer " + import.meta.env.VITE_APP_TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    const { data } = await axios.get(BASE_URL + url, { headers, params });
    return data;
};

// Sizes: https://developer.themoviedb.org/docs/image-basics
export const imageUrl = (path, size) => path && IMAGE_BASE_URL + size + path;
