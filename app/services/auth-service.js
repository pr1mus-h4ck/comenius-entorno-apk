// ✅ Fetch usando .then() — sin async/await
export function login(correo, contrasena) {

  if (!correo.trim() || !contrasena.trim()) {
    return Promise.resolve({
      ok: false,
      mensaje: "Por favor, completa todos los campos"
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
      }
    })
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

// ===============================
// ENVIAR OTP
// ===============================

export function enviarOtp(usuarioID, sessionID) {

  // URL del Back-End
  const URL = "http://localhost:3000/enviar-otp";

  // Enviar datos de sesión al Back-End
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

    // Convertir respuesta a JSON
    .then((recibir) => recibir.json())

    // Adaptar respuesta del Back-End
    .then((recibido) => {

      console.log("✅ Respuesta enviar OTP:", recibido);

      return {
        ok: recibido.correoEnviado === "success",
        correoEnviado: recibido.correoEnviado,
        otp: recibido.otp,
        mensaje: recibido.tipo,
      };

    })

    // Error de conexión
    .catch((error) => {

      console.log("❌ Error enviar OTP:", error);

      return {
        ok: false,
        mensaje: "No se pudo enviar el código.",
      };

    });
}


// ===============================
// CONFIRMAR OTP
// ===============================

export function confirmarOtp(usuarioID, sessionID, otp) {

  // Validar código antes de hacer el fetch
  if (!otp || otp.length !== 6) {

    return Promise.resolve({
      ok: false,
      mensaje: "Debe completar el código de 6 dígitos.",
    });

  }

  // URL del Back-End
  const URL = "http://localhost:3000/confirmar-otp";

  // Enviar código al Back-End
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

    // Convertir respuesta a JSON
    .then((recibir) => recibir.json())

    // Adaptar respuesta del Back-End
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

    // Error de conexión
    .catch((error) => {

      console.log("❌ Error confirmar OTP:", error);

      return {
        ok: false,
        mensaje: "No se pudo verificar el código.",
      };

    });
}

// ===============================
// OBTENER LISTA DE COMISIONES
// ===============================

export function actualizarListaComision(usuarioID, sessionID, rol) {

  // URL del Back-End
  const URL = "http://localhost:3000/actualizarListaComision";

  // Enviar datos de sesión al Back-End
  return fetch(URL, {

    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: usuarioID,
      session: sessionID,
      rol: rol,
    }),

  })

    // Convertir respuesta a JSON
    .then((recibir) => recibir.json())

    // Adaptar respuesta del Back-End
    .then((recibido) => {

      console.log(
        "✅ Respuesta lista de comisiones:",
        recibido
      );

      return {
        ok: !!recibido.comision,

        comisiones: recibido.comision,

        mensaje: recibido.mensaje,
      };

    })

    // Error de conexión
    .catch((error) => {

      console.log(
        "❌ Error al obtener comisiones:",
        error
      );

      return {
        ok: false,

        comisiones: [],

        mensaje: "No se pudieron obtener las comisiones.",
      };

    });

}

// ===============================
// INGRESAR A COMISION
// ===============================

export function ingresarComision(comision, comisionID) {

  const URL = "http://localhost:3000/ingresarComision";

  return fetch(URL, {

    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      comision: comision,
      comisionID: comisionID,
    }),

  })

    .then((recibir) => {

      console.log(
        "✅ Respuesta ingresar comisión:",
        recibir.status
      );

      return recibir.ok;

    })

    .then((ok) => {

      return {
        ok: ok,
      };

    })

    .catch((error) => {

      console.log(
        "❌ Error al ingresar a la comisión:",
        error
      );

      return {
        ok: false,
      };

    });

}

// ===============================
// OBTENER PORTADA
// ===============================

export function obtenerPortada(usuarioID, sessionID, comisionID) {

  // URL del Back-End
  const URL = "http://localhost:3000/actualizarPortada";

  // Enviar datos al Back-End
  return fetch(URL, {

    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: usuarioID,
      session: sessionID,
      comisionID: comisionID,
    }),

  })

    // Convertir respuesta a JSON
    .then((recibir) => recibir.json())

    // Adaptar respuesta del Back-End
    .then((recibido) => {

      console.log(
        "✅ Respuesta portada:",
        recibido
      );

      return {
        ok: !!recibido.portada,

        portada: recibido.portada,

        mensaje: recibido.mensaje,
      };

    })

    // Error de conexión
    .catch((error) => {

      console.log(
        "❌ Error al obtener portada:",
        error
      );

      return {
        ok: false,

        portada: [],

        mensaje: "No se pudo obtener la portada.",
      };

    });

}