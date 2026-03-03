import { useState, useEffect } from "react";

export function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hrs = String(time.getHours()).padStart(2, "0");
  const min = String(time.getMinutes()).padStart(2, "0");
  const sec = String(time.getSeconds()).padStart(2, "0");

  const dateLabel = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const tzOffset = -time.getTimezoneOffset() / 60;
  const tzLabel = `UTC${tzOffset >= 0 ? "+" : ""}${String(tzOffset).padStart(2, "0")}:00`;

  const segments = [
    { value: hrs, label: "Hrs" },
    { value: min, label: "Min" },
    { value: sec, label: "Sec" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbe0e6] dark:border-gray-800 p-6 flex flex-col items-center justify-center shadow-sm">
      <p className="text-[#617589] dark:text-gray-400 text-sm font-medium mb-4 uppercase tracking-widest">
        Current System Time
      </p>

      <div className="flex gap-3 w-full">
        {segments.map((seg, idx) => (
          <>
            <div
              key={seg.label}
              className="flex grow flex-col items-center gap-2"
            >
              <div className="w-full h-16 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-black" style={{ color: "#137fec" }}>
                  {seg.value}
                </p>
              </div>
              <p className="text-[#617589] dark:text-gray-400 text-[10px] font-bold uppercase">
                {seg.label}
              </p>
            </div>
            {idx < 2 && (
              <div className="text-2xl font-bold flex items-center pb-6 text-gray-300">
                :
              </div>
            )}
          </>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-[#111418] dark:text-white font-bold text-sm">
          {dateLabel}
        </p>
        <p className="text-[#617589] dark:text-gray-400 text-xs">
          Work Zone: {tzLabel}
        </p>
      </div>
    </div>
  );
}
