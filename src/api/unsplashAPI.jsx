import axios from "axios";

const API_URL = "https://api.unsplash.com";
const ACCESS_KEY = "4w5VJRJRAhRfDOGS1bfHi3CLEvP6OWUlz6WWveb2_vA";

const unsplashAPI = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const fetchImages = async (query, page = 1, perPage = 16) => {
  try {
    const response = await unsplashAPI.get("/search/photos", {
      params: { query, page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
