import React from 'react';

export default function Hero({ config }) {
  const fullscreenImage = config.heroFullscreenImage || "/assets/videoframe_17420.png";
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Fullscreen Image Only - videoframe_17420 */}
      <img
        src={fullscreenImage}
        alt="Juwita & Seno"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

    </section>
  );
}
