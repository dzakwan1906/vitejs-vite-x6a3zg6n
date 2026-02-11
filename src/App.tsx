// @ts-nocheck
/* eslint-disable */

import React, { useState, useEffect } from 'react';

// --- KUNCI RAHASIA UNSPLASH KAMU (SUDAH DIPASANG) ---
const UNSPLASH_ACCESS_KEY = "5BVjPrhMACUT-tx8iqvJRkOi8BG78RH2CGE1bork9v"; 

// --- BAGIAN 1: IKON MANUAL ---
const Icon = ({ path, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className || "w-full h-full"}
  >
    {path}
  </svg>
);

const Icons = {
  Search: (props) => <Icon {...props} path={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />,
  Heart: ({ filled, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "w-full h-full"}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  Zap: (props) => <Icon {...props} path={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>} />,
  Bookmark: ({ filled, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "w-full h-full"}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Type: (props) => <Icon {...props} path={<><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>} />,
  FileText: (props) => <Icon {...props} path={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>} />,
  Image: (props) => <Icon {...props} path={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>} />,
  X: (props) => <Icon {...props} path={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />,
  ExternalLink: (props) => <Icon {...props} path={<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>} />,
  Share2: (props) => <Icon {...props} path={<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>} />,
};

// --- DATA DUMMY CADANGAN (Jaga-jaga kalau API error) ---
const INITIAL_IMAGES = [
  { id: 1, type: 'image', title: "Loading Unsplash...", category: "System", height: 300, color: "bg-gray-200" },
];

const INITIAL_FONTS = [
  { id: 101, type: 'font', title: "Helios Antique", style: "Serif", preview: "Aa", tag: "Elegant" },
  { id: 102, type: 'font', title: "Neue Montreal", style: "Sans-Serif", preview: "Gg", tag: "Modern" },
];

const INITIAL_ARTICLES = [
  { 
    id: 201, 
    type: 'article', 
    title: "10 Tren UI Design di Tahun 2026", 
    source: "Medium", 
    readTime: "5 min", 
    summary: "Eksplorasi gaya Neumorphism yang kembali populer...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  { 
    id: 202, 
    type: 'article', 
    title: "Psikologi Warna dalam Branding", 
    source: "The Verge", 
    readTime: "8 min", 
    summary: "Mengapa warna biru sering digunakan oleh perusahaan teknologi?",
    content: "Warna bukan sekadar estetika. Warna adalah bahasa bawah sadar..."
  },
];

const TrendHubPro = () => {
  const [activeTab, setActiveTab] = useState('feed'); 
  const [feedItems, setFeedItems] = useState(INITIAL_IMAGES);
  const [fontItems, setFontItems] = useState(INITIAL_FONTS);
  const [articleItems, setArticleItems] = useState(INITIAL_ARTICLES);
  const [savedIds, setSavedIds] = useState([]);
  const [readingArticle, setReadingArticle] = useState(null);
  const [isLive, setIsLive] = useState(true); 

  useEffect(() => {
    const saved = localStorage.getItem('mySavedTrends_v2');
    if (saved) setSavedIds(JSON.parse(saved));
  }, []);

  // --- BAGIAN PENTING: TARIK DATA DARI UNSPLASH ---
  useEffect(() => {
    // Fungsi untuk mengambil gambar asli
    const fetchUnsplashPhotos = async () => {
      if (activeTab === 'feed' && isLive) {
        try {
          // Kita minta 12 foto random tentang design & minimalis
          const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=12&query=design,minimalist,architecture`);
          const data = await response.json();

          // Cek apakah Unsplash marah (Error limit habis atau kunci salah)
          if (data.errors) {
            console.error("Unsplash Error:", data.errors);
            return;
          }

          // Ubah data Unsplash jadi format TrendHub
          const realPhotos = data.map((img) => ({
            id: img.id,
            type: 'image',
            title: img.description || img.alt_description || 'Untitled Inspiration',
            category: 'Unsplash',
            height: (img.height / img.width) * 300, // Hitung tinggi biar rapi
            color: img.color, // Warna asli foto
            url: img.urls.regular, // Link foto HD
            user: img.user.name, // Nama fotografer
            isNew: true
          }));

          setFeedItems(realPhotos);
        } catch (error) {
          console.log("Gagal mengambil foto (Mungkin limit habis):", error);
        }
      }
    };

    fetchUnsplashPhotos();

    // Tombol refresh manual (opsional, biar gak boros kuota API)
  }, [activeTab]); 

  const toggleSave = (id) => {
    const newSaved = savedIds.includes(id) ? savedIds.filter(sid => sid !== id) : [...savedIds, id];
    setSavedIds(newSaved);
    localStorage.setItem('mySavedTrends_v2', JSON.stringify(newSaved));
  };

  const getDisplayItems = () => {
    if (activeTab === 'saved') {
      const allItems = [...feedItems, ...fontItems, ...articleItems];
      return allItems.filter(item => savedIds.includes(item.id));
    }
    if (activeTab === 'fonts') return fontItems;
    if (activeTab === 'articles') return articleItems;
    return feedItems;
  };

  const items = getDisplayItems();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-lime-200 selection:text-black">
      
      {readingArticle && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-12 relative">
            <button onClick={() => setReadingArticle(null)} className="fixed top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <div className="w-5 h-5"><Icons.X /></div>
            </button>
            <span className="text-lime-600 font-bold tracking-widest text-xs uppercase mb-2 block">{readingArticle.source} • {readingArticle.readTime} Read</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{readingArticle.title || 'Untitled'}</h1>
            <div className="prose prose-lg prose-slate text-gray-700 leading-relaxed">
              <p className="text-xl text-black font-serif mb-6">{readingArticle.summary}</p>
              <p>{readingArticle.content}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur border-b border-gray-100 px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('feed')}>
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">TH</div>
            <span className="font-bold text-xl tracking-tighter">TrendHub</span>
          </div>
        </div>
        <div className="flex p-1 bg-gray-100 rounded-full self-center md:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'feed', icon: Icons.Image, label: 'Visuals' },
            { id: 'fonts', icon: Icons.Type, label: 'Fonts' },
            { id: 'articles', icon: Icons.FileText, label: 'Articles' },
            { id: 'saved', icon: Icons.Bookmark, label: 'Saved' }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}>
                <div className="w-4 h-4">
                  <IconComponent filled={activeTab === tab.id} />
                </div>
                {tab.label}
              </button>
            )
          })}
        </div>
        <div className="hidden md:flex items-center gap-3">
           {/* Tombol Refresh Manual untuk API */}
           <button onClick={() => window.location.reload()} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200" title="Refresh Images">
             <div className="w-4 h-4"><Icons.Zap /></div>
           </button>
        </div>
      </nav>

      <main className="pt-32 md:pt-24 px-4 md:px-8 pb-10 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2 capitalize">{activeTab === 'saved' ? 'My Collections' : `Trending ${activeTab}`}</h1>
          <p className="text-gray-500">
            {activeTab === 'fonts' ? 'Temukan tipografi terbaik untuk project UI-mu.' : 
             activeTab === 'articles' ? 'Bacaan kurasi dari industri kreatif & teknologi.' :
             'Inspirasi visual yang dikurasi secara real-time dari Unsplash.'}
          </p>
        </div>

        <div className={`grid gap-6 ${activeTab === 'articles' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {items.map((item) => (
            <div key={item.id} className={`group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${item.isNew ? 'animate-bounce ring-2 ring-blue-500' : ''}`}>
              
              {/* --- TAMPILAN GAMBAR (SDH UPDATED UTK UNSPLASH) --- */}
              {item.type === 'image' && (
                <div className="w-full relative overflow-hidden" style={{ backgroundColor: item.color || '#eee', height: item.height ? `${item.height}px` : '300px' }}>
                   {/* Panggil URL asli dari Unsplash */}
                   <img src={item.url || `https://source.unsplash.com/random/400x300?sig=${item.id}`} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-700" alt="visual"/>
                   
                   <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => toggleSave(item.id)} className="bg-white p-2 rounded-full shadow-sm hover:scale-110 transition">
                        <div className={`w-5 h-5 ${savedIds.includes(item.id) ? 'text-red-500' : 'text-gray-600'}`}><Icons.Heart filled={savedIds.includes(item.id)} /></div>
                      </button>
                   </div>
                   
                   {/* Credit Fotografer (Wajib menurut aturan Unsplash) */}
                   <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition">
                     <p className="font-bold text-sm truncate">{item.title}</p>
                     <p className="text-xs text-gray-300">by {item.user || 'Unknown'}</p>
                   </div>
                </div>
              )}

              {item.type === 'font' && (
                <div className="p-6 flex flex-col h-64 justify-between bg-gray-50 group-hover:bg-white transition">
                  <div className="flex justify-between items-start"><span className="text-xs font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded">{item.style}</span><button onClick={() => toggleSave(item.id)}><div className={`w-5 h-5 ${savedIds.includes(item.id) ? 'text-red-500' : 'text-gray-300'}`}><Icons.Heart filled={savedIds.includes(item.id)} /></div></button></div>
                  <div className="text-center"><h2 className={`text-6xl md:text-8xl mb-2 text-gray-800 ${item.style === 'Serif' ? 'font-serif' : item.style === 'Mono' ? 'font-mono' : 'font-sans'}`}>{item.preview}</h2><p className="font-bold text-xl">{item.title}</p></div>
                </div>
              )}
              {item.type === 'article' && (
                <div className="p-6 flex flex-col h-auto bg-white hover:border-gray-300 transition cursor-pointer" onClick={() => setReadingArticle(item)}>
                  <div className="flex justify-between mb-4"><span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.source}</span><button onClick={(e) => {e.stopPropagation(); toggleSave(item.id);}}><div className={`w-4 h-4 ${savedIds.includes(item.id) ? 'text-black' : 'text-gray-400'}`}><Icons.Bookmark filled={savedIds.includes(item.id)} /></div></button></div>
                  <h3 className="text-xl font-bold leading-tight mb-3 group-hover:underline decoration-2 underline-offset-4">{item.title}</h3>
                  <div className="mt-auto flex items-center justify-between text-xs text-gray-400 border-t pt-4"><span>{item.readTime} read</span><span className="flex items-center gap-1 group-hover:translate-x-1 transition text-black font-medium">Read Now <div className="w-3 h-3"><Icons.ExternalLink /></div></span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TrendHubPro;
