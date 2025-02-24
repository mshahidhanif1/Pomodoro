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
  const [workMin, setWorkMin] = useState(25);
  const [workSec, setWorkSec] = useState(0);
  const [breakMin, setBreakMin] = useState(5);
  const [breakSec, setBreakSec] = useState(0);
  const [sessionCount, setSessionCount] = useState(0); 

  useEffect(() => {
    if (!isRunning || isBreak) return;
    const intervalPom = setInterval(() => {
      setWorkSec((prevSec) => {
        if (prevSec === 0) {
          if (workMin === 0) {
            clearInterval(intervalPom);
            startBreak();
            return 0;
          } else {
            setWorkMin((prevMin) => prevMin - 1);
            return 59;
          }
        }
        return prevSec - 1;
      });
    }, 1000);

    return () => clearInterval(intervalPom);
  }, [isRunning, isBreak, workMin]);

  useEffect(() => {
    if (!isRunning || !isBreak) return;
    let breakInterval = setInterval(() => {
      setBreakSec((prevSec) => {
        if (prevSec === 0) {
          if (breakMin === 0) {
            clearInterval(breakInterval);
            endBreak();
            return 0;
          } else {
            setBreakMin((prevMin) => prevMin - 1);
            return 59;
          }
        }
        return prevSec - 1;
      });
    }, 1000);

    return () => clearInterval(breakInterval);
  }, [isRunning, isBreak, breakMin]);

  const startTimer = () => {
    if (sessionCount < 4) setIsRunning(true);
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setWorkMin(25);
    setWorkSec(0);
    setBreakMin(5);
    setBreakSec(0);
    setSessionCount(0);
  };

  const startBreak = () => {
    setIsBreak(true);
    setBreakMin(5);
    setBreakSec(0);
  };

  const endBreak = () => {
    setIsBreak(false);
    setSessionCount((prevCount) => prevCount + 1);

    if (sessionCount + 1 < 4) {
      setWorkMin(25);
      setWorkSec(0);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="flex items-center justify-center space-x-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg -mt-10">
        <Player autoplay loop src={verify} className="w-[120px] h-[120px]" />
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg hover:scale-105 transition-transform">
          Pomodoro Timer
        </h1>
      </div>

      <div className="relative flex items-center justify-center w-80 h-80 rounded-full bg-white/10 shadow-xl backdrop-blur-md border border-white/20 mt-5">
        <h2 className="text-6xl font-semibold">
          {isBreak
            ? `${String(breakMin).padStart(2, "0")}:${String(breakSec).padStart(2, "0")}`
            : `${String(workMin).padStart(2, "0")}:${String(workSec).padStart(2, "0")}`}
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
