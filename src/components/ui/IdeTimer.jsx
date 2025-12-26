import { useEffect, useState } from "react";

const IdeTimer = () => {
  const [timeSpent, setTimeSpent] = useState(
    () => parseInt(localStorage.getItem("timeSpent")) || 0,
  );
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    let timer;

    const startTimer = () => {
      timer = setInterval(() => {
        setTimeSpent((prev) => {
          const newTime = prev + 1000;
          localStorage.setItem("timeSpent", newTime); // save progress
          return newTime;
        });
      }, 1000);
      setOnline(true);
    };

    const stopTimer = () => {
      clearInterval(timer);
      setOnline(false);
    };

    // Start timer if online
    if (navigator.onLine) startTimer();

    // Detect offline/online
    const handleOffline = () => stopTimer();
    const handleOnline = () => startTimer();

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Reset at 12 AM
    const resetInterval = setInterval(() => {
      const now = new Date();
      if (
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0
      ) {
        setTimeSpent(0);
        localStorage.setItem("timeSpent", 0);
      }
    }, 1000);

    return () => {
      stopTimer();
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      clearInterval(resetInterval);
    };
  }, []);

  const formatTime = (ms) => {
    let totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="rounded bg-gray-800 p-4 text-white">
      <div>Status: {online ? "🟢 Online" : "⚫ Offline"}</div>
      <div>Time Spent: {formatTime(timeSpent)}</div>
    </div>
  );
};

export default IdeTimer