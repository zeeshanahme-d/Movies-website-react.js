import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss'
import { FetchDataFromAPI } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfig, getGenres } from './store/homeSlice'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResult/SearchResult'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import Page404 from './pages/404/page404'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    FetchDataFromAPI('/configuration')
      .then((res) => {
        console.log(res)
        const url = {
          backDrop: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
        }

        dispatch(getApiConfig(url))
      })
      .catch(err => console.log(err))
      genresCall();
  }, [dispatch]);


  const genresCall = async () => {
    let promises = [];
    let endPoint = ["movie", "tv"];
    let allGenres = {};

    endPoint.forEach((url) => {
      promises.push(FetchDataFromAPI(`/genre/${url}/list`))
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map(item => { allGenres[item.id] = item })
    })

    dispatch(getGenres(allGenres))
  };



  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
