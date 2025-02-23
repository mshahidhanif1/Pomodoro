"use client";
import React, { useState, useEffect } from "react";
import verify from "../public/Animation - 1740303202047.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { LuTimerReset } from "react-icons/lu";
import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const intervalPom = setInterval(() => {
        if (timeSec > 0) {
          setTimeSec((prevSec) => prevSec - 1);
        } else if (timeMin > 0 && timeSec === 0) {
          setTimeMin((prevMin) => prevMin - 1);
          setTimeSec(59);
        } else if (timeMin === 0 && timeSec === 0) {
          setIsRunning(false);
          clearInterval(intervalPom);
        }
      }, 1000);

      return () => clearInterval(intervalPom);
    }
  }, [isRunning, timeMin, timeSec]);

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
        <Player
          autoplay
          loop
          src={verify}
          className="w-[120px] h-[120px]"
          style={{ background: "none" }}
        />
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg transition-transform transform hover:scale-105">Pomodoro Timer</h1>
      </div>

      <div className="relative flex items-center justify-center w-80 h-80 rounded-full bg-white/10 shadow-xl backdrop-blur-md border border-white/20 mt-5">
        <h2 className="text-6xl font-semibold">
          {String(timeMin).padStart(2, "0")}:{String(timeSec).padStart(2, "0")}
        </h2>

      </div>

      <div className="flex space-x-6 mt-10">
        <button
          onClick={startTimer}
          className="flex items-center px-6 py-3 text-lg font-medium bg-purple-400 hover:bg-green-600 rounded-full shadow-md transition-transform transform hover:scale-110"
        >
          <VscDebugStart className="mr-2 text-xl" /> Start
        </button>

        <button
          onClick={stopTimer}
          className="flex items-center px-6 py-3 text-lg font-medium bg-purple-400 hover:bg-yellow-600 rounded-full shadow-md transition-transform transform hover:scale-110"
        >
          <CiPause1 className="mr-2 text-xl" /> Pause
        </button>

        <button
          onClick={resetTimer}
          className="flex items-center px-6 py-3 text-lg font-medium bg-purple-400 hover:bg-red-600 rounded-full shadow-md transition-transform transform hover:scale-110"
        >
          <LuTimerReset className="mr-2 text-xl" /> Reset
        </button>
      </div>
    </div>
  );
}