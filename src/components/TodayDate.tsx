"use client";

import { useEffect, useState } from "react";

export default function TodayDate() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const formatted = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    setToday(formatted);
  }, []);

  return (
    <p className="text-sm text-slate-500">{today || " "}</p>
  );
}
