"use client";

import { useState, useRef, useEffect } from "react";
import {
  TopArch,
  BrightLantern3D,
  MosqueFooter,
  Moon3DLight,
  StarSparkle,
} from "@/components/Decorations";
import {
  RewardPopup,
  ZakirNaikWarningPopup,
  NewMessageVideoPopup,
} from "@/components/Popups";

export default function Home() {
  const [forgivenState, setForgivenState] = useState<number>(0);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);

  const [noButtonPos, setNoButtonPos] = useState({ x: -1, y: -1 });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [openingState, setOpeningState] = useState(0);
  const [showMainUI, setShowMainUI] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const zakirVideoRef = useRef<HTMLVideoElement>(null);
  const rewardVideoRef = useRef<HTMLVideoElement>(null);
  const zakirTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rewardTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [showZakirPopup, setShowZakirPopup] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current
          .play()
          .catch((e) => console.log("Browser blocked autoplay", e));
      }
    }, 2500);

    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused && !isMuted) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("scroll", unlockAudio);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        if (audioRef.current && !isMuted) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener("click", unlockAudio, { once: true });
    document.addEventListener("touchstart", unlockAudio, { once: true });
    document.addEventListener("scroll", unlockAudio, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("scroll", unlockAudio);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMuted]);

  const handleOpen = () => {
    if (openingState > 0) return;

    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .catch((e) => console.log("Audio autoplay restricted", e));
    }

    setOpeningState(1);

    setTimeout(() => {
      setShowMainUI(true);
    }, 800);

    setTimeout(() => {
      setOpeningState(2);
    }, 1800);
  };

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    setShowZakirPopup(true);
    if (zakirVideoRef.current) {
      if (zakirVideoRef.current.currentTime < 24)
        zakirVideoRef.current.currentTime = 24;
      zakirVideoRef.current.play().catch(() => {});
    }

    if (zakirTimeoutRef.current) clearTimeout(zakirTimeoutRef.current);
    zakirTimeoutRef.current = setTimeout(() => {
      setShowZakirPopup(false);
      if (zakirVideoRef.current) zakirVideoRef.current.pause();
    }, 6000);

    if (!noButtonRef.current) return;

    const btnRect = noButtonRef.current.getBoundingClientRect();
    const paddingX = 30; // 30px from left/right edges
    const paddingY = 80; // 80px from top/bottom to avoid footer/header
    const footerSafeHeight = 250;

    const maxW = typeof window !== "undefined" ? window.innerWidth : 400;
    const maxH = typeof window !== "undefined" ? window.innerHeight : 800;
    const safeMaxH = maxH - footerSafeHeight;

    const safeW = maxW - btnRect.width - paddingX;
    const safeH = safeMaxH - btnRect.height - paddingY;

    const isFirstClick = noButtonPos.x === -1;
    let currentX = isFirstClick ? btnRect.left : noButtonPos.x;
    let currentY = isFirstClick ? btnRect.top : noButtonPos.y;

    let newX = currentX;
    let newY = currentY;
    let attempts = 0;
    let found = false;

    while (!found && attempts < 50) {
      const angle = isFirstClick
        ? Math.PI + (Math.random() - 0.5) * Math.PI
        : Math.random() * Math.PI * 2;

      const jumpDistance = 40 + Math.random() * 50; // Reduce maximum jump size

      const candidateX = currentX + Math.cos(angle) * jumpDistance;
      const candidateY = currentY + Math.sin(angle) * jumpDistance;

      if (
        candidateX >= paddingX &&
        candidateX <= safeW &&
        candidateY >= paddingY &&
        candidateY <= safeH
      ) {
        newX = candidateX;
        newY = candidateY;
        found = true;
      }
      attempts++;
    }

    if (!found) {
      newX = Math.max(paddingX, Math.min(newX, safeW));
      newY = Math.max(paddingY, Math.min(newY, safeH));
      if (Math.abs(newX - currentX) < 40) {
        newX = currentX > maxW / 2 ? paddingX + 20 : safeW - 20;
      }
    }

    setNoButtonPos({ x: newX, y: newY });
  };

  const handleYesClick1 = () => {
    setShowZakirPopup(false);
    if (zakirVideoRef.current) zakirVideoRef.current.pause();
    if (zakirTimeoutRef.current) clearTimeout(zakirTimeoutRef.current);

    setIsLeaving(true);
    setTimeout(() => {
      setForgivenState(1);
      setNoButtonPos({ x: -1, y: -1 });
      setIsLeaving(false);
      setShowVideoPopup(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .catch((e) => console.log("Video play failed", e));
      }
    }, 400);
  };

  const handleYesClick2 = () => {
    setIsLeaving(true);
    setShowVideoPopup(false);
    setShowZakirPopup(false);

    if (zakirTimeoutRef.current) clearTimeout(zakirTimeoutRef.current);
    if (zakirVideoRef.current) zakirVideoRef.current.pause();

    setTimeout(() => {
      setForgivenState(2);
      setNoButtonPos({ x: -1, y: -1 });
      setIsLeaving(false);

      setShowRewardPopup(true);
      if (rewardVideoRef.current) {
        rewardVideoRef.current.currentTime = 0;
        rewardVideoRef.current.play().catch(() => {});
      }

      if (rewardTimeoutRef.current) clearTimeout(rewardTimeoutRef.current);
      rewardTimeoutRef.current = setTimeout(() => {
        setShowRewardPopup(false);
        if (rewardVideoRef.current) rewardVideoRef.current.pause();
      }, 23500);
    }, 400);
  };

  if (!mounted) return null;

  if (isLoading) {
    return (
      <main className="h-dvh bg-bg-light flex flex-col items-center justify-center relative overflow-hidden text-brand-primary">
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <TopArch className="w-full h-40" />
        </div>
        <div className="flex flex-col items-center z-10 animate-fade-in-up">
          <div className="w-20 h-20 mb-8 relative animate-[spin_3s_linear_infinite]">
            <div className="absolute inset-0 border-4 border-brand-gold rotate-45 rounded-sm"></div>
            <div className="absolute inset-0 border-4 border-brand-secondary rounded-sm"></div>
            <div className="absolute inset-x-2 inset-y-2 bg-brand-primary rotate-45 rounded-sm animate-pulse-glow flex items-center justify-center">
              <div className="w-4 h-4 bg-bg-light rounded-full animate-ping"></div>
            </div>
          </div>
          <h2 className="font-serif font-bold tracking-widest text-brand-primary drop-shadow-md lg:text-lg animate-pulse mb-4">
            Menyiapkan Kartu Ucapan...
          </h2>
          <div className="w-48 h-1.5 bg-brand-primary/10 rounded-full overflow-hidden ring-1 ring-brand-primary/20">
            <div className="h-full bg-brand-gold rounded-full animate-loader-bar"></div>
          </div>
        </div>

        <div className="absolute bottom-8 md:bottom-12 w-full text-center z-10 opacity-80">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-brand-secondary uppercase">
            Developed By{" "}
            <span className="text-brand-gold drop-shadow-sm">nabss</span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-dvh bg-bg-light flex flex-col items-center justify-center relative overflow-hidden text-brand-primary">
      <audio ref={audioRef} src="/Backsound Idul Fitri.mp3" loop />

      {/* Notifications Popups Extract */}
      <RewardPopup
        show={showRewardPopup}
        onClose={() => {
          setShowRewardPopup(false);
          if (rewardVideoRef.current) rewardVideoRef.current.pause();
        }}
        openingState={openingState}
        videoRef={rewardVideoRef}
      />

      <ZakirNaikWarningPopup
        show={showZakirPopup}
        onClose={() => setShowZakirPopup(false)}
        openingState={openingState}
        videoRef={zakirVideoRef}
      />

      <NewMessageVideoPopup
        show={showVideoPopup}
        onClose={() => {
          setShowVideoPopup(false);
          if (videoRef.current) videoRef.current.pause();
        }}
        openingState={openingState}
        videoRef={videoRef}
      />

      {openingState < 2 && (
        <div
          className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg-light transition-all duration-1200 ease-in-out ${showMainUI ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"}`}
        >
          <div className="absolute inset-0 pointer-events-none z-0">
            <TopArch className="w-full h-32 md:h-48 absolute top-0" />
            <MosqueFooter className="absolute bottom-0 w-full h-24 md:h-36" />
          </div>
          <div className="flex flex-col items-center z-10 w-full">
            <div
              onClick={handleOpen}
              className="relative w-[300px] md:w-[400px] h-[220px] md:h-[280px] mx-auto z-10 perspective-[1000px] filter drop-shadow-2xl cursor-pointer animate-float"
            >
              <div className="absolute inset-0 bg-brand-secondary rounded-xl shadow-inner border border-brand-primary/20 pointer-events-none"></div>
              <div
                className={`absolute bottom-0 left-[5%] w-[90%] h-[95%] bg-bg-light rounded-t-xl z-20 flex flex-col items-center p-4 md:p-6 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none ${openingState === 1 ? "-translate-y-[55%] md:-translate-y-[65%] z-50" : "translate-y-0 delay-300"}`}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-5 relative">
                  <img
                    src="/ALIP.jpg"
                    alt="Nabila"
                    className="w-full h-full object-cover rounded-full border-2 border-brand-gold shadow-md"
                  />
                </div>
                <h1 className="font-serif text-xl md:text-2xl font-bold mb-1 text-brand-primary">
                  Idul Fitri 1447 H
                </h1>
                <p className="text-[10px] md:text-xs font-bold text-brand-secondary tracking-widest uppercase text-center px-4">
                  Nabila
                </p>
              </div>
              <div
                className="absolute inset-0 bg-[#A67C52] rounded-xl z-30 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] pointer-events-none"
                style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
              ></div>
              <div
                className="absolute inset-0 bg-[#A67C52] rounded-xl z-30 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] pointer-events-none"
                style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }}
              ></div>
              <div
                className="absolute inset-0 bg-brand-gold rounded-xl z-30 shadow-[0_-5px_10px_rgba(0,0,0,0.15)] pointer-events-none"
                style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
              ></div>
              <div
                className={`absolute top-0 left-0 w-full h-full bg-[#D4A950] rounded-xl z-40 origin-top shadow-[0_5px_10px_rgba(0,0,0,0.2)] transition-transform duration-800 ease-in-out pointer-events-none`}
                style={{
                  clipPath: "polygon(0 0, 50% 50%, 100% 0)",
                  transform:
                    openingState === 1 ? "rotateX(180deg)" : "rotateX(0deg)",
                }}
              ></div>
            </div>
            <div
              className={`mt-10 md:mt-14 transition-all duration-700 flex flex-col items-center ${openingState > 0 ? "opacity-0 translate-y-10 scale-90 pointer-events-none" : "opacity-100 translate-y-0 scale-100"}`}
            >
              <button
                onClick={handleOpen}
                className="bg-brand-primary hover:bg-[#4A2E1A] text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-bold shadow-[0_8px_20px_rgba(92,58,33,0.4)] transform hover:scale-105 active:scale-95 transition-all text-sm md:text-base z-50 flex items-center justify-center gap-3"
              >
                <svg
                  className="w-5 h-5 animate-bounce"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                Buka Kartu Ucapan
              </button>
              <p className="text-center text-brand-secondary text-xs mt-4 font-semibold animate-pulse uppercase tracking-widest">
                Tekan Amplop Atau Tombol Undangan
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MAIN APP */}
      <div
        className={`absolute inset-0 z-0 flex flex-col items-center justify-center transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)] ${showMainUI ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
      >
        <div className="absolute top-0 w-full z-0 pointer-events-none">
          <TopArch className="w-full h-32 md:h-56" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Top Section */}
          <div className="absolute top-[3%] left-[5%] animate-float">
            <StarSparkle
              className="w-6 h-6 animate-sparkle"
              style={{ animationDelay: "0.1s" }}
            />
          </div>
          <div className="absolute top-[8%] left-[25%] animate-float-delayed">
            <StarSparkle
              className="w-4 h-4 animate-sparkle"
              style={{ animationDelay: "1.2s" }}
            />
          </div>
          <div className="absolute top-[5%] left-[45%] animate-float">
            <StarSparkle
              className="w-7 h-7 animate-sparkle"
              style={{ animationDelay: "2.5s" }}
            />
          </div>
          <div className="absolute top-[12%] right-[32%] animate-float-delayed">
            <StarSparkle
              className="w-5 h-5 animate-sparkle"
              style={{ animationDelay: "0.7s" }}
            />
          </div>
          <div className="absolute top-[7%] right-[15%] animate-float">
            <StarSparkle
              className="w-8 h-8 animate-sparkle"
              style={{ animationDelay: "1.9s" }}
            />
          </div>
          <div className="absolute top-[18%] right-[5%] animate-float-delayed">
            <StarSparkle
              className="w-4 h-4 animate-sparkle"
              style={{ animationDelay: "0.4s" }}
            />
          </div>

          {/* Top-Mid Section */}
          <div className="absolute top-[18%] left-[12%] animate-float">
            <StarSparkle
              className="w-7 h-7 animate-sparkle"
              style={{ animationDelay: "2.1s" }}
            />
          </div>
          <div className="absolute top-[22%] left-[38%] animate-float-delayed">
            <StarSparkle
              className="w-5 h-5 animate-sparkle"
              style={{ animationDelay: "1.8s" }}
            />
          </div>
          <div className="absolute top-[25%] right-[22%] animate-float">
            <StarSparkle
              className="w-6 h-6 animate-sparkle"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
          <div className="absolute top-[28%] right-[8%] animate-float-delayed">
            <StarSparkle
              className="w-9 h-9 animate-sparkle"
              style={{ animationDelay: "1.6s" }}
            />
          </div>

          {/* Mid Section */}
          <div className="absolute top-[35%] left-[6%] animate-float">
            <StarSparkle
              className="w-5 h-5 animate-sparkle"
              style={{ animationDelay: "0.9s" }}
            />
          </div>
          <div className="absolute top-[42%] left-[28%] animate-float-delayed">
            <StarSparkle
              className="w-8 h-8 animate-sparkle"
              style={{ animationDelay: "2.2s" }}
            />
          </div>
          <div className="absolute top-[38%] left-[55%] animate-float">
            <StarSparkle
              className="w-4 h-4 animate-sparkle"
              style={{ animationDelay: "1.4s" }}
            />
          </div>
          <div className="absolute top-[45%] right-[30%] animate-float-delayed">
            <StarSparkle
              className="w-7 h-7 animate-sparkle"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <div className="absolute top-[42%] right-[10%] animate-float">
            <StarSparkle
              className="w-6 h-6 animate-sparkle"
              style={{ animationDelay: "2.7s" }}
            />
          </div>
          <div className="absolute top-[52%] right-[4%] animate-float-delayed">
            <StarSparkle
              className="w-5 h-5 animate-sparkle"
              style={{ animationDelay: "1.1s" }}
            />
          </div>

          {/* Lower-Mid Section */}
          <div className="absolute top-[55%] left-[15%] animate-float">
            <StarSparkle
              className="w-4 h-4 animate-sparkle"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <div className="absolute top-[62%] left-[35%] animate-float-delayed">
            <StarSparkle
              className="w-9 h-9 animate-sparkle"
              style={{ animationDelay: "2.9s" }}
            />
          </div>
          <div className="absolute top-[58%] right-[45%] animate-float">
            <StarSparkle
              className="w-6 h-6 animate-sparkle"
              style={{ animationDelay: "1.3s" }}
            />
          </div>
          <div className="absolute top-[65%] right-[18%] animate-float-delayed">
            <StarSparkle
              className="w-5 h-5 animate-sparkle"
              style={{ animationDelay: "0.8s" }}
            />
          </div>
          <div className="absolute top-[60%] right-[2%] animate-float">
            <StarSparkle
              className="w-7 h-7 animate-sparkle"
              style={{ animationDelay: "2.4s" }}
            />
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-[28%] left-[8%] animate-float">
            <StarSparkle
              className="w-8 h-8 animate-sparkle"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
          <div className="absolute bottom-[20%] left-[22%] animate-float-delayed">
            <StarSparkle
              className="w-5 h-5 animate-sparkle"
              style={{ animationDelay: "0.6s" }}
            />
          </div>
          <div className="absolute bottom-[25%] left-[50%] animate-float">
            <StarSparkle
              className="w-4 h-4 animate-sparkle"
              style={{ animationDelay: "2.6s" }}
            />
          </div>
          <div className="absolute bottom-[18%] right-[35%] animate-float-delayed">
            <StarSparkle
              className="w-7 h-7 animate-sparkle"
              style={{ animationDelay: "1.9s" }}
            />
          </div>
          <div className="absolute bottom-[24%] right-[15%] animate-float">
            <StarSparkle
              className="w-6 h-6 animate-sparkle"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <div className="absolute bottom-[12%] right-[8%] animate-float-delayed">
            <StarSparkle
              className="w-5 h-5 animate-sparkle"
              style={{ animationDelay: "1.7s" }}
            />
          </div>
          <div className="absolute bottom-[15%] left-[38%] animate-float">
            <StarSparkle
              className="w-9 h-9 animate-sparkle"
              style={{ animationDelay: "2.3s" }}
            />
          </div>
        </div>

        <div
          className="absolute top-16 right-[8%] md:right-[15%] w-16 h-16 md:w-20 md:h-20 opacity-90 animate-swing z-0 pointer-events-none"
          style={{ animationDelay: "2s" }}
        >
          <Moon3DLight className="w-full h-full" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-20 left-[5%] animate-swing"
            style={{ animationDelay: "0.2s", animationDuration: "5.5s" }}
          >
            <BrightLantern3D className="w-8 md:w-10" />
          </div>
          <div
            className="absolute top-12 left-[18%] animate-swing"
            style={{ animationDelay: "1.5s", animationDuration: "6s" }}
          >
            <BrightLantern3D className="w-10 md:w-14" />
          </div>
          <div
            className="absolute top-28 left-[32%] animate-swing"
            style={{ animationDelay: "0.8s", animationDuration: "4.8s" }}
          >
            <BrightLantern3D className="w-6 md:w-10" />
          </div>
          <div
            className="absolute top-18 left-[45%] animate-swing"
            style={{ animationDelay: "2.2s", animationDuration: "6.5s" }}
          >
            <BrightLantern3D className="w-12 md:w-16" />
          </div>
          <div
            className="absolute top-20 left-[60%] animate-swing"
            style={{ animationDelay: "0.6s", animationDuration: "5.2s" }}
          >
            <BrightLantern3D className="w-8 md:w-12" />
          </div>
          <div
            className="absolute top-32 right-[25%] animate-swing"
            style={{ animationDelay: "1.1s", animationDuration: "5.8s" }}
          >
            <BrightLantern3D className="w-7 md:w-10" />
          </div>
          <div
            className="absolute top-16 right-[10%] animate-swing"
            style={{ animationDelay: "1.9s", animationDuration: "6.2s" }}
          >
            <BrightLantern3D className="w-9 md:w-14" />
          </div>
          <div
            className="absolute top-24 right-[2%] animate-swing"
            style={{ animationDelay: "0.3s", animationDuration: "4.5s" }}
          >
            <BrightLantern3D className="w-6 md:w-9" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full z-10 px-4 mb-24 md:mb-16 mt-20 md:mt-28 pointer-events-none">
          {forgivenState === 0 ? (
            // STATE 0: INITIAL CARD
            <div
              className={`glass-card p-5 md:p-8 rounded-3xl flex flex-col items-center text-center max-w-xl w-full border-t-[3px] border-t-brand-primary relative shadow-2xl pointer-events-auto bg-white/40 backdrop-blur-lg ${isLeaving ? "animate-pop-out" : "animate-pop-up"}`}
            >
              <div className="mb-1 hover:scale-110 transition-transform cursor-default">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 mx-auto text-brand-gold drop-shadow-md animate-pulse-glow"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              </div>
              <h1 className="font-serif text-brand-primary text-lg md:text-2xl font-semibold tracking-widest mb-0.5 uppercase drop-shadow-sm leading-none">
                Selamat Hari Raya
              </h1>
              <h1 className="font-serif text-brand-primary text-4xl md:text-5xl font-bold mb-2 uppercase drop-shadow-lg text-brown-gradient animate-pulse-glow leading-tight">
                Idul Fitri
              </h1>
              <h2 className="font-serif text-brand-gold text-sm md:text-lg font-bold tracking-widest mb-3 md:mb-4 uppercase drop-shadow-md">
                Minal Aidin wal Faizin
              </h2>

              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mb-2.5 md:mb-3 mx-auto z-10 hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-brand-gold rounded-full blur-md opacity-40 animate-pulse-glow z-0"></div>
                <img
                  src="/ALIP.jpg"
                  alt="Nabila"
                  className="relative w-full h-full object-cover object-top rounded-full border-[3px] border-brand-primary ring-2 ring-brand-gold shadow-lg z-10 bg-white"
                />
              </div>

              <h3 className="font-serif text-sm sm:text-base md:text-lg font-extrabold text-brand-primary mb-3.5 tracking-widest uppercase drop-shadow-sm text-center px-4">
                NABILA
              </h3>

              <div className="bg-brand-primary text-white px-5 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 shadow-xl border border-brand-gold transform -skew-x-12 hover:-translate-y-1 transition-all">
                <p className="font-bold tracking-widest text-xs md:text-sm skew-x-12 shadow-sm">
                  1 SYAWAL 1447 H
                </p>
              </div>

              <p className="text-[11px] md:text-sm text-brand-primary max-w-xs md:max-w-md mx-auto leading-relaxed font-semibold italic mb-5 px-3 border-l-2 border-r-2 border-brand-gold/40 bg-brand-primary/5 py-2 md:py-3 rounded-xl">
                "Semoga Allah SWT senantiasa menerangkan hati,
                <br />
                menerima amal ibadah kita, dan menjadikan kita
                <br />
                kembali suci. Mohon maaf lahir batin."
              </p>

              <div className="border-t border-brand-primary/10 pt-4 md:pt-6 w-full relative">
                <div className="flex flex-row gap-4 sm:gap-6 items-center justify-center w-full min-h-[50px] md:min-h-[60px]">
                  <button
                    onClick={handleYesClick1}
                    disabled={isLeaving}
                    className="bg-brand-primary hover:bg-[#4A2E1A] text-white font-bold text-sm md:text-base py-3 px-6 md:px-8 rounded-full z-20 w-fit min-w-[120px] md:min-w-[140px] shadow-[0_6px_0_#3A1E0D,0_10px_20px_rgba(92,58,33,0.4)] active:translate-y-2 active:shadow-[0_0px_0_#3A1E0D,0_5px_10px_rgba(92,58,33,0.4)] transition-all"
                  >
                    Maafkan
                  </button>
                  <button
                    ref={noButtonRef}
                    onClick={handleNoClick}
                    disabled={isLeaving}
                    style={{
                      position: noButtonPos.x === -1 ? "relative" : "fixed",
                      left:
                        noButtonPos.x !== -1 ? `${noButtonPos.x}px` : "auto",
                      top: noButtonPos.y !== -1 ? `${noButtonPos.y}px` : "auto",
                    }}
                    className="bg-[#A54A32] hover:bg-[#8A3D28] text-white font-bold text-sm md:text-base py-3 px-6 md:px-8 rounded-full z-50 w-[120px] md:w-[140px] shadow-[0_6px_0_#6A2616,0_10px_20px_rgba(165,74,50,0.4)] active:translate-y-2 active:shadow-[0_0px_0_#6A2616,0_5px_10px_rgba(165,74,50,0.4)] transition-all"
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          ) : forgivenState === 1 ? (
            // STATE 1: CONFIRMATION CARD "BENERAN DIMAFFIN?"
            <div
              className={`glass-card p-6 md:p-10 rounded-3xl flex flex-col items-center text-center max-w-sm w-full border-t-[3px] border-t-brand-gold relative shadow-2xl pointer-events-auto bg-white/40 backdrop-blur-lg ${isLeaving ? "animate-pop-out" : "animate-pop-up"}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-4 animate-bounce">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-full h-full text-[#A54A32]"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 15h8"></path>
                  <circle cx="9" cy="9" r="1"></circle>
                  <circle cx="15" cy="9" r="1"></circle>
                </svg>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold mb-2 text-brand-primary drop-shadow-md">
                Beneran Dimaafin?
              </h2>
              <p className="text-sm md:text-base text-brand-secondary mb-8 font-semibold">
                Tadi kan udah mencet maafkan, beneran ikhlas nggak nih?
              </p>

              <div className="flex flex-col gap-4 items-center justify-center w-full relative">
                <button
                  onClick={handleYesClick2}
                  disabled={isLeaving}
                  className="bg-brand-gold hover:bg-brand-secondary text-white font-bold text-sm md:text-base py-3 px-8 rounded-full z-20 w-fit min-w-[160px] shadow-[0_6px_0_#5C3A21,0_10px_20px_rgba(92,58,33,0.4)] active:translate-y-2 active:shadow-[0_0px_0_#5C3A21,0_5px_10px_rgba(92,58,33,0.4)] transition-all"
                >
                  Ya, Ikhlas!
                </button>
                <button
                  ref={noButtonRef}
                  onClick={handleNoClick}
                  disabled={isLeaving}
                  style={{
                    position: noButtonPos.x === -1 ? "relative" : "fixed",
                    left: noButtonPos.x !== -1 ? `${noButtonPos.x}px` : "auto",
                    top: noButtonPos.y !== -1 ? `${noButtonPos.y}px` : "auto",
                  }}
                  className="bg-brand-primary hover:bg-[#3A1E0D] text-white font-bold text-sm md:text-base py-3 px-8 rounded-full z-50 w-fit min-w-[160px] shadow-[0_6px_0_#2b1509] active:translate-y-2 active:shadow-[0_0px_0_#2b1509] transition-all relative"
                >
                  Cuma Klik Doang
                </button>
              </div>
            </div>
          ) : (
            // STATE 2: ALHAMDULILLAH SUCCESS
            <div
              className={`glass-card p-8 md:p-14 rounded-4xl flex flex-col items-center text-center max-w-xl w-full border-t-4 border-t-brand-gold relative overflow-hidden shadow-2xl pointer-events-auto bg-white/40 ${isLeaving ? "animate-pop-out" : "animate-pop-up"}`}
            >
              <div className="w-20 h-20 md:w-28 md:h-28 mb-4 md:mb-6 mx-auto relative cursor-default transition-transform duration-700 hover:scale-110">
                <svg
                  className="w-full h-full text-brand-gold drop-shadow-2xl animate-pulse-glow"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-extrabold mb-3 md:mb-4 text-brand-primary drop-shadow-lg pb-1">
                Alhamdulillah!
              </h2>
              <p className="text-sm md:text-lg text-brand-primary mb-8 md:mb-10 leading-relaxed font-bold bg-bg-light/60 p-4 rounded-xl ring-1 ring-brand-primary/20 w-full drop-shadow-sm">
                Terima kasih banget ya!
                <br />
                Semoga kita senantiasa diberkahi.
              </p>

              <button
                onClick={() => {
                  setIsLeaving(true);
                  setShowRewardPopup(false);
                  if (rewardVideoRef.current) rewardVideoRef.current.pause();
                  if (rewardTimeoutRef.current)
                    clearTimeout(rewardTimeoutRef.current);

                  setTimeout(() => {
                    setForgivenState(0);
                    setNoButtonPos({ x: -1, y: -1 });
                    setIsLeaving(false);
                  }, 400);
                }}
                disabled={isLeaving}
                className="mt-2 px-8 py-2 md:py-3 border-2 md:border-4 border-brand-primary rounded-full text-brand-primary font-bold text-sm md:text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-xl pointer-events-auto"
              >
                Kembali
              </button>
            </div>
          )}
        </div>

        <div className="w-full absolute bottom-0 left-0 z-0 pointer-events-none">
          <MosqueFooter className="w-full h-24 md:h-36 translate-y-1 block" />
        </div>
      </div>

      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-100 bg-brand-primary text-brand-gold p-3 rounded-full shadow-[0_8px_20px_rgba(92,58,33,0.5)] border-2 border-brand-gold hover:scale-110 active:scale-95 transition-all outline-none"
        aria-label="Toggle Mute"
      >
        {isMuted ? (
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </main>
  );
}
