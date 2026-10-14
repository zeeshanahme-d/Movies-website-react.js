import { useState, useMemo } from 'react'
import './heroBanner.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hook/useFetch'
import Img from '../../../components/lazyLoadImg/Img.jsx'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { imageUrl } from '../../../utils/api'

function HeroBanner() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const { data } = useFetch('/discover/movie')

    const background = useMemo(() => {
        const results = data?.results?.filter((movie) => movie.backdrop_path) ?? [];
        const movie = results[Math.floor(Math.random() * results.length)];
        return imageUrl(movie?.backdrop_path, "w1280");
    }, [data]);

    const searchQueryHandler = (event) => {
        event.preventDefault();
        const q = query.trim();
        if (q) navigate(`/search/${encodeURIComponent(q)}`);
    }

    return (
        <div className='heroBanner'>
            {background && <div className="backdrop-img">
                <Img src={background} />
            </div>}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
                    <form className="searchInput" onSubmit={searchQueryHandler}>
                        <input
                            type="text"
                            aria-label="Search"
                            placeholder='Search for movies and TV show....'
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
