"use client";

import { useState } from "react";
import { Delete, Divide, Equal, Minus, Plus, X } from "lucide-react";

type ButtonType = "number" | "operator" | "equal" | "clear" | "decimal";

type ButtonConfig = {
  label: string;
  value: string;
  type: ButtonType;
};

const buttons: ButtonConfig[] = [
  { label: "7", value: "7", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "9", value: "9", type: "number" },
  { label: "/", value: "/", type: "operator" },

  { label: "4", value: "4", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "6", value: "6", type: "number" },
  { label: "×", value: "*", type: "operator" },

  { label: "1", value: "1", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "3", value: "3", type: "number" },
  { label: "-", value: "-", type: "operator" },

  { label: ".", value: ".", type: "decimal" },
  { label: "0", value: "0", type: "number" },
  { label: "=", value: "=", type: "equal" },
  { label: "+", value: "+", type: "operator" },
];

export default function Home() {
  const [current, setCurrent] = useState("0");
  const [expression, setExpression] = useState("");

  const handleInput = (btn: ButtonConfig) => {
    switch (btn.type) {
      case "number":
        if (current === "0") {
          setCurrent(btn.value);
        } else {
          setCurrent((prev) => prev + btn.value);
        }
        break;

      case "decimal":
        if (!current.includes(".")) {
          setCurrent((prev) => prev + ".");
        }
        break;

      case "operator":
        setExpression(current + " " + btn.label);
        setCurrent((prev) => prev + btn.value);
        break;

      case "equal":
        try {
          // eslint-disable-next-line no-eval
          const result = eval(current);

          setExpression(current);
          setCurrent(String(result));
        } catch {
          setCurrent("Error");
        }
        break;

      case "clear":
        setCurrent("0");
        setExpression("");
        break;
    }
  };

  return (
    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[radial-gradient(circle_at_top_left,_#111827,_#020617,_black)]
      px-4
    "
    >
      <div
        className="
        w-full
        max-w-sm
        rounded-[32px]
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        shadow-[0_0_60px_rgba(0,0,0,0.8)]
        p-6
      "
      >
        {/* Top */}
        <div className="mb-6">
          <p className="text-right text-sm text-gray-500 min-h-[20px] truncate">
            {expression}
          </p>

          <div
            className="
            mt-2
            rounded-2xl
            bg-black/40
            border border-white/5
            px-5
            py-6
            text-right
            text-white
            text-5xl
            font-light
            tracking-tight
            overflow-x-auto
          "
          >
            {current}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => {
            const isOperator = btn.type === "operator";
            const isEqual = btn.type === "equal";

            return (
              <button
                key={btn.label}
                onClick={() => handleInput(btn)}
                className={`
                  h-16
                  rounded-2xl
                  text-xl
                  font-semibold
                  transition-all
                  duration-200
                  active:scale-95
                  
                  ${
                    isEqual
                      ? `
                        bg-emerald-600
                        hover:bg-emerald-500
                        text-white
                        shadow-lg shadow-emerald-900/40
                      `
                      : isOperator
                        ? `
                        bg-white/[0.07]
                        hover:bg-white/[0.12]
                        text-emerald-400
                      `
                        : `
                        bg-black/40
                        hover:bg-black/60
                        text-white
                      `
                  }
                `}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="mt-4">
          <button
            onClick={() =>
              handleInput({
                label: "C",
                value: "",
                type: "clear",
              })
            }
            className="
              w-full
              h-14
              rounded-2xl
              bg-red-500/10
              border border-red-500/20
              text-red-400
              hover:bg-red-500/20
              transition-all
              duration-200
              flex
              items-center
              justify-center
              gap-2
              font-medium
            "
          >
            <Delete size={18} />
            Clear Calculator
          </button>
        </div>
      </div>
    </main>
  );
}
