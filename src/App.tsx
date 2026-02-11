// @ts-nocheck
/* eslint-disable */

import React, { useState, useEffect } from 'react';

// --- KUNCI RAHASIA UNSPLASH ---
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

// --- DATA DUMMY ---
const INITIAL_IMAGES = [
  { id: 1, type: 'image', title: "Loading Visuals...", category: "System", height: 300, color: "#f3f4f6" },
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

  // --- BAGIAN UTAMA: PENGAMBIL DATA (MODE MANUAL AGAR ANTI-BLOKIR) ---
  useEffect(() => {
    const loadManualData = () => {
      if (activeTab === 'feed' && isLive) {
        // Daftar gambar berkualitas dari Picsum (Anti-CORB)
        const manualPhotos = [
          { id: 101, type: 'image', title: "Abstract 3D Shape", user: "CreativeCo", height: 300, color: "#E0F2F1", url: "https://picsum.photos/400/300?random=1" },
          { id: 102, type: 'image', title: "Minimalist Room", user: "StudioDesign", height: 400, color: "#F3E5F5", url: "https://picsum.photos/400/400?random=2" },
          { id: 103, type: 'image', title: "Neon Cyberpunk", user: "FutureLabs", height: 250, color: "#ECEFF1", url: "https://picsum.photos/400/250?random=3" },
          { id: 104, type: 'image', title: "Coffee Aesthetics", user: "BaristaLife", height: 350, color: "#FFF3E0", url: "https://picsum.photos/400/350?random=4" },
          { id: 105, type: 'image', title: "Mountain View", user: "NaturePh", height: 280, color: "#E8F5E9", url: "https://picsum.photos/400/280?random=5" },
          { id: 106, type: 'image', title: "Modern Architecture", user: "ArchiView", height: 380, color: "#FAFAFA", url: "https://picsum.photos/400/380?random=6" },
        ];

        const timestamp = Date.now();
        const freshPhotos = manualPhotos.map((p, index) => ({
          ...p,
          id: timestamp + index,
          isNew: true
        }));

        setFeedItems(prev => [...freshPhotos, ...prev].slice(0, 50));
      }
    };

    let interval;
    if (activeTab === 'feed' && isLive) {
      loadManualData(); // Load awal
      interval = setInterval(loadManualData, 5000); // Load tiap 5 detik
    }

    return () => clearInterval(interval);
  }, [activeTab, isLive]); 

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
    if (activeTab === '
