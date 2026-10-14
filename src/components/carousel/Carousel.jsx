import { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImg/Img";
import PosterFallback from "../../assets/images/no-poster.png";
import './carousel.scss'
import Genres from "../genres/Genres"
import CircleRating from '../circleRating/CircleRating'
import { imageUrl } from "../../utils/api";

const SkeletonItem = () => (
    <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
        </div>
    </div>
);

function Carousel({ data, loading, endPoint, title }) {
    const carouselContainer = useRef();
    // Trending "all" can include people, which aren't titles.
    const items = data?.filter((item) => item.media_type !== "person") ?? [];

    if (!loading && !items.length) return null;

    const navigation = (direction) => {
        const container = carouselContainer.current;
        const step = container.offsetWidth + 20;

        container.scrollTo({
            left: container.scrollLeft + (direction === "left" ? -step : step),
            behavior: "smooth"
        })
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                {!loading ? (
                    <>
                        <button className="carouselLeftNav arrow" aria-label="Scroll left" onClick={() => navigation("left")}>
                            <BsFillArrowLeftCircleFill />
                        </button>
                        <button className="carouselRightNav arrow" aria-label="Scroll right" onClick={() => navigation("right")}>
                            <BsFillArrowRightCircleFill />
                        </button>
                        <div className="carouselItems" ref={carouselContainer}>
                            {items.map((item) => {
                                const itemTitle = item.title || item.name;
                                const date = item.release_date || item.first_air_date;
                                return (
                                    <Link className="carouselItem" to={`/${item.media_type || endPoint}/${item.id}`} key={item.id}>
                                        <div className="posterBlock">
                                            <Img src={imageUrl(item.poster_path, "w500") || PosterFallback} alt={itemTitle} />
                                            <CircleRating rating={item.vote_average} />
                                            <Genres idsData={item.genre_ids?.slice(0, 2)} />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">{itemTitle}</span>
                                            <span className="date">{date && dayjs(date).format("D MMM, YYYY")}</span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <div className="loadingSkeleton">
                        {Array.from({ length: 6 }, (_, i) => <SkeletonItem key={i} />)}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel;
