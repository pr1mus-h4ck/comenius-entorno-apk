import { useState } from "react";

import {
  StyleSheet,
} from "react-native";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { crearPublicacion } from "../../../services/auth-service";
import { useSessionService } from "../../../services/session-service";

export default function FormularioPublicacion() {
  onPublicado,


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

      console.log(
        "❌ Error:",
        respuesta.mensaje
      );

      return;

    }


    console.log(
      "✅ Publicación creada:",
      respuesta.mensaje
    );


    setTitulo("");

    setContenido("");

    onPublicado?.();

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