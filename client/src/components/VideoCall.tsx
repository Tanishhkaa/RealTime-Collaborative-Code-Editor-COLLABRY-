// src/components/VideoCall.tsx

import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff } from 'lucide-react';

const VideoCall: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initCamera();

    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const toggleMic = () => {
    const audioTracks = streamRef.current?.getAudioTracks();
    if (audioTracks && audioTracks.length > 0) {
      audioTracks[0].enabled = !audioTracks[0].enabled;
      setIsMuted(!audioTracks[0].enabled);
    }
  };

  const toggleVideo = () => {
    const videoTracks = streamRef.current?.getVideoTracks();
    if (videoTracks && videoTracks.length > 0) {
      videoTracks[0].enabled = !videoTracks[0].enabled;
      setIsVideoOff(!videoTracks[0].enabled);
    }
  };

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold">Video Call</h1>

      <div className="w-full max-w-xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        {isVideoOff ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500">Video is off</div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleMic}
          className={`p-4 rounded-full transition-colors ${
            isMuted ? 'bg-red-500' : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
        </button>
        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full transition-colors ${
            isVideoOff ? 'bg-red-500' : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <VideoIcon className="w-6 h-6 text-white" />}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
