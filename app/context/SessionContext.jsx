import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { SESSION_INICIAL } from "../constants/session";

import {
  registrarErrorConexion,
  quitarErrorConexion,
} from "../services/connection-error";

const SessionContext = createContext();

export function SessionProvider({ children }) {

  const [
    session,
    setSessionState,
  ] = useState(
    SESSION_INICIAL
  );


  // ==========================================
  // ALERTA ERROR DE CONEXIÓN
  // ==========================================

  const [
    mostrarErrorConexion,
    setMostrarErrorConexion,
  ] = useState(false);

  useEffect(() => {

  registrarErrorConexion(() => {

    setMostrarErrorConexion(true);

  });

  return () => {

    quitarErrorConexion();

  };

}, []);


  // ==========================================
  // ALERTA SESIÓN FINALIZADA
  // ==========================================

  const [
    mostrarSesionFinalizada,
    setMostrarSesionFinalizada,
  ] = useState(false);


  // ==========================================
  // SESIÓN
  // ==========================================

  function setSession(
    actualizacion
  ) {

    setSessionState(
      (anterior) => {

        const nuevaSesion =
          typeof actualizacion ===
          "function"
            ? actualizacion(anterior)
            : actualizacion;

        return nuevaSesion;

      }
    );

  }


  // ==========================================
  // LIMPIAR SESIÓN
  // ==========================================

  function limpiarSesion() {

    setSessionState(
      SESSION_INICIAL
    );

  }


  return (

    <SessionContext.Provider
      value={{

        session,

        setSession,

        limpiarSesion,


        // ALERTAS GLOBALES

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

  return useContext(
    SessionContext
  );

}