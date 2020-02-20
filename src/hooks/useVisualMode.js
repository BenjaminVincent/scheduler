import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(history[history.length-1] = newMode);
    } else {
      setHistory([...history, newMode]);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length <= 1) {
      setMode(mode);
    } else {
    let removeLast = history.slice(0, history.length - 1);
    setHistory(removeLast);
    setMode(removeLast[removeLast.length-1]);
    }
  }
  return { mode, transition, back };
};




