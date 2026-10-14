import { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import "./detailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hook/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImg/Img";
import PosterFallback from "../../../assets/images/no-poster.png";
import { PlayButton } from "../../../components/playButton/PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { imageUrl } from "../../../utils/api";

const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};

// TMDB often lists the same person under several jobs.
const uniqueNames = (people = []) => [...new Set(people.map((p) => p.name))].join(", ");

const InfoItem = ({ label, value }) => (
    <span className="infoItem">
        <span className="text bold">{label}: </span>
        <span className="text">{value}</span>
    </span>
);

const InfoRow = ({ label, value }) => (
    <div className="info">
        <span className="text bold">{label}: </span>
        <span className="text">{value}</span>
    </div>
);

const DetailsBanner = ({ video, crew = [] }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    if (loading) {
        return (
            <div className="detailsBanner">
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            {Array.from({ length: 7 }, (_, i) => <div key={i} className="row skeleton"></div>)}
                        </div>
                    </ContentWrapper>
                </div>
            </div>
        );
    }

    if (!data) return <div className="detailsBanner" />;

    const title = data.name || data.title;
    const releaseDate = data.release_date || data.first_air_date;
    const director = uniqueNames(crew.filter((f) => f.job === "Director"));
    const writer = uniqueNames(crew.filter((f) => ["Screenplay", "Writer", "Story"].includes(f.job)));
    const creator = uniqueNames(data.created_by);
    const backdrop = imageUrl(data.backdrop_path, "w1280");

    return (
        <div className="detailsBanner">
            {backdrop && (
                <div className="backdrop-img">
                    <Img src={backdrop} />
                </div>
            )}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="content">
                    <div className="left">
                        <Img className="posterImg" src={imageUrl(data.poster_path, "w500") || PosterFallback} alt={title} />
                    </div>
                    <div className="right">
                        <div className="title">
                            {title}
                            {releaseDate && ` (${dayjs(releaseDate).format("YYYY")})`}
                        </div>
                        <div className="subtitle">{data.tagline}</div>
                        <Genres idsData={data.genres?.map((g) => g.id)} />
                        <div className="row">
                            <CircleRating rating={data.vote_average} />
                            {video && (
                                <button
                                    className="playBtn"
                                    onClick={() => {
                                        setShow(true);
                                        setVideoId(video.key);
                                    }}
                                >
                                    <PlayButton />
                                    <span className="text">Watch</span>
                                </button>
                            )}
                        </div>
                        <div className="overview">
                            <div className="heading">Overview</div>
                            <div className="description">{data.overview}</div>
                        </div>
                        <div className="info">
                            {data.status && <InfoItem label="Status" value={data.status} />}
                            {releaseDate && <InfoItem label="Release Date" value={dayjs(releaseDate).format("MMM D, YYYY")} />}
                            {data.runtime > 0 && <InfoItem label="Run Time" value={toHoursAndMinutes(data.runtime)} />}
                        </div>
                        {director && <InfoRow label="Director" value={director} />}
                        {writer && <InfoRow label="Writer" value={writer} />}
                        {creator && <InfoRow label="Creator" value={creator} />}
                    </div>
                </div>
                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
            </ContentWrapper>
        </div>
    );
};

export default DetailsBanner;
