import { useSession } from "../context/SessionContext";
import { SESSION_INICIAL } from "../constants/session";

export function useSessionService() {
const {
  session,
  setSession,
  limpiarSesion: limpiarSesionContext,
  setMostrarSesionFinalizada,
} = useSession();

  function obtenerSesion() {
    return session;
  }

  function actualizarSesion(datos) {
    setSession((anterior) => ({
      ...anterior,
      ...datos,
    }));
  }

  function actualizarCampo(campo, valor) {
    setSession((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  function limpiarSesion() {
    limpiarSesionContext();
  }

  return {
    session,
    obtenerSesion,
    actualizarSesion,
    actualizarCampo,
    limpiarSesion,
    setMostrarSesionFinalizada,
  };
}