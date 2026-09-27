import { useRef } from "react";

import { Stack } from "expo-router";

import { useSession, SessionProvider } from "./context/SessionContext";

import AlertaModal from "./components/AlertaModal";

import { irLogin } from "./services/navigation-service";


// ==========================================
// CONTROL GLOBAL DE ALERTAS
// ==========================================

function AlertasGlobales() {

  const {

    mostrarErrorConexion,
    setMostrarErrorConexion,

    mostrarSesionFinalizada,
    setMostrarSesionFinalizada,

    limpiarSesion,

  } = useSession();

  const temporizador = useRef(null);


  // ==========================================
  // ACEPTAR ERROR DE CONEXIÓN
  // ==========================================

  function aceptarErrorConexion() {

    // Cerramos la alerta roja.

    setMostrarErrorConexion(false);

    // Eliminamos los datos de sesión.

    limpiarSesion();

    // Navegamos al Login.

    irLogin();

    // Mostramos la alerta verde.

    setMostrarSesionFinalizada(true);

    // Después de 2 segundos
    // cerramos la alerta verde.

    if (temporizador.current) {
      clearTimeout(temporizador.current);
    }

    temporizador.current = setTimeout(() => {

      setMostrarSesionFinalizada(false);

      temporizador.current = null;

    }, 2000);

  }


  return (

    <>

      {/* ================================== */}
      {/* ERROR GLOBAL DE CONEXIÓN */}
      {/* ================================== */}

      <AlertaModal

        visible={mostrarErrorConexion}

        titulo="Error"

        mensaje={
          "En este momento ha ocurrido un error al establecer conexión con el servidor, vuelva intentarlo más tarde"
        }

        tipo="error"

        mostrarBoton={true}

        onAceptar={aceptarErrorConexion}

      />


      {/* ================================== */}
      {/* SESIÓN FINALIZADA */}
      {/* ================================== */}

      <AlertaModal

        visible={mostrarSesionFinalizada}

        titulo="Sesión Finalizada"

        mensaje={
          "¡Se ha Finalizado la\nSesión con Éxito!"
        }

        tipo="exito"

        mostrarBoton={false}

        onAceptar={() =>
          setMostrarSesionFinalizada(false)
        }

      />

    </>

  );

}


// ==========================================
// CONTENIDO PRINCIPAL
// ==========================================

function RootContent() {

  return (

    <>

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <AlertasGlobales />

    </>

  );

}


// ==========================================
// LAYOUT PRINCIPAL
// ==========================================

export default function RootLayout() {

  return (

    <SessionProvider>

      <RootContent />

    </SessionProvider>

  );

}