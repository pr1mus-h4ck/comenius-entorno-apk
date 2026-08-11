// ==============================
// Iniciar sesión
// ==============================

export function iniciarSesion(datos, setSession) {

  setSession((anterior) => ({

    ...anterior,

    usuarioID: datos.usuarioID,
    sessionID: datos.sessionID,
    nombre: datos.nombre,
    rol: datos.rol,

    correo: datos.correo,
    verificacion: datos.verificacion,

  }));

}

// ==============================
// Cerrar sesión
// ==============================

export function cerrarSesion(setSession) {

  setSession({

    usuarioID: null,

    sessionID: null,

    nombre: "",

    rol: null,

    otp: null,

    correo: "",

    verificacion: false,

    item: "Inicio",

    comision: null,

    comisionID: null,

    enlace: null,

    trabajo: null,

    listaAlumno: null,

  });

}