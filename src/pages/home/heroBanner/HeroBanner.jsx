/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './herBanner.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hook/useFetch'


function HeroBanner() {
    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")
    const navigate = useNavigate();

    const { data, loading } = useFetch('/movie/upcoming')
    console.log("🚀 ~ file: HeroBanner.jsx:15 ~ HeroBanner ~ data:", data)

    useEffect(() => {
        const bg = url.backDrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg)
    }, [data]);

    const searchQueryHandler = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search/:${query}`)
        }
    }

    return (
        <div className='heroBanner'>
            <div className='wrapper'>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search for movies and TV show....'
                            onKeyUp={searchQueryHandler}
                            onChange={(e) => { setQuery(e.target.value) }}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner