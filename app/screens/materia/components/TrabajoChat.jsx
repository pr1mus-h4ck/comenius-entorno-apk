import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { obtenerChat } from "../../../services/auth-service";
import { useSessionService } from "../../../services/session-service";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

export default function TrabajoChat() {

  const {
    session,
  } = useSessionService();

  const [mensajes, setMensajes] = useState([]);

 useEffect(() => {
  if (
    session?.trabajo?.id
  ) {
    cargarMensajes();
  }
}, [
  session?.trabajo?.id,
  session?.usuarioID,
  session?.sessionID,
  session?.comisionID,
  session?.rol,
  session?.listaAlumno,
]);

  async function cargarMensajes() {

    const respuesta = await obtenerChat(

        session.usuarioID,
        session.sessionID,
        session.trabajo?.id,
        session.comisionID,
        session.listaAlumno,
        session.rol

    );

    if (!respuesta.ok) {

      Alert.alert(
        "Error",
        respuesta.mensaje ||
        "No se pudo cargar el chat."
      );

      return;

    }

    setMensajes(
  respuesta.mensajes || []
);

  }

  return (

    <View style={styles.card}>

      <Text style={styles.titulo}>
        Chat
      </Text>

      {mensajes.map((mensaje, index) => (

        <View
          key={mensaje.id ?? index}
          style={styles.mensaje}
        >

          <Text style={styles.fecha}>
            {mensaje.FechaHora}
          </Text>

          <Text style={styles.autor}>
            {mensaje.EmisorNombreCompleto}
          </Text>

          <Text style={styles.contenido}>
            {mensaje.Contenido}
          </Text>

        </View>

      ))}

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

    fontSize: TYPOGRAPHY.h3,

    fontWeight: "bold",

    color: COLORS.primaryDark,

    marginBottom: SPACING.lg,

  },

  mensaje: {

    marginBottom: SPACING.lg,

    borderBottomWidth: 1,

    borderBottomColor: COLORS.border,

    paddingBottom: SPACING.md,

  },

  fecha: {

    fontSize: TYPOGRAPHY.small,

    color: COLORS.textSecondary,

    marginBottom: SPACING.xs,

  },

  autor: {

    fontWeight: "bold",

    color: COLORS.text,

    marginBottom: SPACING.xs,

  },

  contenido: {

    color: COLORS.text,

  },

});