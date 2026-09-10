// ❌ SIN import de librerías nuevas
// ✅ SOLO tu código original, con los console.log para probar

import {
  SESSION_INICIAL,
} from "../constants/session";

export function iniciarSesion(
  datos,
  setSession
) {
  console.log(
    "✅ RECIBIDO en iniciarSesion:",
    datos
  );

  setSession({
    ...SESSION_INICIAL,

    usuarioID:
      datos.usuarioID,

    sessionID:
      datos.sessionID,

    nombre:
      datos.nombre || "",

    correo:
      datos.correo || "",

    verificacion: false,

    otpSolicitado: false,
  });
}

export function cerrarSesion(
  setSession
) {
  setSession(
    SESSION_INICIAL
  );
}
