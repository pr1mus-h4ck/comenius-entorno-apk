// ✅ Fetch usando .then() — sin async/await
export function login(correo, contrasena) {
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
      // Aquí adaptamos lo que devuelve tu API al formato que espera tu pantalla
      console.log(
        recibido.usuarioID + " " + recibido.sessionID + " " + recibido.correo,
      );
      return {
        ok: true,
        usuarioID: recibido.usuarioID,
        sessionID: recibido.sessionID,
        correo: recibido.correo,
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
