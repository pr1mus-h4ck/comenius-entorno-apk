import { useEffect, useState } from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { useSessionService } from "../../../services/session-service";
import { obtenerAlumnos } from "../../../services/materia-service";

export default function ListaAlumno() {

  const {

    actualizarCampo,

  } = useSessionService();

  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {

    cargarAlumnos();

  }, []);

  async function cargarAlumnos() {

  const datos = await obtenerAlumnos();

  setAlumnos(datos);

}
  function seleccionarAlumno(alumno) {

    actualizarCampo("alumno", alumno);

  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>

        Lista de Usuarios Asignados

      </Text>

      {alumnos.map((alumno) => (

        <Pressable

          key={alumno.id}

          style={styles.card}

          onPress={() => seleccionarAlumno(alumno)}

        >

          <Text style={styles.nombre}>

            {alumno.Nombre}

          </Text>

        </Pressable>

      ))}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    padding: 20,

  },

  titulo: {

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 20,

  },

  card: {

    backgroundColor: "#FFF",

    padding: 18,

    borderRadius: 10,

    marginBottom: 12,

  },

  nombre: {

    fontSize: 16,

  },

});