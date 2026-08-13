// ✅ Fetch usando .then() — sin async/await
export function login(correo, contrasena) {
  if (!correo.trim() || !contrasena.trim()) {
    return Promise.resolve({
      ok: false,
      mensaje: "Por favor, completa todos los campos",
    });
  }
  // Reemplaza esta URL por la de tu API real
  const URL = "http://localhost:3000/login";

  return fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: correo,
      contrasena: contrasena,
    }),
  })
    .then((recibir) => recibir.json())
    .then((recibido) => {
      console.log("✅ Respuesta del Login:", recibido);
      // Aquí adaptamos lo que devuelve tu API al formato que espera tu pantalla
      return {
        ok: !!(recibido.usuarioID && recibido.sessionID),
        usuarioID: recibido.usuarioID,
        sessionID: recibido.sessionID,
        correo: recibido.correo,
        mensaje: recibido.tipo,
      };
    })
    .catch((error) => {
      // Si falla la petición, devolvemos ok: false
      console.log("Error en el fetch:", error);
      return {
        ok: false,
      };
    });
}

// ===============================
// ENVIAR OTP
// ===============================

export function enviarOtp(usuarioID, sessionID) {
  // URL del Back-End
  const URL = "http://localhost:3000/enviar-otp";

  return fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: usuarioID,
      session: sessionID,
    }),
  })
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta enviar OTP:", recibido);

      return {
        ok: recibido.correoEnviado === "success",

        correoEnviado: recibido.correoEnviado,

        otp: recibido.otp,

        mensaje: recibido.tipo,
      };
    })
    .catch((error) => {
      console.log("Error en enviar OTP:", error);

      return {
        ok: false,
        mensaje: "No se pudo enviar el código de verificación",
      };
    });
}

// ===============================
// CONFIRMAR OTP
// ===============================

export function confirmarOtp(usuarioID, sessionID, otp) {
  if (!otp || !otp.length !== 6) {
    return Promise.resolve({
      ok: false,
      mensaje: "Debe completar el código de 6 dígitos.",
    });
  }

  const URL = "http://localhost:3000/confirmar-otp";

  return fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: usuarioID,
      session: sessionID,
      otp: otp,
    }),
  })
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta confirmar OTP:", recibido);

      return {
        ok: !!recibido.verificacion,
        verificacion: recibido.verificacion,
        rol: recibido.rol,
        nombre: recibido.nombre,
        instructorID: recibido.instructorId,
        intentos: recibido.intentos,
        mensaje: recibido.tipo,
      };
    })

    .catch((error) => {
      console.log("❌ Error confirmar OTP:", error);

      return {
        ok: false,
        mensaje: "No se pudo verificar el código.",
      };
    });
}
