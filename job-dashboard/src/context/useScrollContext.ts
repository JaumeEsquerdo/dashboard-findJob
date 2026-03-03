import { useContext } from "react";
import { ScrollContext } from "./ScrollContext";

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("Debe usarse dentro del ScrollProvider");
  }
  return context;
};
