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
  obtenerTrabajos,
} from "../../services/auth-service";

import {
  useSessionService,
} from "../../services/session-service";

import FormularioTrabajo from "./components/FormularioTrabajo";
import TrabajoCard from "./components/TrabajoCard";

export default function ListaTrabajo() {
  const { session } =
    useSessionService();

  const [
    trabajos,
    setTrabajos,
  ] = useState([]);

  const [
    mensaje,
    setMensaje,
  ] = useState("");

  const cargarTrabajos =
    useCallback(async () => {
      if (
        !session.usuarioID ||
        !session.sessionID ||
        !session.comisionID
      ) {
        return;
      }

      const respuesta =
        await obtenerTrabajos(
          session.usuarioID,
          session.sessionID,
          session.comisionID
        );

      if (!respuesta.ok) {
        setTrabajos([]);

        setMensaje(
          respuesta.mensaje ||
            "No hay trabajos asignados por el momento."
        );

        return;
      }

      setTrabajos(
        respuesta.trabajos || []
      );

      setMensaje("");
    }, [
      session.usuarioID,
      session.sessionID,
      session.comisionID,
    ]);

  useEffect(() => {
    cargarTrabajos();
  }, [cargarTrabajos]);

  return (
    <ScrollView
      contentContainerStyle={
        styles.content
      }
    >
      {session.rol === "instructor" && (
        <FormularioTrabajo
          onCreado={cargarTrabajos}
        />
      )}

      {mensaje ? (
        <Text style={styles.mensaje}>
          {mensaje}
        </Text>
      ) : null}

      {trabajos.map(
        (trabajo) => (
          <TrabajoCard
            key={trabajo.id}
            trabajo={trabajo}
          />
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 30,
  },

  mensaje: {
    textAlign: "center",
    margin: 20,
  },
});