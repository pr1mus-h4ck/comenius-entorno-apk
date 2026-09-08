import { useSession } from "../context/SessionContext";

export function useSessionService() {
  const {
    session,
    setSession,
    limpiarSesion: limpiarSesionContext,
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

  async function limpiarSesion() {
    await limpiarSesionContext();
  }

  return {
    session,
    obtenerSesion,
    actualizarSesion,
    actualizarCampo,
    limpiarSesion,
  };
}