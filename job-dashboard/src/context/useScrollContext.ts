import { useContext } from "react";
import { ScrollContext } from "./ScrollContext";

// Custom hook que asegura que el contexto se use dentro de HelperProvider
export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("Debe usarse dentro del ScrollProvider");
  }
  return context;
};
