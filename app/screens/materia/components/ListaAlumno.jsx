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
  View,
} from "react-native";

import {
  obtenerAlumnos,
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
  RADIUS,
} from "../../../constants/radius";

import {
  TYPOGRAPHY,
} from "../../../constants/typography";


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
    useCallback(
      async () => {

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
            "✅ Alumnos:",
            respuesta.alumnos
          );


          // ====================================
          // ERROR DE CONEXIÓN
          // ====================================

          if (
            respuesta.conexionError
          ) {

            return;

          }


          // ====================================
          // OTRO ERROR
          // ====================================

          if (!respuesta.ok) {

            setAlumnos([]);

            Alert.alert(

              "Información",

              respuesta.mensaje ||
                "No se encontraron alumnos."

            );

            return;

          }


          setAlumnos(
            respuesta.alumnos || []
          );


        } catch (error) {

          console.log(
            "❌ Error cargando alumnos:",
            error
          );


          Alert.alert(

            "Error",

            "No se pudo cargar la lista de alumnos."

          );


        } finally {

          setCargando(false);

        }

      },

      [

        session.usuarioID,

        session.sessionID,

        session.comisionID,

        session.instructorID,

      ]

    );


  useEffect(() => {

    cargarAlumnos();

  }, [
    cargarAlumnos,
  ]);


  // ==========================================
  // SELECCIONAR ALUMNO
  // ==========================================

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


  // ==========================================
  // VOLVER A TRABAJOS
  // ==========================================

  function volverAListaTrabajos() {

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

    <View
      style={
        styles.container
      }
    >

      <Pressable

        style={
          styles.botonVolver
        }

        onPress={
          volverAListaTrabajos
        }

      >

        <Text
          style={
            styles.textoVolver
          }
        >

          ← Volver a trabajos

        </Text>

      </Pressable>


      <Text
        style={
          styles.titulo
        }
      >

        Lista de Usuarios Asignados

      </Text>


      {cargando ? (

        <Text
          style={
            styles.texto
          }
        >

          Cargando alumnos...

        </Text>

      ) : alumnos.length === 0 ? (

        <Text
          style={
            styles.texto
          }
        >

          No hay alumnos asignados a esta comisión.

        </Text>

      ) : (

        alumnos.map(
          (alumno) => (

            <Pressable

              key={
                alumno.id
              }

              style={
                styles.alumno
              }

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

    padding:
      SPACING.md,

  },


  botonVolver: {

    alignSelf:
      "flex-start",

    marginBottom:
      SPACING.lg,

    paddingVertical:
      SPACING.sm,

    paddingHorizontal:
      SPACING.md,

    borderRadius:
      RADIUS.md,

    backgroundColor:
      COLORS.surface,

  },


  textoVolver: {

    color:
      COLORS.primary,

    fontWeight:
      "bold",

  },


  titulo: {

    fontSize:
      TYPOGRAPHY.h2,

    fontWeight:
      "bold",

    color:
      COLORS.text,

    marginBottom:
      SPACING.lg,

  },


  alumno: {

    padding:
      SPACING.md,

    marginBottom:
      SPACING.sm,

    borderRadius:
      RADIUS.md,

    backgroundColor:
      COLORS.white,

    borderWidth: 1,

    borderColor:
      COLORS.border,

  },


  nombre: {

    fontSize:
      TYPOGRAPHY.body,

    color:
      COLORS.text,

  },


  texto: {

    fontSize:
      TYPOGRAPHY.body,

    color:
      COLORS.textSecondary,

  },

});