import {
  informarErrorConexion,
} from "./connection-error";

export function login(correo, contrasena) {

  // ==========================================
  // VALIDAR CAMPOS
  // ==========================================

  if (
    !correo.trim() ||
    !contrasena.trim()
  ) {

    return Promise.resolve({

      ok: false,

      tipo: "camposObligatorios",

      mensaje:
        "Todos los campos del formulario son obligatorios.",

    });

  }


  // ==========================================
  // URL DEL BACK-END
  // ==========================================

  const URL =
    "http://localhost:3000/login";


  // ==========================================
  // FETCH
  // ==========================================

  return fetch(URL, {

    method: "POST",

    headers: {

      Accept:
        "application/json",

      "Content-Type":
        "application/json",

    },

    body: JSON.stringify({

      correo:
        correo,

      contrasena:
        contrasena,

    }),

  })

    // ========================================
    // CONVERTIR RESPUESTA A JSON
    // ========================================

    .then((recibir) =>
      recibir.json()
    )


    // ========================================
    // RESPUESTA DEL BACK-END
    // ========================================

    .then((recibido) => {

      console.log(
        "✅ Respuesta del Login:",
        recibido
      );


      return {

        ok:
          !!(
            recibido.usuarioID &&
            recibido.sessionID
          ),


        usuarioID:
          recibido.usuarioID,


        sessionID:
          recibido.sessionID,


        correo:
          recibido.correo,


        tipo:
          recibido.tipo,


        mensaje:
          recibido.mensaje,


        intentos:
          recibido.intentos,


        conexionError:
          false,

      };

    })


    // ========================================
    // ERROR DE CONEXIÓN
    // ========================================

    .catch((error) => {

      console.log(
        "❌ Error en el fetch Login:",
        error
      );


      return {

        ok: false,

        conexionError: true,

        tipo: "conexion",

        mensaje:
          "No se pudo iniciar la sesión.",

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

      console.log(
        "❌ Error en enviar OTP:",
        error
      );

      return {

        ok: false,

        conexionError: true,

        mensaje:
          "No se pudo conectar con el servidor.",

      };

    });
}

// ===============================
// CONFIRMAR OTP
// ===============================

export function confirmarOtp(
  usuarioID,
  sessionID,
  otp
) {

  // ==========================================
  // VALIDAR OTP ANTES DEL FETCH
  // ==========================================

  if (!otp || otp.length !== 6) {

    return Promise.resolve({

      ok: false,

      tipo: "camposObligatorios",

      mensaje:
        "Debe completar el código de 6 dígitos.",

      conexionError: false,

    });

  }


  // ==========================================
  // URL DEL BACK-END
  // ==========================================

  const URL =
    "http://localhost:3000/confirmar-otp";


  // ==========================================
  // FETCH
  // ==========================================

  return fetch(URL, {

    method: "POST",

    headers: {

      Accept:
        "application/json",

      "Content-Type":
        "application/json",

    },

    body: JSON.stringify({

      id:
        usuarioID,

      session:
        sessionID,

      otp:
        otp,

    }),

  })

    // ========================================
    // JSON
    // ========================================

    .then((recibir) =>
      recibir.json()
    )


    // ========================================
    // RESPUESTA BACK-END
    // ========================================

    .then((recibido) => {

      console.log(
        "✅ Respuesta confirmar OTP:",
        recibido
      );


      return {

        ok:
          !!recibido.verificacion,


        verificacion:
          recibido.verificacion,


        rol:
          recibido.rol,


        nombre:
          recibido.nombre,


        instructorID:
          recibido.instructorId,


        // ====================================
        // IMPORTANTE
        // ====================================

        // Primer/segundo intento
        intentos:
          recibido.intentos,


        // Tipo REAL del backend
        tipo:
          recibido.tipo,


        // Mensaje REAL del backend
        mensaje:
          recibido.mensaje,


        conexionError:
          false,

      };

    })


    // ========================================
    // ERROR DE CONEXIÓN
    // ========================================

    .catch((error) => {

      console.log(
        "❌ Error confirmar OTP:",
        error
      );


      return {

        ok: false,

        conexionError: true,

        mensaje:
          "No se pudo conectar con el servidor.",

      };

    });

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

      console.log(
        "❌ Error al obtener comisiones:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        comisiones: [],
        mensaje:
          "No se pudieron obtener las comisiones.",
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

      console.log(
        "❌ Error al obtener portada:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        portada: [],
        mensaje:
          "No se pudo obtener la portada.",
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

        console.log(
          "❌ Error al obtener publicaciones:",
          error
        );

        informarErrorConexion();

        return {
          ok: false,
          conexionError: true,
          publicaciones: [],
          mensaje:
            "No se pudieron obtener las publicaciones.",
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

  console.log(
    "❌ Error al crear publicación:",
    error
  );

  informarErrorConexion();

  return {
    ok: false,
    conexionError: true,
    mensaje:
      "No se pudo crear la publicación.",
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
  if (!comentario.trim()) {
    return Promise.resolve({
      ok: false,

      mensaje: "El comentario no puede estar vacío.",
    });
  }

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
      .then((recibir) => recibir.json())

      .then((recibido) => {
        console.log("✅ Respuesta crear comentario:", recibido);

        return {
          ok: recibido.ok === true,

          mensaje: recibido.mensaje,
        };
      })

      .catch((error) => {

        console.log(
          "❌ Error al crear comentario:",
          error
        );

        informarErrorConexion();

        return {
          ok: false,
          conexionError: true,
          mensaje:
            "No se pudo crear el comentario.",
        };

      })
  );
}

// ===============================
// OBTENER LISTA DE TRABAJOS
// ===============================

export function obtenerTrabajos(usuarioID, sessionID, comisionID) {

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

      console.log(
        "❌ Error al obtener trabajos:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        trabajos: [],
        mensaje:
          "No se pudieron obtener los trabajos.",
      };

    });
}

// ===============================
// OBTENER LISTA DE ALUMNOS
// ===============================

export function obtenerAlumnos(
  usuarioID,
  sessionID,
  comisionID,
  instructorID
) {
  const URL =
    "http://localhost:3000/actualizarAlumnos";

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
      instructorId: instructorID,
    }),
  })
    .then((recibir) =>
      recibir.json()
    )

    .then((recibido) => {
      console.log(
        "✅ Respuesta lista de alumnos:",
        recibido
      );

      return {
        ok: Array.isArray(
          recibido.listaAlumnos
        ),

        alumnos:
          recibido.listaAlumnos || [],

        mensaje:
          recibido.mensaje,
      };
    })

    .catch((error) => {

      console.log(
        "❌ Error al obtener alumnos:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        alumnos: [],
        mensaje:
          "No se pudo obtener la lista de alumnos.",
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

      console.log(
        "❌ Error al obtener trabajo:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        trabajo: null,
        mensaje:
          "No se pudo obtener el trabajo.",
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
  rol,
  instructorID,
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
      rol: rol,
      instructorId: instructorID,
    }),
  })
    .then((recibir) => recibir.json())

    .then((recibido) => {
      console.log("✅ Respuesta trabajo alumno:", recibido);

      return {
        ok: recibido.ok === true,

        trabajo: recibido.archivosEntregas || null,

        mensaje: recibido.mensaje,
      };
    })

    .catch((error) => {

      console.log(
        "❌ Error al obtener trabajo alumno:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        trabajo: null,
        mensaje:
          "No se pudo obtener el trabajo.",
      };

    });
}

