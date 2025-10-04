import React, { useEffect } from "react";
import "./tailwind.css";
import { useLoading } from "@pulse-editor/react-api";
import SpinWheel from "./spin-wheel";

export default function Main() {
  const { isReady, toggleLoading } = useLoading();

  useEffect(() => {
    if (isReady) {
      toggleLoading(false);
    }
  }, [isReady, toggleLoading]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <SpinWheel />
    </div>
  );
}
