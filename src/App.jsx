/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { FetchDataFromAPI } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfig } from './store/homeSlice'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from './pages/home/home'
import SearchResult from './pages/searchResult/searchResult'
import Details from './pages/details/details'
import Explore from './pages/explore/explore'
import Page404 from './pages/404/page404'


function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url)


  useEffect(() => {
    FetchDataFromAPI('/configuration')
      .then((res) => {
        console.log(res)
        
        const url = {
          backDrop : res.images.secure_base_url + "original",
          profile : res.images.secure_base_url + "original",
          poster : res.images.secure_base_url + "original",
        }
        
        dispatch(getApiConfig(url))
      })
      .catch(err => console.log(err))
  }, [dispatch]);



  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