// =============================
// OBTENER CHAT DEL TRABAJO
// =============================

export function obtenerChat(
  usuarioID,
  sessionID,
  trabajoID,
  comisionID,
  listaAlumno,
  rol,
) {
  const URL =
    "http://localhost:3000/actualizarChatTrabajo";

  return fetch(URL, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: usuarioID,
      session: sessionID,
      trabajo: trabajoID,
      comision: comisionID,
      listaAlumno: listaAlumno,
      rol: rol,
    }),
  })
    .then((recibir) =>
      recibir.json()
    )
    .then((recibido) => {
      return {
        ok: Array.isArray(
          recibido.chat
        ),
        mensajes:
          recibido.chat || [],
        mensaje:
          recibido.mensaje,
      };
    })
    .catch((error) => {

      console.log(
        "❌ Error al obtener chat:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        mensajes: [],
        mensaje:
          "No se pudo obtener el chat.",
      };

    });
}

// =============================
// ACTUALIZAR CHAT DEL TRABAJO
// =============================

export function actualizarChatTrabajo(
  usuarioID,
  sessionID,
  trabajoID,
  comisionID,
  mensaje,
  alumnoID,
  rol,
  instructorID,
) {
  const URL =
    "http://localhost:3000/crearChatTrabajo";

  return fetch(URL, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: usuarioID,
      session: sessionID,
      instructorId: instructorID || 1,
      listaAlumno: alumnoID,
      chat: mensaje,
      fechaHora: Date.now(),
      comisionID: comisionID,
      trabajoID: trabajoID,
      rol: rol,
    }),
  })
    .then((recibir) =>
      recibir.json()
    )
    .then((recibido) => {
      console.log(
        "✅ Respuesta enviar chat:",
        recibido
      );

      return {
        ok: recibido.ok === true,
        mensaje: recibido.mensaje,
        error: recibido.error,
      };
    })
    .catch((error) => {

      console.log(
        "❌ Error al enviar mensaje:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        mensaje:
          "No se pudo enviar el mensaje.",
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

      console.log(
        "❌ Error al enviar entrega:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        mensaje:
          "No se pudo enviar la entrega.",
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
    console.log(
      "❌ Error al actualizar comisión:",
      error
    );

    informarErrorConexion();

    return {
      ok: false,
      conexionError: true,
      mensaje:
        "No se pudo actualizar la comisión.",
    };

  }
}

export function crearTrabajo(
  usuarioID,
  sessionID,
  titulo,
  contenido,
  comisionID,
  instructorID,
  urlArchivos = [],
) {
  const URL = "http://localhost:3000/crearTrabajos";

  return fetch(URL, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: usuarioID,
      session: sessionID,
      titulo,
      contenido,
      comisionID,
      instructorId: instructorID,
      fechaHora: Date.now(),
      urlArchivos,
    }),
  })
    .then((recibir) => recibir.json())
    .then((recibido) => ({
      ok: recibido.ok === true,
      mensaje: recibido.mensaje || recibido.error,
    }))
    .catch((error) => {

      console.log(
        "❌ Error al crear trabajo:",
        error
      );

      informarErrorConexion();

      return {
        ok: false,
        conexionError: true,
        mensaje:
          "No se pudo crear el trabajo.",
      };

    });
}
