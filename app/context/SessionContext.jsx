import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { SESSION_INICIAL } from "../constants/session";

import {
  registrarErrorConexion,
  quitarErrorConexion,
} from "../services/connection-error";

const SessionContext = createContext();

export function SessionProvider({ children }) {

  const [session, setSessionState] = useState(
    SESSION_INICIAL
  );

  // ==========================================
  // ERROR GLOBAL DE CONEXIÓN
  // ==========================================

  const [
    mostrarErrorConexion,
    setMostrarErrorConexion,
  ] = useState(false);

  // ==========================================
  // SESIÓN FINALIZADA
  // ==========================================

  const [
    mostrarSesionFinalizada,
    setMostrarSesionFinalizada,
  ] = useState(false);

  // ==========================================
  // ESCUCHAR ERROR DE CONEXIÓN
  // ==========================================

  useEffect(() => {

    registrarErrorConexion(() => {

      setMostrarErrorConexion(true);

    });

    return () => {

      quitarErrorConexion();

    };

  }, []);

  // ==========================================
  // ACTUALIZAR SESIÓN
  // ==========================================

  function setSession(actualizacion) {

    setSessionState((anterior) => {

      const nuevaSesion =
        typeof actualizacion === "function"
          ? actualizacion(anterior)
          : actualizacion;

      return nuevaSesion;

    });

  }

  // ==========================================
  // LIMPIAR SESIÓN
  // ==========================================

  function limpiarSesion() {

    setSessionState(SESSION_INICIAL);

  }

  return (

    <SessionContext.Provider
      value={{

        session,

        setSession,

        limpiarSesion,

        mostrarErrorConexion,

        setMostrarErrorConexion,

        mostrarSesionFinalizada,

        setMostrarSesionFinalizada,

      }}
    >

      {children}

    </SessionContext.Provider>

  );

}

export function useSession() {

  return useContext(SessionContext);

}