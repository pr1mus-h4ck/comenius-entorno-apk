import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  obtenerChat,
  actualizarChatTrabajo,
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

import {
  TYPOGRAPHY,
} from "../../../constants/typography";

export default function TrabajoChat() {

  const {
    session,
  } = useSessionService();

  const [
    mensajes,
    setMensajes,
  ] = useState([]);

  const [
    mensaje,
    setMensaje,
  ] = useState("");

  const [
    enviando,
    setEnviando,
  ] = useState(false);


  // ==========================================
  // CARGAR CHAT
  // ==========================================

  const cargarMensajes =
    useCallback(async () => {

      if (
        !session?.trabajo?.id ||
        !session?.usuarioID ||
        !session?.sessionID
      ) {
        return;
      }

      const respuesta =
        await obtenerChat(
          session.usuarioID,
          session.sessionID,
          session.trabajo.id,
          session.comisionID,
          session.listaAlumno,
          session.rol
        );

      console.log(
        "💬 Respuesta chat:",
        respuesta
      );

      if (!respuesta.ok) {

        // Si todavía no hay mensajes,
        // mostramos el chat vacío sin
        // interrumpir al usuario.
        setMensajes([]);

        return;
      }

      setMensajes(
        respuesta.mensajes || []
      );

    }, [
      session?.trabajo?.id,
      session?.usuarioID,
      session?.sessionID,
      session?.comisionID,
      session?.listaAlumno,
      session?.rol,
    ]);


  useEffect(() => {

    cargarMensajes();

  }, [
    cargarMensajes,
  ]);


  // ==========================================
  // ENVIAR MENSAJE
  // ==========================================

  async function enviarMensaje() {

    const texto =
      mensaje.trim();

    if (!texto) {

      Alert.alert(
        "Atención",
        "Escribí un mensaje."
      );

      return;
    }

    if (enviando) {
      return;
    }

    if (
      !session?.trabajo?.id
    ) {

      Alert.alert(
        "Error",
        "No hay un trabajo seleccionado."
      );

      return;
    }

    setEnviando(true);

    try {

      const respuesta =
        await actualizarChatTrabajo(
          session.usuarioID,
          session.sessionID,
          session.trabajo.id,
          session.comisionID,
          texto,
          session.listaAlumno,
          session.rol,
          session.instructorID
        );

      console.log(
        "📨 Enviar mensaje:",
        respuesta
      );

      if (!respuesta.ok) {

        Alert.alert(
          "Error",
          respuesta.mensaje ||
            "No se pudo enviar el mensaje."
        );

        return;
      }

      setMensaje("");

      await cargarMensajes();

    } catch (error) {

      console.log(
        "❌ Error enviando mensaje:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo enviar el mensaje."
      );

    } finally {

      setEnviando(false);

    }
  }


  return (

    <View style={styles.card}>

      <Text style={styles.titulo}>
        Chat
      </Text>


      <View style={styles.mensajes}>

        {mensajes.length === 0 ? (

          <Text style={styles.vacio}>
            No hay mensajes registrados
            por el momento
          </Text>

        ) : (

          mensajes.map(
            (mensajeItem, index) => (

              <View
                key={
                  mensajeItem.id ??
                  index
                }
                style={
                  styles.mensaje
                }
              >

                <Text
                  style={styles.fecha}
                >
                  {
                    mensajeItem.FechaHora
                  }
                </Text>

                <Text
                  style={styles.autor}
                >
                  {
                    mensajeItem.EmisorNombreCompleto
                  }
                </Text>

                <Text
                  style={styles.contenido}
                >
                  {
                    mensajeItem.Contenido
                  }
                </Text>

              </View>

            )
          )

        )}

      </View>


      <TextInput
        style={styles.input}
        placeholder="Escribe tu mensaje aquí..."
        value={mensaje}
        onChangeText={setMensaje}
        multiline
      />


      <Pressable
        style={[
          styles.boton,
          enviando &&
            styles.botonDeshabilitado,
        ]}
        onPress={enviarMensaje}
        disabled={enviando}
      >

        <Text
          style={styles.textoBoton}
        >
          {enviando
            ? "Enviando..."
            : "Enviar"}
        </Text>

      </Pressable>

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

    borderRadius: 12,

  },

  titulo: {

    fontSize:
      TYPOGRAPHY.h3,

    fontWeight: "bold",

    color:
      COLORS.primaryDark,

    marginBottom:
      SPACING.lg,

  },

  mensajes: {

    minHeight: 150,

    marginBottom:
      SPACING.md,

  },

  vacio: {

    color:
      COLORS.textSecondary,

    textAlign: "center",

    padding:
      SPACING.md,

  },

  mensaje: {

    marginBottom:
      SPACING.lg,

    borderBottomWidth: 1,

    borderBottomColor:
      COLORS.border,

    paddingBottom:
      SPACING.md,

  },

  fecha: {

    fontSize:
      TYPOGRAPHY.small,

    color:
      COLORS.textSecondary,

    marginBottom:
      SPACING.xs,

  },

  autor: {

    fontWeight: "bold",

    color:
      COLORS.text,

    marginBottom:
      SPACING.xs,

  },

  contenido: {

    color:
      COLORS.text,

  },

  input: {

    minHeight: 45,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 8,

    paddingHorizontal: 12,

    paddingVertical: 10,

    color:
      COLORS.text,

    marginBottom:
      SPACING.md,

    textAlignVertical:
      "top",

  },

  boton: {

    backgroundColor:
      COLORS.primary,

    padding:
      SPACING.md,

    borderRadius: 8,

    alignItems: "center",

  },

  botonDeshabilitado: {

    opacity: 0.6,

  },

  textoBoton: {

    color:
      COLORS.white,

    fontWeight: "bold",

  },

});