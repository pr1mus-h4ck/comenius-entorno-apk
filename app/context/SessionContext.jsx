import {
  createContext,
  useContext,
  useState,
} from "react";

import { SESSION_INICIAL } from "../constants/session";

const SessionContext = createContext();

const STORAGE_KEY = "comenius_session";

function leerSesionGuardada() {
  try {
    if (typeof localStorage === "undefined") {
      return SESSION_INICIAL;
    }

    const guardada =
      localStorage.getItem(STORAGE_KEY);

    if (!guardada) {
      return SESSION_INICIAL;
    }

    const sesion = JSON.parse(guardada);

    return {
      ...SESSION_INICIAL,
      ...sesion,
    };
  } catch (error) {
    console.log(
      "❌ Error leyendo sesión guardada:",
      error
    );

    return SESSION_INICIAL;
  }
}

export function SessionProvider({ children }) {
  const [session, setSessionState] = useState(
    leerSesionGuardada
  );

  function setSession(actualizacion) {
    setSessionState((anterior) => {
      const nuevaSesion =
        typeof actualizacion === "function"
          ? actualizacion(anterior)
          : actualizacion;

      try {
        if (
          typeof localStorage !== "undefined"
        ) {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(nuevaSesion)
          );
        }
      } catch (error) {
        console.log(
          "❌ Error guardando sesión:",
          error
        );
      }

      return nuevaSesion;
    });
  }

  function limpiarSesion() {
    try {
      if (
        typeof localStorage !== "undefined"
      ) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.log(
        "❌ Error eliminando sesión:",
        error
      );
    }

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