// Importing Axios library for making HTTP requests
import axios from "axios";

// Base URL for The Movie Database API
const BASE_URL = "https://api.themoviedb.org/3";

// Token for authenticating requests to The Movie Database API
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// Headers containing the authorization token
const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

/**
 * Function to fetch data from The Movie Database API
 * @param {string} url - The endpoint URL for the API request
 * @param {Object} params - Optional parameters for the API request
 * @returns {Promise<Object>} - A promise resolving to the fetched data or an error object
 */
export const fetchDataFromApi = async (url, params) => {
  try {
    // Making a GET request using Axios with the provided URL, headers, and parameters
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params
    });

    // Returning the fetched data
    return data;
  } catch (err) {
    // Logging and returning any error that occurs during the API request
    console.error(err);
    return err;
  }
};
