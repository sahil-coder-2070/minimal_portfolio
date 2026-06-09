import React, { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState("Loading...");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/coding-time")
      .then(res => res.json())
      .then(data => {
        setTime(data.data.grand_total.text);
        setLanguage(data.data.languages[0]?.name || "");
      })
      .catch(() => setTime("Unable to load data"));
  }, []);

  return (
    <div className="w-[300px] rounded-xl bg-neutral-900 p-5 text-white">
      <h2>📊 Coding Activity</h2>
      <p><strong>Today:</strong> {time}</p>
      <p><strong>Top Language:</strong> {language}</p>
      <p className="text-green-500">🔥 Currently coding</p>
    </div>
  );
};

export default Timer;
