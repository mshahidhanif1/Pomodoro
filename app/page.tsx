"use client";
import React, { useState, useEffect } from "react";
import verify from "../public/Animation - 1740303202047.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { LuTimerReset } from "react-icons/lu";
import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [time, setTime] = useState(25 * 60); // Store time in seconds
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          handleSessionEnd();
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSessionEnd = () => {
    if (!isBreak) {
      if (sessionCount < 3) {
        setIsBreak(true);
        setTime(5 * 60);
      } else {
        setSessionCount(4); // Mark as complete
        setIsRunning(false);
      }
    } else {
      setIsBreak(false);
      setSessionCount((prev) => prev + 1);
      setTime(25 * 60);
    }
  };

  const startTimer = () => {
    if (sessionCount < 4) setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTime(25 * 60);
    setSessionCount(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="flex items-center justify-center space-x-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg -mt-10">
        <Player autoplay loop src={verify} className="w-[120px] h-[120px]" style={{ background: "none" }} />
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg transition-transform transform hover:scale-105">
          Pomodoro Timer
        </h1>
      </div>

      <div className="relative flex items-center justify-center w-80 h-80 rounded-full bg-white/10 shadow-xl backdrop-blur-md border border-white/20 mt-5">
        <h2 className="text-6xl font-semibold">{formatTime(time)}</h2>
      </div>

      <p className="text-xl mt-4">
        {sessionCount < 4
          ? isBreak
            ? `Break Time! (Break ${sessionCount + 1}/4) 😌`
            : `Focus Time! Session ${sessionCount + 1}/4 🚀`
          : "All Sessions Completed! 🎉"}
      </p>

      <div className="flex space-x-6 mt-10">
        {!isRunning && sessionCount < 4 && (
          <button onClick={startTimer} className="flex items-center px-6 py-3 text-lg font-medium bg-green-500 hover:bg-green-600 rounded-full shadow-md hover:scale-110 transition-transform">
            <VscDebugStart className="mr-2 text-xl" /> Start
          </button>
        )}
        {isRunning && (
          <button onClick={stopTimer} className="flex items-center px-6 py-3 text-lg font-medium bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-md hover:scale-110 transition-transform">
            <CiPause1 className="mr-2 text-xl" /> Pause
          </button>
        )}
        <button onClick={resetTimer} className="flex items-center px-6 py-3 text-lg font-medium bg-red-500 hover:bg-red-600 rounded-full shadow-md hover:scale-110 transition-transform">
          <LuTimerReset className="mr-2 text-xl" /> Reset
        </button>
      </div>
    </div>
  );
}
