"use client";
import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { LuTimerReset } from "react-icons/lu";
import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";

// Import animation only on the client side
import verifyAnimation from "../public/Animation - 1740303202047.json";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev > 0) return prev - 1;

        clearInterval(interval);
        handleSessionEnd();
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSessionEnd = () => {
    if (!isBreak) {
      if (sessionCount < 3) {
        startBreak();
        setIsRunning(true);
      } else {
        completeAllSessions();
      }
    } else {
      startWorkSession();
      setIsRunning(true);
    }
  };

  const startBreak = () => {
    setIsBreak(true);
    setTotalSeconds(5 * 60);
  };

  const startWorkSession = () => {
    setIsBreak(false);
    setSessionCount((prev) => prev + 1);
    setTotalSeconds(25 * 60);
  };

  const completeAllSessions = () => {
    setSessionCount(4);
    setIsRunning(false);
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
    setTotalSeconds(25 * 60);
    setSessionCount(0);
  };

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="flex items-center justify-center space-x-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg -mt-10">
        {/* Only render Player if verify is defined */}
        <Player autoplay loop src={verifyAnimation} className="w-[120px] h-[120px]" />
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg transition-transform transform hover:scale-105">
          Pomodoro Timer
        </h1>
      </div>

      <div className="relative flex items-center justify-center w-80 h-80 rounded-full bg-white/10 shadow-xl backdrop-blur-md border border-white/20 mt-5">
        <h2 className="text-6xl font-semibold">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </h2>
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
          <button
            onClick={startTimer}
            className="flex items-center px-6 py-3 text-lg font-medium bg-green-500 hover:bg-green-600 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <VscDebugStart className="mr-2 text-xl" /> Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={stopTimer}
            className="flex items-center px-6 py-3 text-lg font-medium bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <CiPause1 className="mr-2 text-xl" /> Pause
          </button>
        )}
        <button
          onClick={resetTimer}
          className="flex items-center px-6 py-3 text-lg font-medium bg-red-500 hover:bg-red-600 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <LuTimerReset className="mr-2 text-xl" /> Reset
        </button>
      </div>
    </div>
  );
}
