import { useSession } from "../context/SessionContext";
import { SESSION_INICIAL } from "../constants/session";
export function useSessionService() {

  const { session, setSession } = useSession();

  function obtenerSesion() {
    return session;
  }

  function actualizarSesion(datos) {

    setSession((anterior) => ({

      ...anterior,

      ...datos,

    }));

  }

  function limpiarSesion() {

  setSession(SESSION_INICIAL);

}

  function actualizarCampo(campo, valor) {

    setSession((anterior) => ({

      ...anterior,

      [campo]: valor,

    }));

  }

  return {

    session,

    obtenerSesion,

    actualizarSesion,

    actualizarCampo,

    limpiarSesion,

  };

}