import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./detailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hook/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImg/Img";
import PosterFallback from "../../../assets/images/no-poster.png";
import { PlayButton } from "../../../components/playButton/PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPoPup";

const DetailsBanner = ({ video, crew }) => {
const [show ,setShow] = useState(false);
const [videoId , setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector(state => state.home);
    const genres = data?.genres?.map(g => g.id);

    const director = crew?.filter(f => f.job === 'Director');
    const writer = crew?.filter(f => f.job === 'Screenplay' || f.job === 'Writer' || f.job === 'Story');

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url.backDrop + data.backdrop_path} alt="" />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img src={url.backDrop + data.poster_path} className='posterImg' />
                                        ) : (
                                            <Img className="posterImg" src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">{`${data.name || data.title} (${dayjs(data.release_date || data.last_air_date).format('YYYY')})`}</div>
                                        <div className="subtitle">{data.tagline}</div>
                                        <Genres idsData={genres} />
                                        <div className="row">
                                            <CircleRating rating={data.vote_average.toFixed(1)} />
                                            <div className="playBtn" onClick={()=>{
                                                setShow(true);
                                                setVideoId(video.key);
                                            
                                            }}>
                                                <PlayButton />
                                                <span className="text">Watch</span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <span className="infoItem">
                                                    <span className="text bold">Status:{" "}</span>
                                                    <span className="text">{data.status}</span>
                                                </span>
                                            )}
                                            {data.release_date ? (
                                                <span className="infoItem">
                                                    <span className="text bold">Release Date:{" "}</span>
                                                    <span className="text">{dayjs(data.release_date).format('MMM D, YYYY')}</span>
                                                </span>
                                            ) : (
                                                <span className="infoItem">
                                                    <span className="text bold">Release Date:{" "}</span>
                                                    <span className="text">{dayjs(data.first_air_date).format('MMM D, YYYY')}</span>
                                                </span>
                                            )}
                                            {data.runtime && (
                                                <span className="infoItem">
                                                    <span className="text bold">Run Time:{" "}</span>
                                                    <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                                </span>
                                            )}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info">
                                                    <span className="text bold">Director: {" "}</span>
                                                <span className="text">
                                                    {director?.map((d, i) => <span key={i}>{d.name}
                                                        {director.length - 1 !== i && ", "}</span>)}
                                                </span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span  className="text bold">Writer: {" "}</span>
                                                <span className="text">
                                                    {writer?.map((d, i) => <span key={i}>{d.name}
                                                        {writer.length - 1 !== i && ", "}</span>)}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span  className="text bold">Creator:</span>
                                                <span className="text">
                                                    {data?.created_by?.map((d, i) => <span key={i}>{d.name}
                                                        {data?.created_by.length - 1 !== i && ", "}</span>)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}  />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;