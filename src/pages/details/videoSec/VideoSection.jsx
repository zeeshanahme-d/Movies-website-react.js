import React, { useState } from "react";

import "./videoSection.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayButton } from "../../../components/playButton/PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPoPup";
import Img from "../../../components/lazyLoadImg/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <>
            {data?.results?.length > 0 ? (
                <div className="videosSection">
                    <ContentWrapper>
                        <div className="sectionHeading">Official Videos</div>
                        {!loading ? (
                            <div className="videos">
                                {data?.results?.map(video => {
                                    return (
                                        <div className="videoItem" key={video.id} onClick={() => {
                                            setShow(true);
                                            setVideoId(video.key);
                                        }}>
                                            <div className="videoThumbnail">
                                                <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                                <PlayButton />
                                                <div className="videoTitle">{video.name}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="videoSkeleton">
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                            </div>
                        )}
                    </ContentWrapper>
                    <VideoPopup
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}
                    />
                </div>
            ) : (
                <div style={{ width: 100 }}></div>
            )}
        </>
    );
};

export default VideosSection;