import { createContext, useContext, useEffect, useState } from "react";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  // Intenta cargar el historial desde localStorage, o usa un objeto vacío si no hay datos almacenados.
  const initialHistory = JSON.parse(localStorage.getItem("history")) || {
    users: [],
    repositorys: [],
    searchs: [],
  };

  const [history, setHistory] = useState(initialHistory);

  // Guarda el historial en localStorage cada vez que cambie.
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
