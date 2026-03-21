import React from 'react';

export const RewardPopup = ({ show, onClose, openingState, videoRef }: {
  show: boolean;
  onClose: () => void;
  openingState: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => (
  <div className={`fixed z-260 top-6 md:top-10 left-1/2 -translate-x-1/2 flex flex-col items-center bg-white shadow-[0_15px_40px_rgba(79,121,66,0.3)] rounded-2xl overflow-hidden border-2 border-[#4F7942] p-2.5 w-[90%] sm:w-64 max-w-sm ${openingState > 0 ? 'transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : ''} ${show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-40 opacity-0 scale-75 pointer-events-none'}`}>
    <div className="w-full flex justify-between items-start mb-1.5 px-1">
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4 md:w-5 md:h-5 text-[#4F7942] animate-bounce" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <span className="text-[10px] md:text-xs font-bold text-[#4F7942] tracking-wider">PAHALA MEMAAFKAN</span>
      </div>
      <button onClick={onClose} className="text-[#4F7942] hover:text-green-700 transition-colors">
        <svg className="w-5 h-5 focus:outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
    <div className="text-[11px] md:text-[13px] text-center font-extrabold text-[#4F7942] mb-2.5 leading-snug px-1 drop-shadow-sm flex flex-col gap-1 items-center">
      <span className="text-[9px] md:text-[10px] bg-[#4F7942] text-white px-2 py-0.5 rounded-full font-bold">QS. Asy-Syura: 40</span>
      <p>“Tetapi barang siapa memaafkan dan berbuat baik, maka pahalanya dari Allah.”</p>
    </div>
    <video 
      ref={videoRef}
      src="/ZakirNaik.mp4" 
      muted 
      autoPlay
      playsInline 
      onTimeUpdate={(e) => {
        if (e.currentTarget.currentTime >= 23) {
          e.currentTarget.currentTime = 0;
        }
      }}
      className="w-full rounded-xl object-cover shadow-inner bg-black h-36 md:h-44 border border-[#4F7942]/20"
    />
  </div>
);

export const ZakirNaikWarningPopup = ({ show, onClose, openingState, videoRef }: {
  show: boolean;
  onClose: () => void;
  openingState: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => (
  <div className={`fixed z-250 top-6 md:top-10 left-1/2 -translate-x-1/2 flex flex-col items-center bg-white shadow-[0_15px_40px_rgba(165,74,50,0.4)] rounded-2xl overflow-hidden border-2 border-[#A54A32] p-2.5 w-[90%] sm:w-64 max-w-sm ${openingState > 0 ? 'transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : ''} ${show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-40 opacity-0 scale-75 pointer-events-none'}`}>
    <div className="w-full flex justify-between items-start mb-1.5 px-1">
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4 md:w-5 md:h-5 text-[#A54A32] animate-bounce" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
        <span className="text-[10px] md:text-xs font-bold text-[#A54A32] tracking-wider">PERINGATAN</span>
      </div>
      <button onClick={onClose} className="text-[#A54A32] hover:text-red-700 transition-colors">
        <svg className="w-5 h-5 focus:outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
    <div className="text-[11px] md:text-[13px] text-center font-extrabold text-brand-primary mb-2.5 leading-snug px-1 drop-shadow-sm flex flex-col gap-1 items-center">
      <span className="text-[9px] md:text-[10px] bg-brand-primary text-bg-light px-2 py-0.5 rounded-full font-bold">HR. Muslim</span>
      <p>“Ampunan Allah ditunda bagi dua orang yang bermusuhan (menyimpan dendam) sampai keduanya berdamai.”</p>
    </div>
    <video 
      ref={videoRef}
      src="/ZakirNaik.mp4" 
      muted 
      autoPlay
      loop
      playsInline 
      onLoadedMetadata={(e) => { e.currentTarget.currentTime = 24; }}
      onSeeked={(e) => { if (e.currentTarget.currentTime < 24) e.currentTarget.currentTime = 24; }}
      className="w-full rounded-xl object-cover shadow-inner bg-black h-36 md:h-44 border border-brand-primary/20"
    />
  </div>
);

export const NewMessageVideoPopup = ({ show, onClose, openingState, videoRef }: {
  show: boolean;
  onClose: () => void;
  openingState: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => (
  <div className={`fixed z-200 left-1/2 -translate-x-1/2 flex flex-col items-center bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-brand-gold p-1.5 w-48 sm:w-56 ${openingState > 0 ? 'transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : ''} ${show ? 'top-6 md:top-10 scale-100 opacity-100' : '-top-64 scale-50 opacity-0 pointer-events-none'}`}>
    <div className="w-full flex justify-between items-center px-1.5 pb-1.5">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
        <span className="text-[9px] font-bold text-brand-secondary">PESAN BARU</span>
      </div>
      <button onClick={onClose} className="text-brand-secondary hover:text-red-500 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
    <video 
      ref={videoRef}
      src="/BOONG_YANG_BENER.mp4" 
      playsInline 
      className="w-full rounded-xl object-cover shadow-inner bg-black"
      onEnded={onClose}
    />
  </div>
);
