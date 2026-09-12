import { useState } from "react";

import {
  Alert,
  StyleSheet,
} from "react-native";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import {
  crearPublicacion,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

export default function FormularioPublicacion({
  onPublicado,
}) {
  const { session } =
    useSessionService();

  const [titulo, setTitulo] =
    useState("");

  const [contenido, setContenido] =
    useState("");

  const [publicando, setPublicando] =
    useState(false);

  async function publicar() {
    if (!contenido.trim()) {
      Alert.alert(
        "Error",
        "El contenido de la publicación es obligatorio."
      );

      return;
    }

    if (
      !session.usuarioID ||
      !session.sessionID ||
      !session.comisionID ||
      !session.instructorID
    ) {
      Alert.alert(
        "Error",
        "No se encontraron los datos del instructor."
      );

      return;
    }

    if (publicando) {
      return;
    }

    setPublicando(true);

    try {
      const respuesta =
        await crearPublicacion(
          session.usuarioID,
          session.sessionID,
          titulo.trim(),
          contenido.trim(),
          session.comisionID,
          session.instructorID
        );

      console.log(
        "✅ Respuesta crear publicación:",
        respuesta
      );

      if (!respuesta.ok) {
        Alert.alert(
          "Error",
          respuesta.mensaje ||
            "No se pudo crear la publicación."
        );

        return;
      }

      Alert.alert(
        "Publicación creada",
        "La publicación se creó correctamente."
      );

      setTitulo("");
      setContenido("");

      if (onPublicado) {
        onPublicado();
      }
    } catch (error) {
      console.log(
        "❌ Error al crear publicación:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo crear la publicación."
      );
    } finally {
      setPublicando(false);
    }
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
        title={
          publicando
            ? "Publicando..."
            : "Publicar"
        }
        onPress={publicar}
        disabled={publicando}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },

  contenido: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});