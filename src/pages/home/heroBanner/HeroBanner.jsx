import React, { useState, useEffect } from 'react'
import './herBanner.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hook/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImg/Img.jsx'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

function HeroBanner() {
    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const { url } = useSelector(state => state.home)
    const { data, loading } = useFetch('/discover/movie')


    useEffect(() => {
        const bg = url.backDrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg)
    }, [data, url]);

    const searchQueryHandler = (event) => {
        if (query.trim() != "") {
            navigate(`/search/:${query.trim()}`)
        }
    }


    return (
        <div className='heroBanner'>
            {!loading && <div className="backdrop-img">
                <Img src={background} alt="" />
            </div>}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search for movies and TV show....'
                            onChange={(e) => { setQuery(e.target.value) }}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    if (query.trim() != "") {
                                        navigate(`/search/:${query.trim()}`)
                                    }
                                };
                            }}
                        />
                        <button onClick={searchQueryHandler}>Search</button>
                    </div>
                </div>

            </ContentWrapper>
        </div>
    )
}

export default HeroBanner