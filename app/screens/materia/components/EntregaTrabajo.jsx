import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React from "react";

import CloudinaryPicker from "../../../components/CloudinaryPicker";

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

  const { session } = useSessionService();

  const [archivo, setArchivo] =
    React.useState(null);

  const [enviando, setEnviando] =
    React.useState(false);


  async function entregarTrabajo() {

    if (!archivo) {

      Alert.alert(
        "Atención",
        "Primero tenés que seleccionar un archivo."
      );

      return;

    }


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


      if (!respuesta.ok) {

        Alert.alert(
          "Error",
          respuesta.mensaje ||
            "No se pudo enviar la entrega."
        );

        return;

      }


      Alert.alert(
        "Entrega enviada",
        "El trabajo fue enviado correctamente."
      );


      setArchivo(null);


      // Avisamos a Trabajo.jsx
      // que la entrega fue enviada.
      if (onEntregada) {
        onEntregada();
      }


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
        onUploaded={setArchivo}
      />


      {archivo && (

        <Text style={styles.archivo}>

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
          onPress={entregarTrabajo}
          disabled={enviando}
        >

          <Text style={styles.textoBoton}>

            {enviando
              ? "Enviando..."
              : "Enviar"}

          </Text>

        </Pressable>

      )}

    </View>

  );

}


const styles = StyleSheet.create({

  card: {

    backgroundColor: COLORS.white,

    margin: SPACING.lg,

    padding: SPACING.lg,

    borderRadius: 12,

  },


  titulo: {

    fontSize: 20,

    fontWeight: "bold",

    marginBottom: SPACING.lg,

    color: COLORS.primaryDark,

  },


  archivo: {

    marginBottom: SPACING.md,

    fontWeight: "bold",

    color: COLORS.text,

  },


  boton: {

    backgroundColor: COLORS.primary,

    padding: SPACING.md,

    borderRadius: 8,

    alignItems: "center",

  },


  botonDeshabilitado: {

    opacity: 0.6,

  },


  textoBoton: {

    color: COLORS.white,

    fontWeight: "bold",

  },

});