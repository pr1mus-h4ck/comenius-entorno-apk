// ❌ SIN import de librerías nuevas
// ✅ SOLO tu código original, con los console.log para probar

export function iniciarSesion(datos, setSession) {
  console.log("✅ RECIBIDO en iniciarSesion:", datos);

  // 💾 SIN guardado en disco → SOLO en memoria (contexto)
  setSession((anterior) => ({
    ...anterior,
    usuarioID: datos.usuarioID,
    sessionID: datos.sessionID,
    nombre: datos.nombre,
    rol: datos.rol,
    correo: datos.correo,
    verificacion: datos.verificacion,
    instructorID: datos.instructorID,
  }));
}

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
    instructorID: null,
  });
}
