import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import {
  obtenerPublicaciones,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";

import FormularioPublicacion from "./FormularioPublicacion";
import PublicacionCard from "./PublicacionCard";

export default function PanelClase() {
  const { session } =
    useSessionService();

  const [
    publicaciones,
    setPublicaciones,
  ] = useState([]);

  const [
    mensaje,
    setMensaje,
  ] = useState("");

  const cargarPublicaciones =
    useCallback(async () => {
      if (
        !session.usuarioID ||
        !session.sessionID ||
        !session.comisionID
      ) {
        return;
      }

      const respuesta =
        await obtenerPublicaciones(
          session.usuarioID,
          session.sessionID,
          session.comisionID
        );

      if (!respuesta.ok) {
        setPublicaciones([]);

        setMensaje(
          respuesta.mensaje ||
            "No hay publicaciones disponibles."
        );

        return;
      }

      setPublicaciones(
        respuesta.publicaciones || []
      );

      setMensaje("");
    }, [
      session.usuarioID,
      session.sessionID,
      session.comisionID,
    ]);

  useEffect(() => {
    cargarPublicaciones();
  }, [cargarPublicaciones]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
    >
      {session.rol === "instructor" && (
        <FormularioPublicacion
          onPublicado={
            cargarPublicaciones
          }
        />
      )}

      {mensaje ? (
        <Text style={styles.mensaje}>
          {mensaje}
        </Text>
      ) : null}
      {publicaciones.map(
        (publicacion) => (
          <PublicacionCard
            key={publicacion.id}
            publicacion={
              publicacion
            }
            onComentado={
              cargarPublicaciones
            }
          />
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  content: {
    paddingBottom: 30,
  },

  mensaje: {
    backgroundColor:
      COLORS.white,

    marginHorizontal:
      SPACING.md,

    padding: SPACING.lg,

    textAlign: "center",

    color:
      COLORS.textSecondary,

    borderRadius: 8,
  },
});