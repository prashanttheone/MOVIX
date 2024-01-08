// Importing necessary React modules and components
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';

// Function component for the main App
function App() {
  // Initializing Redux dispatch and selecting URL from Redux state
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  // useEffect to fetch API configuration and genres on component mount
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  // Function to fetch API configuration
  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      console.log(res);

      // Creating URLs for different image types
      const apiUrl = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };

      // Dispatching the obtained configuration to Redux store
      dispatch(getApiConfiguration(apiUrl));
    });
  };

  // Function to fetch genres for both TV and movies
  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};

    // Creating promises for fetching genres
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    // Resolving promises and updating the Redux store with genres
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => {
        allGenres[item.id] = item;
      });
    });

    dispatch(getGenres(allGenres));
  };

  // Rendering the main application with React Router
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
