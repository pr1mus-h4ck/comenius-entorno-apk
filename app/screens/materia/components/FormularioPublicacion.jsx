import { useState } from "react";

import {
  Alert,
  StyleSheet,
} from "react-native";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { useSessionService } from "../../../services/session-service";

import {
  crearPublicacion,
} from "../../../services/auth-service";

import { SPACING } from "../../../constants/spacing";

export default function FormularioPublicacion() {

  const [titulo, setTitulo] = useState("");

  const [contenido, setContenido] = useState("");

  const {
    session,
  } = useSessionService();


  // ==========================================
  // CREAR PUBLICACIÓN
  // ==========================================

  async function publicar() {

    const respuesta = await crearPublicacion(

      session.usuarioID,

      session.sessionID,

      titulo,

      contenido,

      session.comisionID,

      session.instructorID

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
      "La publicación fue creada correctamente."
    );


    setTitulo("");

    setContenido("");

  }


  return (

    <Card style={styles.container}>

      <Input

        placeholder="Título (opcional)"

        value={titulo}

        onChangeText={setTitulo}

      />

      <Input

        placeholder="Contenido"

        value={contenido}

        onChangeText={setContenido}

        multiline

        style={styles.contenido}

      />

      <Button

        title="Publicar"

        onPress={publicar}

      />

    </Card>

  );

}


const styles = StyleSheet.create({

  container: {

    backgroundColor: "#FFFFFF",

    margin: 20,

    padding: 20,

    borderRadius: 12,

  },

  contenido: {

    minHeight: 100,

  },

});