import {
  createContext,
  useContext,
  useState,
} from "react";

import { SESSION_INICIAL } from "../constants/session";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSessionState] = useState(
    SESSION_INICIAL
  );

  function setSession(actualizacion) {
    setSessionState((anterior) => {
      const nuevaSesion =
        typeof actualizacion === "function"
          ? actualizacion(anterior)
          : actualizacion;

      return nuevaSesion;
    });
  }

  function limpiarSesion() {
    setSessionState(SESSION_INICIAL);
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        limpiarSesion,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}