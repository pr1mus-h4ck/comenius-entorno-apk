import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  obtenerAlumnos,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

export default function ListaAlumno() {
  const {
    session,
    actualizarCampo,
  } = useSessionService();

  const [
    alumnos,
    setAlumnos,
  ] = useState([]);

  const [
    cargando,
    setCargando,
  ] = useState(true);

  const cargarAlumnos =
    useCallback(async () => {
      if (
        !session.usuarioID ||
        !session.sessionID ||
        !session.comisionID ||
        !session.instructorID
      ) {
        return;
      }

      setCargando(true);

      try {
        const respuesta =
          await obtenerAlumnos(
            session.usuarioID,
            session.sessionID,
            session.comisionID,
            session.instructorID
          );

        console.log(
          "✅ Alumnos recibidos:",
          respuesta
        );

        setAlumnos(
          respuesta.alumnos || []
        );
      } catch (error) {
        console.log(
          "❌ Error alumnos:",
          error
        );

        setAlumnos([]);
      } finally {
        setCargando(false);
      }
    }, [
      session.usuarioID,
      session.sessionID,
      session.comisionID,
      session.instructorID,
    ]);

  useEffect(() => {
    cargarAlumnos();
  }, [cargarAlumnos]);

  function seleccionarAlumno(
    alumno
  ) {
    actualizarCampo(
      "listaAlumno",
      alumno.id
    );

    actualizarCampo(
      "alumno",
      alumno
    );
  }

  function volver() {
    actualizarCampo(
      "trabajo",
      null
    );

    actualizarCampo(
      "alumno",
      null
    );

    actualizarCampo(
      "listaAlumno",
      null
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.volver}
        onPress={volver}
      >
        <Text style={styles.volverTexto}>
          ← Volver a trabajos
        </Text>
      </Pressable>

      <Text style={styles.titulo}>
        Lista de Usuarios Asignados
      </Text>

      {cargando ? (
        <Text style={styles.texto}>
          Cargando alumnos...
        </Text>
      ) : alumnos.length === 0 ? (
        <Text style={styles.texto}>
          No hay alumnos asignados.
        </Text>
      ) : (
        alumnos.map(
          (alumno) => (
            <Pressable
              key={alumno.id}
              style={styles.alumno}
              onPress={() =>
                seleccionarAlumno(
                  alumno
                )
              }
            >
              <Text
                style={
                  styles.nombre
                }
              >
                {alumno.Nombre}
              </Text>
            </Pressable>
          )
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  volver: {
    alignSelf:
      "flex-start",

    marginBottom: 20,

    paddingVertical: 10,

    paddingHorizontal: 15,

    borderRadius: 8,

    backgroundColor:
      "#FFFFFF",

    borderWidth: 1,

    borderColor:
      "#DDDDDD",
  },

  volverTexto: {
    color:
      "#2563EB",

    fontWeight:
      "bold",
  },

  titulo: {
    fontSize: 22,

    fontWeight:
      "bold",

    marginBottom: 20,
  },

  texto: {
    fontSize: 16,
  },

  alumno: {
    padding: 15,

    marginBottom: 10,

    borderRadius: 8,

    backgroundColor:
      "#FFFFFF",

    borderWidth: 1,

    borderColor:
      "#DDDDDD",
  },

  nombre: {
    fontSize: 16,

    fontWeight:
      "500",
  },
});