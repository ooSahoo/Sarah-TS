import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';

const VimeoVideoPlayer = ({ url }) => {
  // State managing video refresh 
  const [videoKey, setVideoKey] = useState(0);

  // Container style
  const videoContainerStyle = {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // 16:9 Aspect Ratio
    height: '0',
    border: '1px solid #CCCCCC',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    overflow: 'hidden',
    borderRadius: '10px',
    marginBottom: '40px'
  };

  // Video player style
  const videoPlayerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%', // Full width of the container
    height: '100%', // Full height of the container
  };

  // Function to manage the end of video playback.
  const handleVideoEnd = () => {
    setVideoKey(prevKey => prevKey + 1); // Refresh the key to reload the video.
  };

  return (
    <div style={videoContainerStyle}>
      <ReactPlayer
        key={videoKey} // Key that updates to force the re-render of the player.
        url={url}
        playing={false}
        controls={true}
        onEnded={handleVideoEnd} // End video event handler
        style={videoPlayerStyle}
        width='100%'
        height='100%'
        light={false}
      />
    </div>
  );
};

export default VimeoVideoPlayer;
