import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, ChevronDown } from 'lucide-react';

export default function Opening({ config, isOpen, onOpen }) {
  const [guestName, setGuestName] = useState('Yogi dan Ratna');
  const [isPlayingIntroVideo, setIsPlayingIntroVideo] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setGuestName(to);
    }
  }, []);

  const handleStartVideo = () => {
    setIsPlayingIntroVideo(true);
    // Play video when user interacts with button
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => console.log("Video play error:", err));
      }
    }, 100);
  };

  const handleVideoEnded = () => {
    setIsVideoEnded(true);
    if (videoRef.current) {
      videoRef.current.pause(); // Freeze on final video frame
    }
    onOpen(); // Unlock page scrolling & trigger audio music
  };

  const handleTouchMove = (e) => {
    if (!isOpen && !isVideoEnded) {
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-screen"
          onTouchMove={handleTouchMove}
          className="fixed sm:absolute inset-0 z-50 w-full h-full min-h-screen bg-black flex flex-col justify-between items-center overflow-hidden text-white touch-none select-none"
        >
          {/* Cover Screen BEFORE clicking Buka Undangan */}
          {!isPlayingIntroVideo ? (
            <div className="relative w-full h-full flex flex-col justify-between items-center text-center">
              {/* Full Cover Background Photo */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src={config.heroImage}
                  alt="Cover Juwita & Seno"
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
                />
                {/* Subtle Gradient Overlays for readable text */}
                <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Top Text Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 pt-12 sm:pt-14 text-center px-4 space-y-1"
              >
                <h1 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-widest uppercase drop-shadow-lg">
                  JUWITA & SENO
                </h1>
              </motion.div>

              {/* Bottom Guest Receiver & Open Button Container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative z-10 pb-12 sm:pb-16 text-center px-6 w-full space-y-2.5"
              >
                <p className="font-serif text-xs sm:text-sm text-white/90 drop-shadow">
                  Kepada Bapak/Ibu/Saudara/i
                </p>

                <h2 className="font-serif text-xl sm:text-2xl text-white font-bold capitalize drop-shadow-md tracking-wide">
                  {guestName}
                </h2>

                <p className="font-serif text-xs sm:text-sm text-white/80 drop-shadow pb-1">
                  Di Tempat
                </p>

                {/* Buka Undangan Button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleStartVideo}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md border border-white/80 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white font-serif text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xl mx-auto cursor-pointer"
                >
                  <MailOpen className="w-4 h-4 text-white" />
                  <span>Buka Undangan</span>
                </motion.button>
              </motion.div>
            </div>
          ) : (
            /* Intro Video Player (Unskippable, freezes on last frame when ended) */
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden pointer-events-none">
              <video
                ref={videoRef}
                src="/assets/opening_video2.mp4"
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover object-center"
              />

              {/* Scroll Down Indicator Overlay when video ends */}
              {isVideoEnded && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-jawa-gold bg-black/60 px-4 py-2 rounded-full border border-jawa-gold/40 backdrop-blur-md shadow-2xl"
                >
                  <span className="text-[10px] tracking-[0.25em] font-cinzel uppercase font-bold text-jawa-goldlight">
                    Gulir Ke Bawah
                  </span>
                  <ChevronDown className="w-4 h-4 text-jawa-gold animate-bounce" />
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
