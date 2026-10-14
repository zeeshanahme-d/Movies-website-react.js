import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './index.scss'
import { fetchDataFromApi } from './utils/api'
import { setGenres } from './store/homeSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResult/SearchResult'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([fetchDataFromApi('/genre/movie/list'), fetchDataFromApi('/genre/tv/list')])
      .then((lists) => {
        const allGenres = {};
        lists.forEach(({ genres }) => genres.forEach((genre) => { allGenres[genre.id] = genre }));
        dispatch(setGenres(allGenres));
      })
      .catch(console.error);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
