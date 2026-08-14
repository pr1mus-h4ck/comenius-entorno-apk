import { useState } from "react";

import {
  StyleSheet,
} from "react-native";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { crearComentario } from "../../../services/auth-service";
import { useSessionService } from "../../../services/session-service";

export default function FormularioComentario({
  publicacionId,
}) {

  const { session } = useSessionService();

  const [comentario, setComentario] = useState("");


  // ==========================================
  // CREAR COMENTARIO
  // ==========================================

  async function comentar() {

    const respuesta = await crearComentario(

      session.usuarioID,

      session.sessionID,

      publicacionId,

      comentario

    );


    if (!respuesta.ok) {

      console.log(
        "❌ Error:",
        respuesta.mensaje
      );

      return;

    }


    console.log(
      "✅ Comentario creado:",
      respuesta.mensaje
    );


    setComentario("");

  }


  return (

    <Card style={styles.container}>

      <Input

        placeholder="Escribí un comentario..."

        value={comentario}

        onChangeText={setComentario}

        multiline

      />

      <Button

        title="Comentar"

        onPress={comentar}

      />

    </Card>

  );

}


const styles = StyleSheet.create({

  container: {

    marginTop: 10,

  },

});