import React from 'react';
import { VideoTutorial } from '../../types/drawing';

interface VideoPlayerProps {
  tutorial: VideoTutorial;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ tutorial }) => (
  <div className="aspect-w-16 aspect-h-9 mb-4">
    <iframe
      width="100%"
      height="315"
      src={`https://www.youtube-nocookie.com/embed/${tutorial.embedId}?rel=0`}
      title={tutorial.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full rounded-lg"
      loading="lazy"
    />
  </div>
);

export default VideoPlayer;