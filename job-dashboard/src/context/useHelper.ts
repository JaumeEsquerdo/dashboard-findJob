import { useContext } from "react";
import { HelperContext } from "./HelperContext";

// Custom hook que asegura que el contexto se use dentro de HelperProvider
export const useHelper = () => {
  const context = useContext(HelperContext);

  if (!context) {
    throw new Error("Debe usarse dentro del HelperProvider");
  }
  return context;
};
