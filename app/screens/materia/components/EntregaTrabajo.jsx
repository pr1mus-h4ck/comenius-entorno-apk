import { useState } from "react";

import {
  Alert,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  crearTrabajosAlumnos,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

import CloudinaryPicker from "../../../components/CloudinaryPicker";

export default function EntregaTrabajo() {

  const [archivo, setArchivo] = useState(null);

  const { session } = useSessionService();

  // ==========================================
  // ENVIAR ENTREGA
  // ==========================================

  async function entregarTrabajo() {

    if (!archivo) {

      Alert.alert(
        "Atención",
        "Seleccioná un archivo antes de enviar."
      );

      return;

    }


    const respuesta = await crearTrabajosAlumnos(

      session.usuarioID,

      session.sessionID,

      session.comisionID,

      session.trabajo?.id,

      [archivo]

    );


    if (!respuesta.ok) {

      Alert.alert(
        "Error",
        respuesta.mensaje
      );

      return;

    }


    Alert.alert(
      "Éxito",
      "La entrega fue enviada correctamente."
    );

  }


  return (

    <View style={styles.card}>

      <Text style={styles.titulo}>

        Entregar Trabajo

      </Text>


      <CloudinaryPicker
        onUploaded={(archivoSubido) => {
          setArchivo(
            archivoSubido
          );
        }}
      />

      {archivo ? (
        <Text>
          Archivo:
          {" "}
          {archivo.name}
        </Text>
      ) : null}


      <Pressable

        style={styles.boton}

        onPress={entregarTrabajo}

      >

        <Text style={styles.textoBoton}>

          Enviar Entrega

        </Text>

      </Pressable>

    </View>

  );

}


const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFF",

    margin: 20,

    padding: 20,

    borderRadius: 12,

  },

  titulo: {

    fontSize: 18,

    fontWeight: "bold",

    marginBottom: 20,

  },

  botonArchivo: {

    backgroundColor: "#EEE",

    padding: 15,

    borderRadius: 8,

    alignItems: "center",

    marginBottom: 15,

  },

  boton: {

    backgroundColor: "#2563EB",

    padding: 15,

    borderRadius: 8,

    alignItems: "center",

  },

  textoBoton: {

    color: "#FFF",

    fontWeight: "bold",

  },

});