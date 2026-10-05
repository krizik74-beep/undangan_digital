import React, { useState, useEffect } from 'react';
import { weddingConfig } from './data/weddingConfig';
import { fetchGallery, fetchStories, fetchCouple, fetchEvents, resolveImage } from './data/api';
import Opening from './components/Opening';
import AudioPlayer from './components/AudioPlayer';
import Hero from './components/Hero';
import Couple from './components/Couple';
import Countdown from './components/Countdown';
import EventDetail from './components/EventDetail';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Gift from './components/Gift';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Data dinamis dari backend (fallback ke weddingConfig statis)
  const [gallery, setGallery] = useState(weddingConfig.gallery);
  const [stories, setStories] = useState(weddingConfig.stories);
  const [couple, setCouple] = useState({ bride: weddingConfig.bride, groom: weddingConfig.groom });
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [g, s, c, e] = await Promise.all([
        fetchGallery(weddingConfig.gallery),
        fetchStories(weddingConfig.stories),
        fetchCouple(null),
        fetchEvents(null),
      ]);
      if (cancelled) return;
      if (Array.isArray(g) && g.length > 0) {
        setGallery(g.map((it) => ({ url: resolveImage(it.url || it.image), caption: it.caption || '' })));
      }
      if (Array.isArray(s) && s.length > 0) {
        setStories(s.map((it) => ({
          year: it.year || '',
          title: it.title || '',
          description: it.description || '',
          image: resolveImage(it.image || it.url),
        })));
      }
      if (c && (c.bride || c.groom)) {
        setCouple({
          bride: c.bride
            ? {
                ...weddingConfig.bride,
                name: c.bride.name || weddingConfig.bride.name,
                nickname: c.bride.nickname || weddingConfig.bride.nickname,
                father: c.bride.father || weddingConfig.bride.father,
                mother: c.bride.mother || weddingConfig.bride.mother,
                instagram: c.bride.instagram || weddingConfig.bride.instagram,
                photo: resolveImage(c.bride.photo || c.bride.image) || weddingConfig.bride.photo,
              }
            : weddingConfig.bride,
          groom: c.groom
            ? {
                ...weddingConfig.groom,
                name: c.groom.name || weddingConfig.groom.name,
                nickname: c.groom.nickname || weddingConfig.groom.nickname,
                father: c.groom.father || weddingConfig.groom.father,
                mother: c.groom.mother || weddingConfig.groom.mother,
                instagram: c.groom.instagram || weddingConfig.groom.instagram,
                photo: resolveImage(c.groom.photo || c.groom.image) || weddingConfig.groom.photo,
              }
            : weddingConfig.groom,
        });
      }
      if (Array.isArray(e) && e.length > 0) {
        setEvents(e.map((it) => ({
          title: it.title || '',
          date: it.date || it.date_label || '',
          time: it.time || it.time_label || '',
          location: it.location || '',
          address: it.address || '',
          mapsUrl: it.mapsUrl || it.maps_url || 'https://maps.google.com',
        })));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Lock scroll until user clicks "Buka Undangan"
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  const liveConfig = { ...weddingConfig, gallery, stories, ...couple };

  return (
    <div className={`min-h-screen bg-white text-neutral-100 font-sans selection:bg-jawa-gold selection:text-jawa-dark relative ${!isOpen ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* Main Centered Mobile Portrait Frame (Matches reference screenshot) */}
      <div className={`w-full max-w-[420px] min-h-screen mx-auto bg-jawa-dark shadow-[0_0_40px_rgba(0,0,0,0.3)] relative z-10 ${!isOpen ? 'h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
        
        {/* Cover / Opening Card */}
        <Opening
          config={weddingConfig}
          isOpen={isOpen}
          onOpen={handleOpenInvitation}
        />

        {/* Floating Audio Player */}
        <AudioPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioUrl={weddingConfig.audioUrl}
        />

        {/* Main Invitation Content (Pre-rendered behind cover, revealed smoothly when opened) */}
        <main className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Hero config={weddingConfig} />
          <Couple config={liveConfig} />
          <Countdown targetDate={weddingConfig.eventDate} />
          <EventDetail config={weddingConfig} events={events} />
          <Story stories={stories} />
          <Gallery gallery={gallery} />
          <Gift banks={weddingConfig.banks} gift={weddingConfig.gift} />
          <RSVP />
          <Footer config={weddingConfig} />
        </main>
      </div>

    </div>
  );
}
