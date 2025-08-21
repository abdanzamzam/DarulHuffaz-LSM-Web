import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, Settings } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  autoPlay?: boolean;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  autoPlay = false,
  onComplete,
  onProgress
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  const hideControlsTimeout = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setLoading(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onProgress) {
        onProgress(video.currentTime / video.duration);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      if (onComplete) {
        onComplete();
      }
    };
    
    const handleError = () => {
      setError('Terjadi kesalahan saat memuat video.');
      setLoading(false);
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [onComplete, onProgress]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.play().catch(error => {
        console.error('Error playing video:', error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = isMuted;
  }, [isMuted]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.volume = volume;
  }, [volume]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = playbackRate;
  }, [playbackRate]);
  
  useEffect(() => {
    if (showControls) {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      
      hideControlsTimeout.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    }
    
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [showControls, isPlaying]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressRef.current;
    const video = videoRef.current;
    
    if (!progressBar || !video) return;
    
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const toggleFullscreen = () => {
    const videoContainer = document.getElementById('video-container');
    
    if (!videoContainer) return;
    
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = Math.min(video.currentTime + 10, duration);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = Math.max(video.currentTime - 10, 0);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };
  
  if (loading) {
    return (
      <div className="bg-black rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
        <div className="w-full pb-[56.25%]"></div> {/* 16:9 aspect ratio */}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-black rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center flex-col p-4">
          <p className="text-white text-center mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Coba Lagi
          </button>
        </div>
        <div className="w-full pb-[56.25%]"></div> {/* 16:9 aspect ratio */}
      </div>
    );
  }
  
  return (
    <div 
      id="video-container"
      className="bg-black rounded-lg overflow-hidden relative group"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {title && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 z-10 transition-opacity duration-300">
          <h3 className="text-white font-medium">{title}</h3>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-auto"
        onClick={togglePlay}
        playsInline
      />
      
      {/* Overlay for play/pause on click */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={togglePlay}
      />
      
      {/* Play/Pause icon overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            className="bg-primary/80 text-white rounded-full p-4 hover:bg-primary transition-colors"
            onClick={togglePlay}
          >
            <Play className="h-8 w-8" />
          </button>
        </div>
      )}
      
      {/* Video controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress bar */}
        <div 
          ref={progressRef}
          className="w-full h-1 bg-gray-600 rounded-full mb-2 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-primary rounded-full relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause button */}
            <button 
              className="text-white hover:text-primary transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            {/* Skip backward button */}
            <button 
              className="text-white hover:text-primary transition-colors"
              onClick={skipBackward}
            >
              <SkipBack className="h-5 w-5" />
            </button>
            
            {/* Skip forward button */}
            <button 
              className="text-white hover:text-primary transition-colors"
              onClick={skipForward}
            >
              <SkipForward className="h-5 w-5" />
            </button>
            
            {/* Volume control */}
            <div className="flex items-center space-x-2">
              <button 
                className="text-white hover:text-primary transition-colors"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
              />
            </div>
            
            {/* Time display */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Playback speed */}
            <div className="relative group">
              <button className="text-white hover:text-primary transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-md p-2 hidden group-hover:block">
                <div className="text-white text-sm font-medium mb-1">Kecepatan</div>
                <div className="space-y-1">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      className={`block w-full text-left px-2 py-1 text-sm rounded ${playbackRate === rate ? 'bg-primary text-white' : 'text-white hover:bg-gray-700'}`}
                      onClick={() => handlePlaybackRateChange(rate)}
                    >
                      {rate === 1 ? 'Normal' : `${rate}x`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Fullscreen button */}
            <button 
              className="text-white hover:text-primary transition-colors"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;