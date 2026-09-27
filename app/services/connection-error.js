let listener = null;

export function registrarErrorConexion(callback) {
  listener = callback;
}

export function quitarErrorConexion() {
  listener = null;
}

export function informarErrorConexion() {
  if (listener) {
    listener();
  }
}