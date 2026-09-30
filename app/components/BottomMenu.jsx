import { useState } from "react";

import { Image } from "expo-image";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Icon from "./Icon";
import ConfirmacionModal from "./ConfirmacionModal";

import {
  ICONS,
} from "../constants/icons";

import {
  cerrarSesion as cerrarSesionApi,
} from "../services/auth-service";

import {
  irInicio,
  irLogin,
} from "../services/navigation-service";

import {
  useSessionService,
} from "../services/session-service";


export default function BottomMenu() {

  const {
    session,
    limpiarSesion,
    actualizarSesion,
    setMostrarSesionFinalizada,
  } = useSessionService();


  const [
    mostrarConfirmacionCerrar,
    setMostrarConfirmacionCerrar,
  ] = useState(false);


  // ==========================================
  // IR A INICIO
  // ==========================================

  function irInicioLimpio() {

    actualizarSesion({

      enlace: "",

      trabajo: null,

      alumno: null,

      listaAlumno: null,

    });


    irInicio();

  }


  // ==========================================
  // MOSTRAR CONFIRMACIÓN
  // ==========================================

  function confirmarCerrarSesion() {

    setMostrarConfirmacionCerrar(
      true
    );

  }


  // ==========================================
  // CANCELAR
  // ==========================================

  function cancelarCerrarSesion() {

    setMostrarConfirmacionCerrar(
      false
    );

  }


  // ==========================================
  // CERRAR SESIÓN
  // ==========================================

  async function ejecutarCerrarSesion() {

    setMostrarConfirmacionCerrar(
      false
    );


    try {

      const respuesta =
        await cerrarSesionApi(
          session.usuarioID,
          session.sessionID
        );


      console.log(
        "✅ Cerrar sesión:",
        respuesta
      );


    } catch (error) {

      console.log(
        "❌ Error al cerrar sesión:",
        error
      );

    } finally {

      // ======================================
      // LIMPIAR SESIÓN
      // ======================================

      limpiarSesion();


      // ======================================
      // VOLVER AL LOGIN
      // ======================================

      irLogin();


      // ======================================
      // MOSTRAR SESIÓN FINALIZADA
      // ======================================

      setMostrarSesionFinalizada(
        true
      );


      // ======================================
      // OCULTAR DESPUÉS DE 2 SEGUNDOS
      // ======================================

      setTimeout(() => {

        setMostrarSesionFinalizada(
          false
        );

      }, 2000);

    }

  }


  return (

    <>

      <View style={styles.menu}>

        {/* ============================= */}
        {/* INICIO */}
        {/* ============================= */}

        <Pressable

          style={({ pressed }) => [

            styles.boton,

            pressed &&
              styles.botonPresionado,

          ]}

          onPress={
            irInicioLimpio
          }

        >

          <Icon

            icon={
              ICONS.inicio
            }

            size={24}

          />

        </Pressable>


        {/* ============================= */}
        {/* LOGO */}
        {/* ============================= */}

        <Pressable

          style={({ pressed }) => [

            styles.boton,

            pressed &&
              styles.botonPresionado,

          ]}

          onPress={
            irInicioLimpio
          }

        >

          <Image

            source={
              require(
                "../../assets/mini-logo.svg"
              )
            }

            style={
              styles.logo
            }

            contentFit="contain"

          />

        </Pressable>


        {/* ============================= */}
        {/* CERRAR SESIÓN */}
        {/* ============================= */}

        <Pressable

          style={({ pressed }) => [

            styles.boton,

            pressed &&
              styles.botonPresionado,

          ]}

          android_ripple={{
            color: "#DDDDDD",
          }}

          onPress={
            confirmarCerrarSesion
          }

        >

          <Icon

            icon={
              ICONS.logout
            }

            size={24}

          />

        </Pressable>

      </View>


      {/* ================================= */}
      {/* CONFIRMACIÓN */}
      {/* ================================= */}

      <ConfirmacionModal

        visible={
          mostrarConfirmacionCerrar
        }

        titulo={
          "Estás a punto de\nCerrar la Sesión"
        }

        mensaje={
          "¿Estás seguro/a de\nquerer Cerrar la Sesión?"
        }

        textoConfirmar={
          "Sí, quiero Cerrar la Sesión"
        }

        textoCancelar={
          "No, no quiero Cerrar la Sesión"
        }

        onConfirmar={
          ejecutarCerrarSesion
        }

        onCancelar={
          cancelarCerrarSesion
        }

      />

    </>

  );

}


const styles = StyleSheet.create({

  menu: {

    position: "absolute",

    bottom: 0,

    left: 0,

    right: 0,

    height: 65,

    backgroundColor:
      "#FFFFFF",

    borderTopWidth: 1,

    borderTopColor:
      "#DDDDDD",

    flexDirection:
      "row",

    alignItems:
      "center",

    justifyContent:
      "space-around",

    zIndex: 100,

  },


  boton: {

    flex: 1,

    height: 65,

    alignItems:
      "center",

    justifyContent:
      "center",

  },


  botonPresionado: {

    opacity: 0.6,

    transform: [
      {
        scale: 0.94,
      },
    ],

  },


  logo: {

    width: 32,

    height: 32,

  },

});