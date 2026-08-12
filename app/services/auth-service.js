export async function login(correo, contrasena) {

  return {

    ok: true,

    usuarioID: 1,

    sessionID: "123456",

    nombre: "Mariana",

    rol: "alumno",

    correo,

    verificacion: false,

  };

}