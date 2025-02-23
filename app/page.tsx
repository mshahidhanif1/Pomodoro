"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LuTimerReset } from "react-icons/lu";
import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";

// Import Lottie dynamically to prevent SSR errors
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => mod.Player), { ssr: false });

// Import animation JSON safely
import verifyAnimation from "../public/Animation - 1740303202047.json";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);
  const [isClient, setIsClient] = useState(false); // Check if component is mounted

  useEffect(() => {
    setIsClient(true); // Prevent hydration mismatch

    if (!isRunning) return;

    const intervalPom = setInterval(() => {
      setTimeSec(prevSec => {
        if (prevSec > 0) return prevSec - 1;
        if (timeMin > 0) {
          setTimeMin(prevMin => prevMin - 1);
          return 59;
        }
        setIsRunning(false);
        clearInterval(intervalPom);
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalPom);
  }, [isRunning, timeMin]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeMin(25);
    setTimeSec(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="flex items-center justify-center space-x-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg -mt-10">
        {/* Prevent hydration error by rendering Player only on client */}
        {isClient && (
          <Player autoplay loop src={verifyAnimation} className="w-[120px] h-[120px]" />
        )}
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg hover:scale-105 transition-transform">Pomodoro Timer</h1>
      </div>

      <div className="relative flex items-center justify-center w-80 h-80 rounded-full bg-white/10 shadow-xl backdrop-blur-md border border-white/20 mt-5">
        <h2 className="text-6xl font-semibold">
          {String(timeMin).padStart(2, "0")}:{String(timeSec).padStart(2, "0")}
        </h2>
      </div>

      <div className="flex space-x-6 mt-10">
        <button onClick={startTimer} className="flex items-center px-6 py-3 text-lg font-medium bg-green-500 hover:bg-green-600 rounded-full shadow-md hover:scale-110 transition-transform">
          <VscDebugStart className="mr-2 text-xl" /> Start
        </button>

        <button onClick={stopTimer} className="flex items-center px-6 py-3 text-lg font-medium bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-md hover:scale-110 transition-transform">
          <CiPause1 className="mr-2 text-xl" /> Pause
        </button>

        <button onClick={resetTimer} className="flex items-center px-6 py-3 text-lg font-medium bg-red-500 hover:bg-red-600 rounded-full shadow-md hover:scale-110 transition-transform">
          <LuTimerReset className="mr-2 text-xl" /> Reset
        </button>
      </div>
    </div>
  );
}
