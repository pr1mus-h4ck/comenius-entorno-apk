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
  // ==========================================
  // VALIDAR OTP ANTES DEL FETCH
  // ==========================================

  if (!otp || otp.length !== 6) {
    return Promise.resolve({
      ok: false,

      mensaje: "Debe completar el código de 6 dígitos.",
    });
  }

  // ==========================================
  // URL DEL BACK-END
  // ==========================================

  const URL = "http://localhost:3000/confirmar-otp";

  // ==========================================
  // FETCH
  // ==========================================

  return (
    fetch(URL, {
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
      // ========================================
      // CONVERTIR RESPUESTA A JSON
      // ========================================

      .then((recibir) => recibir.json())

      // ========================================
      // RESPUESTA DEL BACK-END
      // ========================================

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

          conexionError: false,
        };
      })

      // ========================================
      // ERROR DE CONEXIÓN
      // ========================================

      .catch((error) => {
        console.log("❌ Error confirmar OTP:", error);

        return {
          ok: false,

          conexionError: true,

          mensaje: "No se pudo conectar con el servidor.",
        };
      })
  );
}

// ===============================
// OBTENER LISTA DE COMISIONES
// ===============================

export function actualizarListaComision(usuarioID, sessionID, rol) {
  const URL = "http://localhost:3000/actualizarListaComision";

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
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta lista de comisiones:", recibido);

      return {
        ok: Array.isArray(recibido.comision),

        comisiones: recibido.comision || [],

        mensaje: recibido.mensaje,
      };
    })

    .catch((error) => {
      console.log("❌ Error al obtener comisiones:", error);

      return {
        ok: false,

        comisiones: [],

        mensaje: "No se pudieron obtener las comisiones.",
      };
    });
}


// ===============================
// OBTENER PORTADA
// ===============================

export function obtenerPortada(usuarioID, sessionID, comisionID) {
  const URL = "http://localhost:3000/actualizarPortada";

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
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta portada:", recibido);

      return {
        ok: !!recibido.portada,

        portada: recibido.portada,

        mensaje: recibido.mensaje,
      };
    })

    .catch((error) => {
      console.log("❌ Error al obtener portada:", error);

      return {
        ok: false,

        portada: [],

        mensaje: "No se pudo obtener la portada.",
      };
    });
}

// ===============================
// OBTENER PUBLICACIONES
// ===============================

export function obtenerPublicaciones(usuarioID, sessionID, comisionID) {
  const URL = "http://localhost:3000/actualizarPublicacion";

  return (
    fetch(URL, {
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
      .then((recibir) => recibir.json())

      // ==========================================
      // ADAPTAR RESPUESTA DEL BACK-END
      // ==========================================

      .then((recibido) => {
        console.log("✅ Respuesta publicaciones:", recibido);

        const publicaciones = (recibido.panelClase || []).map(
          (publicacion) => ({
            id: publicacion.id,

            Titulo: publicacion.Titulo,

            Contenido: publicacion.Contenido,

            FechaHora: publicacion.FechaHora,

            NombreCompleto: publicacion.NombreCompleto,

            comentarios: (publicacion.comentarios || []).map((comentario) => ({
              id: comentario.ComentarioID,

              Contenido: comentario.ComentarioContenido,

              FechaHora: comentario.FechaHoraComentario,

              NombreCompleto: comentario.NombreCompletoComenterio,
            })),
          }),
        );

        return {
          ok: !!recibido.panelClase,

          publicaciones: publicaciones,

          mensaje: recibido.mensaje,
        };
      })

      // ==========================================
      // ERROR DE CONEXIÓN
      // ==========================================

      .catch((error) => {
        console.log("❌ Error al obtener publicaciones:", error);

        return {
          ok: false,

          publicaciones: [],

          mensaje: "No se pudieron obtener las publicaciones.",
        };
      })
  );
}

// ===============================
// CREAR PUBLICACIÓN
// ===============================

export function crearPublicacion(
  usuarioID,
  sessionID,
  titulo,
  contenido,
  comisionID,
  instructorID,
) {
  if (!contenido.trim()) {
    return Promise.resolve({
      ok: false,

      mensaje: "El contenido de la publicación es obligatorio.",
    });
  }

  const URL = "http://localhost:3000/crearPublicacion";

  return fetch(URL, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: usuarioID,

      session: sessionID,

      titulo: titulo,

      publicacion: contenido,

      comisionID: comisionID,

      instructorId: instructorID,

      fechaHora: Date.now(),
    }),
  })
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta crear publicación:", recibido);

      return {
        ok: recibido.ok === true,

        mensaje: recibido.mensaje,
      };
    })

    .catch((error) => {
      console.log("❌ Error al crear publicación:", error);

      return {
        ok: false,

        mensaje: "No se pudo crear la publicación.",
      };
    });
}

// ===============================
// CREAR COMENTARIO
// ===============================

export function crearComentario(
  usuarioID,
  sessionID,
  publicacionId,
  comentario,
) {
  // Validar comentario antes de hacer el fetch
  if (!comentario.trim()) {
    return Promise.resolve({
      ok: false,

      mensaje: "El comentario no puede estar vacío.",
    });
  }

  // URL del Back-End
  const URL = "http://localhost:3000/crearComentario";

  return (
    fetch(URL, {
      method: "POST",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: usuarioID,

        session: sessionID,

        publicacionId: publicacionId,

        comentario: comentario,

        fechaHora: Date.now(),
      }),
    })
      // Convertir respuesta a JSON
      .then((recibir) => recibir.json())

      // Adaptar respuesta del Back-End
      .then((recibido) => {
        console.log("✅ Respuesta crear comentario:", recibido);

        return {
          ok: recibido.ok === true,

          mensaje: recibido.mensaje,
        };
      })

      // Error de conexión
      .catch((error) => {
        console.log("❌ Error al crear comentario:", error);

        return {
          ok: false,

          mensaje: "No se pudo crear el comentario.",
        };
      })
  );
}

