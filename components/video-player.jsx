import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import '../static/styles.css';

const PortalVideoPlayer = ({ url, thumbnail }) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleVideoEnd = () => {
    setPlaying(false);
  };

  // Container style
  const videoContainerStyle = {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // 16:9 Aspect Ratio
    height: '0',
    border: '1px solid #CCCCCC',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)', // Fully opaque black shadow
    overflow: 'hidden',
    borderRadius: '10px',
    marginBottom: '40px'
  };

   // Thumbnail style
   const thumbnailStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundImage: `url(${thumbnail})`, // Use thumbnailUrl here
    backgroundPosition: 'center center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };


  // Video player style
  const videoPlayerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%', // Full width of the container
    height: '100%', // Full height of the container
  };

  // Play button style
  const playButtonStyle = {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  };

  return (
    <div style={videoContainerStyle}>
      {!playing && (
        <div onClick={handlePlay} style={{ ...thumbnailStyle, backgroundImage: `url(${thumbnail})` }}>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00NjQgMjU2QTIwOCAyMDggMCAxIDAgNDggMjU2YTIwOCAyMDggMCAxIDAgNDE2IDB6TTAgMjU2YTI1NiAyNTYgMCAxIDEgNTEyIDBBMjU2IDI1NiAwIDEgMSAwIDI1NnpNMTg4LjMgMTQ3LjFjNy42LTQuMiAxNi44LTQuMSAyNC4zIC41bDE0NCA4OGM3LjEgNC40IDExLjUgMTIuMSAxMS41IDIwLjVzLTQuNCAxNi4xLTExLjUgMjAuNWwtMTQ0IDg4Yy03LjQgNC41LTE2LjcgNC43LTI0LjMgLjVzLTEyLjMtMTIuMi0xMi4zLTIwLjlWMTY4YzAtOC43IDQuNy0xNi43IDEyLjMtMjAuOXoiLz4KPC9zdmc+Cg=="
            alt="Play video"
            style={playButtonStyle}
            width="80"
            height="80"
          />
        </div>
      )}
      {playing && (
        <ReactPlayer
        url={url}
        playing={playing}
        controls={true}
        style={videoPlayerStyle}
        width='100%'
        height='100%'
        className="customVideoPlayer"
        onEnded={handleVideoEnd} 
      />
      )}
    </div>
  );
};

export default PortalVideoPlayer;