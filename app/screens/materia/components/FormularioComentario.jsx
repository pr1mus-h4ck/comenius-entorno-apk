import { useState } from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import AlertaModal from "../../../components/AlertaModal";

import {
  crearComentario,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

import {
  COLORS,
} from "../../../constants/colors";

import {
  SPACING,
} from "../../../constants/spacing";

export default function FormularioComentario({
  publicacion,
  onComentado,
}) {

  const { session } =
    useSessionService();

  const [
    comentario,
    setComentario,
  ] = useState("");

  // ==========================================
  // ESTADO COMENTANDO
  // ==========================================

  const [
    comentando,
    setComentando,
  ] = useState(false);

  // ==========================================
  // MODAL COMENTARIO EXITOSO
  // ==========================================

  const [
    mostrarComentarioExitoso,
    setMostrarComentarioExitoso,
  ] = useState(false);

  // ==========================================
  // COMENTAR
  // ==========================================

  async function comentar() {

    if (!comentario.trim()) {
      return;
    }

    if (comentando) {
      return;
    }

    if (
      !session.usuarioID ||
      !session.sessionID ||
      !publicacion?.id
    ) {
      return;
    }

    setComentando(true);

    try {

      const respuesta =
        await crearComentario(
          session.usuarioID,
          session.sessionID,
          publicacion.id,
          comentario.trim()
        );

      console.log(
        "✅ Respuesta crear comentario:",
        respuesta
      );

      // ======================================
      // ERROR DE CONEXIÓN
      // ======================================

      if (respuesta.conexionError) {
        return;
      }

      // ======================================
      // OTRO ERROR
      // ======================================

      if (!respuesta.ok) {
        return;
      }

      // ======================================
      // COMENTARIO CREADO
      // ======================================

      setComentario("");

      setMostrarComentarioExitoso(true);

      // Actualizar publicaciones/comentarios
      if (onComentado) {
        onComentado();
      }

      // ======================================
      // OCULTAR MODAL
      // ======================================

      setTimeout(() => {

        setMostrarComentarioExitoso(false);

      }, 2000);

    } catch (error) {

      console.log(
        "❌ Error al crear comentario:",
        error
      );

    } finally {

      setComentando(false);

    }

  }

  return (

    <View style={styles.container}>

      {/* ================================== */}
      {/* CAMPO DE COMENTARIO */}
      {/* ================================== */}

      <Input
        placeholder="Escribir comentario..."
        value={comentario}
        onChangeText={setComentario}
        style={styles.input}
      />

      {/* ================================== */}
      {/* BOTÓN ENVIAR */}
      {/* ================================== */}

      <Button
        title={
          comentando
            ? "Comentando..."
            : "Enviar"
        }
        onPress={comentar}
        disabled={comentando}
        style={styles.boton}
      />

      {/* ================================== */}
      {/* COMENTARIO EXITOSO */}
      {/* ================================== */}

      <AlertaModal
        visible={
          mostrarComentarioExitoso
        }

        titulo="¡Muy Bien!"

        mensaje={
          "¡Se ha enviado su\ncomentario con éxito!"
        }

        tipo="exito"

        mostrarBoton={false}

        onAceptar={() =>
          setMostrarComentarioExitoso(false)
        }
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    alignItems: "center",

    width: "100%",

    gap: SPACING.sm,

    marginTop: SPACING.md,

  },

  input: {

    flex: 1,

    width: undefined,

    marginBottom: 0,

  },

  boton: {

    flex: 0,

    width: 110,

    marginBottom: 0,

  },

});