'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

const allPhotos = [
  { id: 1,  src: '/assets/galeria/nuevasfotos/Amazon 1-01.jpg' },
  { id: 2,  src: '/assets/galeria/nuevasfotos/Amazon 1-03.jpg' },
  { id: 3,  src: '/assets/galeria/nuevasfotos/Amazon 1-04.jpg' },
  { id: 4,  src: '/assets/galeria/nuevasfotos/Amazon 1-05.jpg' },
  { id: 5,  src: '/assets/galeria/nuevasfotos/Amazon 1-06.jpg' },
  { id: 6,  src: '/assets/galeria/nuevasfotos/Amazon 1-08.jpg' },
  { id: 7,  src: '/assets/galeria/nuevasfotos/Amazon 1-09.jpg' },
  { id: 8,  src: '/assets/galeria/nuevasfotos/Amazon 1-12.jpg' },
  { id: 9,  src: '/assets/galeria/nuevasfotos/Amazon 1-13.jpg' },
  { id: 10, src: '/assets/galeria/nuevasfotos/Amazon 1-16.jpg' },
  { id: 11, src: '/assets/galeria/nuevasfotos/Amazon 1-17.jpg' },
  { id: 12, src: '/assets/galeria/nuevasfotos/Amazon 1-18.jpg' },
  { id: 13, src: '/assets/galeria/nuevasfotos/Amazon 1-19.jpg' },
  { id: 14, src: '/assets/galeria/nuevasfotos/Amazon 1-22.jpg' },
  { id: 15, src: '/assets/galeria/nuevasfotos/Amazon 2-01.jpg' },
  { id: 16, src: '/assets/galeria/nuevasfotos/Amazon 2-02.jpg' },
  { id: 17, src: '/assets/galeria/nuevasfotos/Amazon 2-03.jpg' },
  { id: 18, src: '/assets/galeria/nuevasfotos/Amazon 2-06.jpg' },
  { id: 19, src: '/assets/galeria/nuevasfotos/Amazon 2-10.jpg' },
  { id: 20, src: '/assets/galeria/nuevasfotos/Amazon 2-11.jpg' },
  { id: 21, src: '/assets/galeria/nuevasfotos/Amazon 2-12.jpg' },
  { id: 22, src: '/assets/galeria/nuevasfotos/Amazon 2-14.jpg' },
  { id: 23, src: '/assets/galeria/nuevasfotos/Amazon 2-15.jpg' },
  { id: 24, src: '/assets/galeria/nuevasfotos/Amazon 2-16.jpg' },
  { id: 25, src: '/assets/galeria/nuevasfotos/Amazon 2-17.jpg' },
  { id: 26, src: '/assets/galeria/nuevasfotos/Amazon 2-20.jpg' },
  { id: 27, src: '/assets/galeria/nuevasfotos/Amazon 2-21.jpg' },
  { id: 28, src: '/assets/galeria/nuevasfotos/Amazon 2-23.jpg' },
  { id: 29, src: '/assets/galeria/nuevasfotos/Amazon 2-24.jpg' },
  { id: 30, src: '/assets/galeria/nuevasfotos/Amazon 2-25.jpg' },
  { id: 31, src: '/assets/galeria/nuevasfotos/Amazon 2-27.jpg' },
  { id: 32, src: '/assets/galeria/nuevasfotos/Amazon 2-30.jpg' },
  { id: 33, src: '/assets/galeria/nuevasfotos/Amazon 2-31.jpg' },
  { id: 34, src: '/assets/galeria/nuevasfotos/Amazon 2-34.jpg' },
  { id: 35, src: '/assets/galeria/nuevasfotos/Amazon 2-35.jpg' },
  { id: 36, src: '/assets/galeria/nuevasfotos/Amazon 2-36.jpg' },
  { id: 37, src: '/assets/galeria/nuevasfotos/Amazon 2-37.jpg' },
  { id: 38, src: '/assets/galeria/nuevasfotos/Amazon 2-38.jpg' },
  { id: 39, src: '/assets/galeria/nuevasfotos/Amazon 2-39.jpg' },
];

