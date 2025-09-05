import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings, 
  Maximize, 
  SkipBack, 
  SkipForward,
  RotateCcw,
  ChevronDown,
  Download,
  Share2
} from "lucide-react";

export default function VideoPlayer({ 
  videoUrl = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
  title = "Introduction to Web Development",
  subtitles = [],
  onProgress,
  initialTime = 0
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  useEffect(() => {
    if (onProgress) {
      onProgress(currentTime, duration);
    }
  }, [currentTime, duration, onProgress]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    video.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
  };

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden group">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onClick={togglePlay}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      />

      {/* Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
          >
            <Play size={32} className="text-[#2563EB] ml-2" />
          </button>
        </div>
      )}

      {/* Video Controls */}
      <div className={`
        absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent
        p-4 transition-opacity duration-300
        ${showControls ? "opacity-100" : "opacity-0"}
      `}>
        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            className="w-full h-1 bg-gray-600 rounded cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-[#2563EB] rounded"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between text-white">
          {/* Left Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => skip(-10)}
              className="hover:text-[#2563EB] transition-colors"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="hover:text-[#2563EB] transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={() => skip(10)}
              className="hover:text-[#2563EB] transition-colors"
            >
              <SkipForward size={20} />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="hover:text-[#2563EB] transition-colors">
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none slider"
              />
            </div>

            {/* Time Display */}
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <button className="hover:text-[#2563EB] transition-colors">
              <Download size={20} />
            </button>

            <button className="hover:text-[#2563EB] transition-colors">
              <Share2 size={20} />
            </button>

            {/* Settings Menu */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="hover:text-[#2563EB] transition-colors"
              >
                <Settings size={20} />
              </button>

              {showSettings && (
                <div className="absolute bottom-8 right-0 bg-[#1F2937] rounded-lg p-3 min-w-[150px]">
                  <div className="text-sm font-medium mb-2">Playback Speed</div>
                  {playbackRates.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => changePlaybackRate(rate)}
                      className={`
                        block w-full text-left px-2 py-1 text-sm rounded
                        ${playbackRate === rate ? 'bg-[#2563EB] text-white' : 'hover:bg-gray-700'}
                      `}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleFullscreen}
              className="hover:text-[#2563EB] transition-colors"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Subtitles */}
      {showSubtitles && selectedSubtitle && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded text-center">
          {selectedSubtitle.text}
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2563EB;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2563EB;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}