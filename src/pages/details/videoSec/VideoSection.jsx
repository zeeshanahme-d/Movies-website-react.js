import { useState } from "react";

import "./videoSection.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayButton } from "../../../components/playButton/PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImg/Img";

const SkeletonItem = () => (
    <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
    </div>
);

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    if (!loading && !data?.results?.length) return null;

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data.results.map((video) => (
                            <button
                                className="videoItem"
                                key={video.id}
                                onClick={() => {
                                    setShow(true);
                                    setVideoId(video.key);
                                }}
                            >
                                <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} alt={video.name} />
                                    <PlayButton />
                                    <div className="videoTitle">{video.name}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {Array.from({ length: 4 }, (_, i) => <SkeletonItem key={i} />)}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
        </div>
    );
};

export default VideosSection;