const PREVIEW_COUNT = 9; // 9 photos + 1 "ver más" card = 10 slots

export default function ExpeditionPhotosSection({ locale }: { locale: string }) {
  const [modalOpen,   setModalOpen]   = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const isEs = locale === 'es';

  // Keyboard navigation
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIdx !== null) setLightboxIdx(null);
        else setModalOpen(false);
      }
      if (lightboxIdx !== null) {
        if (e.key === 'ArrowRight') setLightboxIdx(i => ((i ?? 0) + 1) % allPhotos.length);
        if (e.key === 'ArrowLeft')  setLightboxIdx(i => ((i ?? 0) - 1 + allPhotos.length) % allPhotos.length);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalOpen, lightboxIdx]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const preview = allPhotos.slice(0, PREVIEW_COUNT);
  const remaining = allPhotos.length - PREVIEW_COUNT;

  return (
    <>
      {/* ─── SECTION ─────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Images className="h-5 w-5 text-emerald" />
              <span className="text-emerald text-sm font-medium uppercase tracking-widest">
                {isEs ? 'Fotografías de campo' : 'Field photography'}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-deepBlue leading-tight">
                  {isEs ? 'La Amazonía a través del lente' : 'The Amazon Through the Lens'}
                </h2>
                <p className="mt-2 text-darkGray text-base max-w-xl leading-relaxed">
                  {isEs
                    ? 'Capturas reales de nuestros turistas y fotógrafos durante las expediciones.'
                    : 'Real captures by our tourists and photographers during expeditions.'}
                </p>
              </div>
              <span className="text-sm text-uiGray self-start sm:self-auto whitespace-nowrap">
                {allPhotos.length} {isEs ? 'fotografías' : 'photographs'}
              </span>
            </div>
          </div>

          {/* Photo grid — 9 photos + "ver más" card */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {preview.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => { setModalOpen(true); setLightboxIdx(idx); }}
                className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100 focus:outline-none"
              >
                <Image
                  src={photo.src}
                  alt={`Amazon expedition photo ${photo.id}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </button>
            ))}

            {/* "Ver más" card */}
            <button
              onClick={() => setModalOpen(true)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-900 flex flex-col items-center justify-center gap-2 focus:outline-none hover:bg-neutral-800 transition-colors duration-300"
            >
              <span className="text-white text-3xl font-bold">+{remaining}</span>
              <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                {isEs ? 'ver más' : 'see more'}
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ─── MODAL ───────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">

          {/* Sticky modal header */}
          <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-white/8 px-4 sm:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {lightboxIdx !== null && (
                <button
                  onClick={() => setLightboxIdx(null)}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white text-sm transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {isEs ? 'Galería' : 'Gallery'}
                </button>
              )}
              <div className={lightboxIdx !== null ? 'border-l border-white/10 pl-3' : ''}>
                <p className="text-white text-sm font-semibold">
                  {isEs ? 'La Amazonía a través del lente' : 'The Amazon Through the Lens'}
                </p>
                <p className="text-neutral-500 text-xs mt-0.5">
                  {lightboxIdx !== null
                    ? `${lightboxIdx + 1} / ${allPhotos.length}`
                    : `${allPhotos.length} ${isEs ? 'fotografías' : 'photographs'}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Grid view */}
          {lightboxIdx === null && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allPhotos.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setLightboxIdx(idx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <Image
                    src={photo.src}
                    alt={`Amazon expedition photo ${photo.id}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>
          )}

          {/* Lightbox view */}
          {lightboxIdx !== null && (
            <div className="relative flex items-center justify-center min-h-[calc(100vh-73px)] px-14 sm:px-20 py-8">
              <div className="w-full max-w-5xl">
                <Image
                  src={allPhotos[lightboxIdx].src}
                  alt={`Amazon expedition photo ${allPhotos[lightboxIdx].id}`}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[75vh] w-auto mx-auto rounded-xl"
                />
              </div>

              <button
                onClick={() => setLightboxIdx(i => ((i ?? 0) - 1 + allPhotos.length) % allPhotos.length)}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setLightboxIdx(i => ((i ?? 0) + 1) % allPhotos.length)}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
