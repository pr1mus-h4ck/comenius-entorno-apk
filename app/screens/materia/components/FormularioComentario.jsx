import { useState } from "react";

import {
  Alert,
  StyleSheet,
} from "react-native";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import {
  crearComentario,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

export default function FormularioComentario({
  publicacionId,
  onComentado,
}) {
  const { session } =
    useSessionService();

  const [comentario, setComentario] =
    useState("");

  const [enviando, setEnviando] =
    useState(false);

  async function comentar() {
    if (!comentario.trim()) {
      Alert.alert(
        "Error",
        "El comentario no puede estar vacío."
      );

      return;
    }

    if (enviando) {
      return;
    }

    setEnviando(true);

    try {
      const respuesta =
        await crearComentario(
          session.usuarioID,
          session.sessionID,
          publicacionId,
          comentario.trim()
        );

      console.log(
        "✅ Comentario creado:",
        respuesta
      );

      if (!respuesta.ok) {
        Alert.alert(
          "Error",
          respuesta.mensaje ||
            "No se pudo crear el comentario."
        );

        return;
      }

      setComentario("");

      // 🔄 Actualizar inmediatamente
      // la lista de publicaciones
      if (onComentado) {
        await onComentado();
      }
    } catch (error) {
      console.log(
        "❌ Error al comentar:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo crear el comentario."
      );
    } finally {
      setEnviando(false);
    }
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
        title={
          enviando
            ? "Comentando..."
            : "Comentar"
        }
        onPress={comentar}
        disabled={enviando}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});