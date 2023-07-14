/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, seTtimeLeft] = useState(1500);
  const [timingType, setTimingtype] = useState("SESSION");
  const [play, setPlay] = useState(false);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      seTtimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      seTtimeLeft(timeLeft - 60);
    }
  };

  const tick = () => {
    if (play) {
      seTtimeLeft(timeLeft - 1);
    }
  };

  let timerRef = useRef();

  const handleReset = () => {
    clearInterval(timerRef);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      seTtimeLeft(breakLength * 60);
      setTimingtype("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      seTtimeLeft(sessionLength * 60);
      setTimingtype("SESSION");
      audio.play();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(tick, 1000);
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [tick, resetTimer]);

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <main>
      <h2>25 + 5 Clock</h2>
      <div className="settings">
        <div className="break-session-length">
          <h3 id="break-label">Break Length</h3>

          <div className="controls-container">
            <button
              className="btn"
              disabled={play}
              onClick={handleBreakIncrease}
              id="break-increment"
              value="+"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <strong id="break-length">{breakLength}</strong>
            <button
              className="btn"
              disabled={play}
              onClick={handleBreakDecrease}
              id="break-decrement"
              value="-"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="session-container">
          <h3 id="session-label">Session Length</h3>
          <div className="controls-container">
            <button
              className="btn"
              disabled={play}
              onClick={handleSessionIncrease}
              id="session-increment"
              value="+"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <strong id="session-length">{sessionLength}</strong>
            <button
              className="btn"
              disabled={play}
              onClick={handleSessionDecrease}
              id="session-decrement"
              value="-"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="timer-wrapper">
        <div className="timer">
          <h2 id="timer-label">{title}</h2>
          <h3   id="time-left">{timeFormatter()}</h3>
        </div>
        <div className="buttons">
        <button className="btn" onClick={handlePlay} id="start_stop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"
            />
          </svg>
        </button>
        <button className="btn" onClick={handleReset} id="reset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
</div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </main>
  );
};
export default App;
