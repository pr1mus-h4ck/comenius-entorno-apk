import { useState } from "react";

import {
  StyleSheet,
} from "react-native";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import AlertaModal from "../../../components/AlertaModal";

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

  // ==========================================
  // PUBLICANDO
  // ==========================================

  const [
    publicando,
    setPublicando,
  ] = useState(false);

  // ==========================================
  // MODAL PUBLICACIÓN EXITOSA
  // ==========================================

  const [
    mostrarPublicacionExitosa,
    setMostrarPublicacionExitosa,
  ] = useState(false);

  // ==========================================
  // PUBLICAR
  // ==========================================

  async function publicar() {

    // ========================================
    // VALIDAR CONTENIDO
    // ========================================

    if (!contenido.trim()) {

      return;

    }

    // ========================================
    // VALIDAR SESIÓN
    // ========================================

    if (
      !session.usuarioID ||
      !session.sessionID ||
      !session.comisionID ||
      !session.instructorID
    ) {

      return;

    }

    // ========================================
    // EVITAR DOBLE CLICK
    // ========================================

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

      // ======================================
      // ERROR DE CONEXIÓN
      // ======================================

      if (
        respuesta.conexionError
      ) {

        return;

      }

      // ======================================
      // OTRO ERROR DEL BACK-END
      // ======================================

      if (!respuesta.ok) {

        return;

      }

      // ======================================
      // PUBLICACIÓN CREADA
      // ======================================

      setTitulo("");

      setContenido("");

      setMostrarPublicacionExitosa(
        true
      );

      // ======================================
      // ACTUALIZAR PUBLICACIONES
      // ======================================

      if (onPublicado) {
        onPublicado();
      }

      // ======================================
      // OCULTAR MENSAJE
      // ======================================

      setTimeout(() => {

        setMostrarPublicacionExitosa(
          false
        );

      }, 2000);

    } catch (error) {

      console.log(
        "❌ Error al crear publicación:",
        error
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

      {/* ================================== */}
      {/* PUBLICACIÓN EXITOSA */}
      {/* ================================== */}

      <AlertaModal

        visible={
          mostrarPublicacionExitosa
        }

        titulo="¡Muy Bien!"

        mensaje={
          "¡Se ha creado la\npublicación con éxito!"
        }

        tipo="exito"

        mostrarBoton={false}

        onAceptar={() =>
          setMostrarPublicacionExitosa(
            false
          )
        }

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