// ===============================
// OBTENER LISTA DE TRABAJOS
// ===============================

export function obtenerTrabajos(usuarioID, sessionID, comisionID) {
  // URL del Back-End
  const URL = "http://localhost:3000/actualizarTrabajos";

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
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta lista de trabajos:", recibido);

      return {
        ok: !!recibido.trabajos,

        trabajos: recibido.trabajos || [],

        mensaje: recibido.mensaje,
      };
    })

    .catch((error) => {
      console.log("❌ Error al obtener trabajos:", error);

      return {
        ok: false,

        trabajos: [],

        mensaje: "No se pudieron obtener los trabajos.",
      };
    });
}

// ===============================
// OBTENER TRABAJO - INSTRUCTOR
// ===============================

export function obtenerTrabajoInstructor(
  usuarioID,
  sessionID,
  comisionID,
  trabajoID,
) {
  const URL = "http://localhost:3000/actualizarTrabajoInstructor";

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

      trabajo: trabajoID,
    }),
  })
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta trabajo instructor:", recibido);

      return {
        ok: !!recibido.id,

        trabajo: recibido,

        mensaje: recibido.mensaje,
      };
    })

    .catch((error) => {
      console.log("❌ Error al obtener trabajo:", error);

      return {
        ok: false,

        trabajo: null,

        mensaje: "No se pudo obtener el trabajo.",
      };
    });
}

// ===============================
// OBTENER TRABAJO - ALUMNO
// ===============================

export function obtenerTrabajoAlumno(
  usuarioID,
  sessionID,
  comisionID,
  trabajoID,
  listaAlumno,
) {
  const URL = "http://localhost:3000/actualizarTrabajoAlumno";

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

      trabajo: trabajoID,

      listaAlumno: listaAlumno,
    }),
  })
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta trabajo alumno:", recibido);

      return {
        ok: true,

        trabajo: recibido,

        mensaje: recibido.mensaje,
      };
    })

    .catch((error) => {
      console.log("❌ Error al obtener trabajo alumno:", error);

      return {
        ok: false,

        trabajo: null,

        mensaje: "No se pudo obtener el trabajo.",
      };
    });
}

// ===============================
// OBTENER CHAT DEL TRABAJO
// ===============================

export function obtenerChat(
  usuarioID,
  sessionID,
  trabajoID,
  comisionID,
  listaAlumno,
  rol,
) {
  const URL = "http://localhost:3000/actualizarChatTrabajo";

  return fetch(URL, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      session: sessionID,

      id: usuarioID,

      trabajo: trabajoID,

      comision: comisionID,

      listaAlumno: listaAlumno,

      rol: rol,
    }),
  })
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta chat:", recibido);

      return {
        ok: Array.isArray(recibido.chat),

        mensajes: recibido.chat || [],

        mensaje: recibido.mensaje,
      };
    })

    .catch((error) => {
      console.log("❌ Error al obtener chat:", error);

      return {
        ok: false,

        mensajes: [],

        mensaje: "No se pudo obtener el chat.",
      };
    });
}

// ===============================
// CREAR ENTREGA DE TRABAJO
// ===============================

export function crearTrabajosAlumnos(
  usuarioID,
  sessionID,
  comisionID,
  trabajoID,
  urlArchivos,
) {
  const URL = "http://localhost:3000/crearTrabajosAlumnos";

  return fetch(URL, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: usuarioID,

      session: sessionID,

      urlArchivos: urlArchivos,

      fechaHora: Date.now(),

      comisionID: comisionID,

      trabajoID: trabajoID,
    }),
  })
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta entrega:", recibido);

      return {
        ok: recibido.ok === true,

        mensaje: recibido.mensaje,
      };
    })

    .catch((error) => {
      console.log("❌ Error al enviar entrega:", error);

      return {
        ok: false,

        mensaje: "No se pudo enviar la entrega.",
      };
    });
}

// ===============================
// CERRAR SESIÓN
// ===============================

export async function cerrarSesion(usuarioID, sessionID) {
  const URL = "http://localhost:3000/cerrar-sesion";

  try {
    const respuesta = await fetch(URL, {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: usuarioID,

        session: sessionID,
      }),
    });

    const recibido = await respuesta.json();

    console.log("✅ Respuesta cerrar sesión:", recibido);

    return {
      ok: recibido.cerrarSesion === true || recibido.ok === true,

      mensaje: recibido.mensaje,
    };
  } catch (error) {
    console.log("❌ Error cerrar sesión:", error);

    return {
      ok: false,

      mensaje: "No se pudo cerrar la sesión en el servidor.",
    };
  }
}

// ===============================
// ACTUALIZAR COMISION
// ===============================

export async function actualizarComision(
  usuarioID,
  sessionID,
  comisionID,
  rol,
  instructorID,
) {
  const URL = "http://localhost:3000/actualizarComision";

  try {
    const respuesta = await fetch(URL, {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: usuarioID,
        session: sessionID,
        comisionID: comisionID,
        rol: rol,
        instructorId: instructorID,
      }),
    });

    const recibido = await respuesta.json();

    console.log("✅ Respuesta actualizar comisión:", recibido);

    if (!respuesta.ok) {
      return {
        ok: false,
        mensaje: recibido.mensaje,
      };
    }

    return {
      ok: true,
      comision: recibido.comision || [],
      mensaje: recibido.mensaje,
    };
  } catch (error) {
    console.log("❌ Error al actualizar comisión:", error);

    return {
      ok: false,
      conexionError: true,
      mensaje: "No se pudo actualizar la comisión.",
    };
  }
}
