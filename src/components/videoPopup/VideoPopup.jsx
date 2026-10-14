import ReactPlayer from "react-player/youtube";

import "./videoPopup.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <button className="closeBtn" onClick={hidePopup}>
                    Close
                </button>
                {/* Mount the player only when needed so pages don't preload YouTube. */}
                {videoId && (
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        controls
                        width="100%"
                        height="100%"
                    />
                )}
            </div>
        </div>
    );
};

export default VideoPopup;
