import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  obtenerChat,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";


export default function TrabajoChat() {

  const [mensajes, setMensajes] = useState([]);

  const { session } = useSessionService();


  // ==========================================
  // OBTENER CHAT
  // ==========================================

  useEffect(() => {

    if (!session?.trabajo?.id) {
      return;
    }

    cargarMensajes();

  }, [

    session?.trabajo?.id,

    session?.listaAlumno,

  ]);


  async function cargarMensajes() {

    const respuesta = await obtenerChat(

      session.usuarioID,

      session.sessionID,

      session.trabajo.id,

      session.comisionID,

      session.listaAlumno,

      session.rol

    );


    if (!respuesta.ok) {

      console.log(
        "❌ Error:",
        respuesta.mensaje
      );

      return;

    }


    setMensajes(
      respuesta.mensajes
    );

  }


  return (

    <View style={styles.card}>

      <Text style={styles.titulo}>
        Chat
      </Text>


      {mensajes.map((mensaje, index) => (

        <View
          key={mensaje.id ?? index}
          style={styles.mensaje}
        >

          <Text style={styles.autor}>

            {mensaje.EmisorNombreCompleto}

          </Text>


          <Text>

            {mensaje.Contenido}

          </Text>


          <Text style={styles.fecha}>

            {mensaje.FechaHora}

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

  fecha: {

    fontSize: 12,

    color: "#888",

    marginTop: 5,

  },

});