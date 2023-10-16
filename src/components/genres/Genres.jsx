import React from 'react'
import './genres.scss'
import { useSelector } from 'react-redux';


function Genres({ idsData }) {
    const  genres  = useSelector((state) => state.home.genres)

    return (
        <div className='genres'>
            {idsData?.map((g) => {
                return <div key={g} className="genre">
                    {genres[g]?.name}
                </div>
            })}
        </div>
    )
}

export default Genres