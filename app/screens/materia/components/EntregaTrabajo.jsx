import { useState } from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function EntregaTrabajo() {

  const [archivo, setArchivo] = useState(null);

  function seleccionarArchivo() {

    // Más adelante:
    // Expo Document Picker

    console.log("Seleccionar archivo");

  }

  function entregarTrabajo() {

    console.log({

      archivo,

    });

  }

  return (

    <View style={styles.card}>

      <Text style={styles.titulo}>

        Entregar Trabajo

      </Text>

      <Pressable

        style={styles.botonArchivo}

        onPress={seleccionarArchivo}

      >

        <Text>

          {archivo ?? "Seleccionar archivo"}

        </Text>

      </Pressable>

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