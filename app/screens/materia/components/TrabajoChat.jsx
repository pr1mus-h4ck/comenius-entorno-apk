import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { obtenerChat } from "../../../services/materia-service";

export default function TrabajoChat() {

  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {

    cargarMensajes();

  }, []);

  async function cargarMensajes() {

  const datos = await obtenerChat();

  setMensajes(datos);

}

  return (

    <View style={styles.card}>

      <Text style={styles.titulo}>
        Chat
      </Text>

      {mensajes.map((mensaje) => (

        <View
          key={mensaje.id}
          style={styles.mensaje}
        >

          <Text style={styles.autor}>
            {mensaje.autor}
          </Text>

          <Text>
            {mensaje.mensaje}
          </Text>

        </View>

      ))}

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

    marginBottom: 15,

  },

  mensaje: {

    marginBottom: 15,

    borderBottomWidth: 1,

    borderBottomColor: "#EEE",

    paddingBottom: 10,

  },

  autor: {

    fontWeight: "bold",

    marginBottom: 4,

  },

});