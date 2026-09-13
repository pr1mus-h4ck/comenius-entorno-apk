import {
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TrabajoAlumno from "./TrabajoAlumno";
import TrabajoInstructor from "./TrabajoInstructor";
import TrabajoChat from "./TrabajoChat";
import EntregaTrabajo from "./EntregaTrabajo";

import {
  useSessionService,
} from "../../../services/session-service";

export default function Trabajo() {
  const {
    session,
    actualizarCampo,
  } = useSessionService();

  function volver() {
    if (
      session.rol === "instructor"
    ) {
      // Si estamos viendo el trabajo
      // de un alumno, volvemos a
      // la lista de alumnos.
      actualizarCampo(
        "alumno",
        null
      );

      actualizarCampo(
        "listaAlumno",
        null
      );

      return;
    }

    // Alumno:
    // vuelve a la lista de trabajos.
    actualizarCampo(
      "trabajo",
      null
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.botonVolver}
        onPress={volver}
      >
        <Text style={styles.textoVolver}>
          ← Volver
        </Text>
      </Pressable>

      <ScrollView>
        {session.rol ===
        "instructor" ? (
          <>
            <TrabajoInstructor />

            <TrabajoAlumno />

            <TrabajoChat />
          </>
        ) : (
          <>
            <TrabajoAlumno />

            <EntregaTrabajo />

            <TrabajoChat />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  botonVolver: {
    alignSelf: "flex-start",
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
  },

  textoVolver: {
    fontWeight: "bold",
    color: "#2563EB",
  },
});