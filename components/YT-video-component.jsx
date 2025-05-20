import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';

const YouTubeVideoPlayer = ({ url }) => {
  const [videoKey, setVideoKey] = useState(Date.now());

  const handleVideoEnd = () => {
    // Reset the video to return to the thumbnail.
    setVideoKey(Date.now());
  };

  const videoContainerStyle = {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // Aspect Ratio 16:9
    height: '0',
    border: '1px solid #CCCCCC',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    overflow: 'hidden',
    borderRadius: '10px',
    marginBottom: '40px',
  };

  const videoPlayerStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  };

  return (
    <div style={videoContainerStyle}>
      <ReactPlayer
        key={videoKey} // Key that forces the re-render.
        url={url}
        controls={true}
        style={videoPlayerStyle}
        width='100%'
        height='100%'
        onEnded={handleVideoEnd}
        config={{
          youtube: {
            playerVars: { rel: 0, showinfo: 0 } // Options to hide related videos and video information
          }
        }}
      />
    </div>
  );
};

export default YouTubeVideoPlayer;
