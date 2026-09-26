import React, { useState, useEffect } from 'react';
import { Image, Video, Sparkles, Filter, X } from 'lucide-react';
import api from '../../services/api';
import TempleBorder from '../../components/common/TempleBorder';
import KolamDivider from '../../components/common/KolamDivider';

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await api.get(`/gallery?category=${category}`);
        if (res.data.success) {
          setItems(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, [category]);

  const categories = [
    { id: 'all', name: 'All Media' },
    { id: 'performances', name: 'Stage Performances' },
    { id: 'arangetram', name: 'Arangetrams' },
    { id: 'salangai-pooja', name: 'Salangai Pooja' },
    { id: 'classroom', name: 'Classroom & Sadhana' },
  ];

  return (
    <div className="bg-temple-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-temple-gold px-3 py-1 rounded-full bg-temple-maroon/10 border border-temple-gold/40">
            Visual Splendor
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-temple-maroon mt-3">
            Performance Gallery
          </h1>
          <p className="font-cormorant italic text-lg sm:text-xl text-stone-600 mt-2">
            Moments of devotion, rhythm, and grace captured on temple stages and auditoriums
          </p>
        </div>

        <TempleBorder />

        {/* Filter Pills */}
        <div className="my-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-cinzel tracking-wider font-semibold transition-all ${
                category === c.id
                  ? 'bg-temple-maroon text-temple-gold border-2 border-temple-gold shadow-md'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-temple-gold hover:text-temple-maroon'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border-2 border-temple-gold/40 shadow-temple hover:shadow-temple-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden bg-temple-maroon">
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="font-cinzel text-xs font-bold text-temple-gold tracking-wide">
                    Click to View Full Preview
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-temple-maroon/90 text-temple-gold border border-temple-gold/40 text-[10px] font-cinzel uppercase">
                  {item.category}
                </div>
              </div>

              <div className="p-4 bg-white">
                <h3 className="font-cinzel font-bold text-sm text-temple-maroon group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Viewer */}
        {selectedMedia && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-temple-maroon-deep rounded-2xl overflow-hidden border-2 border-temple-gold shadow-2xl">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-temple-maroon text-white hover:text-temple-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-h-[70vh] flex items-center justify-center bg-black">
                <img
                  src={selectedMedia.media_url}
                  alt={selectedMedia.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-temple-maroon border-t border-temple-gold/40 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-cinzel font-bold text-lg text-temple-gold-light">
                    {selectedMedia.title}
                  </h3>
                  <p className="text-xs text-amber-200/70 capitalize font-outfit mt-0.5">
                    Category: {selectedMedia.category.replace('-', ' ')}
                  </p>
                </div>
                <span className="font-cinzel text-xs text-temple-gold px-3 py-1 rounded border border-temple-gold/40">
                  Sri Ruthraalayaa
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
