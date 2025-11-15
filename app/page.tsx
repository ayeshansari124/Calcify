"use client";

import { useState } from "react";

type ButtonConfig = {
  label: string;
  action: "number" | "operator" | "decimal" | "equal" | "clear";
  className?: string;
};

const buttons: ButtonConfig[] = [
  { label: "7", action: "number" }, { label: "8", action: "number" }, { label: "9", action: "number" }, { label: "/", action: "operator" },
  { label: "4", action: "number" }, { label: "5", action: "number" }, { label: "6", action: "number" }, { label: "*", action: "operator" },
  { label: "1", action: "number" }, { label: "2", action: "number" }, { label: "3", action: "number" }, { label: "-", action: "operator" },
  { label: "0", action: "number" }, { label: ".", action: "decimal" },
  { label: "=", action: "equal", className: "bg-green-900 hover:bg-green-700 text-white" },
  { label: "+", action: "operator" },
];

export default function Home() {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [operator, setOperator] = useState("");

  const handleClick = ({ label, action }: ButtonConfig) => {
    switch (action) {
      case "number":
        setCurrent((v) => v + label);
        break;
      case "operator":
        if (!current) return;
        setOperator(label);
        setPrevious(current);
        setCurrent("");
        break;
      case "decimal":
        if (!current.includes(".")) setCurrent((v) => v + ".");
        break;
      case "equal":
        if (previous && current && operator) {
          try {
            // eslint-disable-next-line no-eval
            setCurrent(String(eval(`${previous}${operator}${current}`)));
            setPrevious("");
            setOperator("");
          } catch {
            setCurrent("Error");
          }
        }
        break;
      case "clear":
        setCurrent(""); setPrevious(""); setOperator("");
        break;
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center font-[cursive] text-xl font-bold">
      <div className="bg-black/50 backdrop-blur-md w-[90vw] sm:w-[400px] p-6 rounded-2xl flex flex-col items-center shadow-2xl">
        <div className="bg-black text-white rounded-lg w-full h-14 px-4 py-2 text-right mb-4 overflow-hidden text-2xl">
          {current || operator || "0"}
        </div>

        <div className="grid grid-cols-4 gap-3 w-full mb-4">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleClick(btn)}
              className={`rounded-lg text-2xl bg-black hover:bg-gray-900 cursor-pointer transition py-2 ${btn.className || ""}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleClick({ label: "C", action: "clear" })}
          className="w-full bg-red-900 hover:bg-red-800 cursor-pointer text-white py-2 rounded-lg transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
