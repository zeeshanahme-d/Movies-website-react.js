import dayjs from "dayjs";
import { Link } from "react-router-dom";

import "./movieCard.scss";
import Img from "../../components/lazyLoadImg/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/images/no-poster.png";
import { imageUrl } from "../../utils/api";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const title = data.title || data.name;
    const date = data.release_date || data.first_air_date;

    return (
        <Link className="movieCard" to={`/${data.media_type || mediaType}/${data.id}`}>
            <div className="posterBlock">
                <Img className="posterImg" src={imageUrl(data.poster_path, "w500") || PosterFallback} alt={title} />
                {!fromSearch && (
                    <>
                        <CircleRating rating={data.vote_average} />
                        <Genres idsData={data.genre_ids?.slice(0, 2)} />
                    </>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{title}</span>
                <span className="date">{date && dayjs(date).format("MMM D, YYYY")}</span>
            </div>
        </Link>
    );
};

export default MovieCard;
