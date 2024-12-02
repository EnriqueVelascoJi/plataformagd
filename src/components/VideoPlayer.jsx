import React from 'react';
import ReactPlayer from 'react-player';

import video from '../assets/video/gd.mp4'

function VideoPlayer() {
  return (
    <div>
      <ReactPlayer url={video} />
    </div>
  );
}

export default VideoPlayer;
