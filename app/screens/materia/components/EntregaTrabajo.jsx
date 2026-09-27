import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React from "react";

import CloudinaryPicker from "../../../components/CloudinaryPicker";

import AlertaModal from "../../../components/AlertaModal";

import {
  crearTrabajosAlumnos,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

import {
  COLORS,
} from "../../../constants/colors";

import {
  SPACING,
} from "../../../constants/spacing";


export default function EntregaTrabajo({
  onEntregada,
}) {

  const { session } =
    useSessionService();


  // ==========================================
  // ARCHIVO
  // ==========================================

  const [archivo, setArchivo] =
    React.useState(null);


  // ==========================================
  // ENVIANDO
  // ==========================================

  const [enviando, setEnviando] =
    React.useState(false);


  // ==========================================
  // MODAL ENTREGA EXITOSA
  // ==========================================

  const [
    mostrarEntregaExitosa,
    setMostrarEntregaExitosa,
  ] = React.useState(false);


  // ==========================================
  // ENVIAR ENTREGA
  // ==========================================

  async function entregarTrabajo() {

    // ========================================
    // VALIDAR ARCHIVO
    // ========================================

    if (!archivo) {

      Alert.alert(
        "Atención",
        "Primero tenés que seleccionar un archivo."
      );

      return;

    }


    // ========================================
    // EVITAR DOBLE CLICK
    // ========================================

    if (enviando) {
      return;
    }


    setEnviando(true);


    try {

      const respuesta =
        await crearTrabajosAlumnos(

          session.usuarioID,

          session.sessionID,

          session.comisionID,

          session.trabajo.id,

          [archivo]

        );


      console.log(
        "📨 Respuesta entrega:",
        respuesta
      );


      // ======================================
      // ERROR DE CONEXIÓN
      // ======================================

      if (
        respuesta.conexionError
      ) {

        // No mostramos el mensaje
        // de éxito.
        //
        // El auth-service ya dispara
        // la alerta global de conexión.

        return;

      }


      // ======================================
      // OTRO ERROR DEL BACKEND
      // ======================================

      if (!respuesta.ok) {

        Alert.alert(
          "Error",
          respuesta.mensaje ||
            "No se pudo enviar la entrega."
        );

        return;

      }


      // ======================================
      // ENTREGA EXITOSA
      // ======================================

      setArchivo(null);


      // Mostrar ventana verde

      setMostrarEntregaExitosa(
        true
      );


      // Avisamos a Trabajo.jsx
      // que la entrega fue enviada.

      if (onEntregada) {

        onEntregada();

      }


      // ======================================
      // OCULTAR MODAL
      // ======================================

      setTimeout(() => {

        setMostrarEntregaExitosa(
          false
        );

      }, 2000);


    } catch (error) {

      console.log(
        "❌ Error enviando entrega:",
        error
      );


      Alert.alert(
        "Error",
        "No se pudo enviar la entrega."
      );


    } finally {

      setEnviando(false);

    }

  }


  return (

    <View style={styles.card}>

      <Text style={styles.titulo}>

        Entregar Trabajo

      </Text>


      <CloudinaryPicker
        onUploaded={
          setArchivo
        }
      />


      {archivo && (

        <Text
          style={
            styles.archivo
          }
        >

          📎 {archivo.name}

        </Text>

      )}


      {archivo && (

        <Pressable

          style={[
            styles.boton,

            enviando &&
              styles.botonDeshabilitado,

          ]}

          onPress={
            entregarTrabajo
          }

          disabled={
            enviando
          }

        >

          <Text
            style={
              styles.textoBoton
            }
          >

            {enviando

              ? "Enviando..."

              : "Enviar"}

          </Text>

        </Pressable>

      )}


      {/* ================================== */}
      {/* ENTREGA EXITOSA */}
      {/* ================================== */}

      <AlertaModal

        visible={
          mostrarEntregaExitosa
        }

        titulo="¡Muy Bien!"

        mensaje={
          "¡Se ha subido su entrega\ncon éxito"
        }

        tipo="exito"

        mostrarBoton={false}

        onAceptar={() =>
          setMostrarEntregaExitosa(
            false
          )
        }

      />

    </View>

  );

}


const styles = StyleSheet.create({

  card: {

    backgroundColor:
      COLORS.white,

    margin:
      SPACING.lg,

    padding:
      SPACING.lg,

    borderRadius:
      12,

  },


  titulo: {

    fontSize:
      20,

    fontWeight:
      "bold",

    marginBottom:
      SPACING.lg,

    color:
      COLORS.primaryDark,

  },


  archivo: {

    marginBottom:
      SPACING.md,

    fontWeight:
      "bold",

    color:
      COLORS.text,

  },


  boton: {

    backgroundColor:
      COLORS.primary,

    padding:
      SPACING.md,

    borderRadius:
      8,

    alignItems:
      "center",

  },


  botonDeshabilitado: {

    opacity:
      0.6,

  },


  textoBoton: {

    color:
      COLORS.white,

    fontWeight:
      "bold",

  },

});