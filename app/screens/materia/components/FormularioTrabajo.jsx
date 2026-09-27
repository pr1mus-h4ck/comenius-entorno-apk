import {
  Alert,
  StyleSheet,
  Text,
} from "react-native";

import { useState } from "react";

import {
  crearTrabajo as crearTrabajoApi,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

import AlertaModal from "../../../components/AlertaModal";

import CloudinaryPicker from "../../../components/CloudinaryPicker";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { SPACING } from "../../../constants/spacing";

export default function FormularioTrabajo({
  onCreado,
}) {

  const [titulo, setTitulo] =
    useState("");

  const [contenido, setContenido] =
    useState("");

  const [archivo, setArchivo] =
    useState(null);

  // ==========================================
  // CREANDO TRABAJO
  // ==========================================

  const [creando, setCreando] =
    useState(false);

  // ==========================================
  // MODAL TRABAJO EXITOSO
  // ==========================================

  const [
    mostrarTrabajoExitoso,
    setMostrarTrabajoExitoso,
  ] = useState(false);

  const { session } =
    useSessionService();


  // ==========================================
  // CREAR TRABAJO
  // ==========================================

  async function crearTrabajo() {

    // ========================================
    // EVITAR DOBLE CLICK
    // ========================================

    if (creando) {
      return;
    }


    // ========================================
    // VALIDAR TÍTULO
    // ========================================

    if (!titulo.trim()) {

      Alert.alert(
        "Error",
        "El título del trabajo es obligatorio."
      );

      return;

    }


    // ========================================
    // VALIDAR CONTENIDO
    // ========================================

    if (!contenido.trim()) {

      Alert.alert(
        "Error",
        "El contenido del trabajo es obligatorio."
      );

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

      Alert.alert(
        "Error",
        "No se encontraron los datos de la sesión del instructor."
      );

      return;

    }


    // ========================================
    // COMENZAR PROCESO
    // ========================================

    setCreando(true);


    try {

      const respuesta =
        await crearTrabajoApi(

          session.usuarioID,

          session.sessionID,

          titulo.trim(),

          contenido.trim(),

          session.comisionID,

          session.instructorID,

          archivo
            ? [archivo]
            : []

        );


      console.log(
        "✅ Respuesta crear trabajo:",
        respuesta
      );


      // ======================================
      // ERROR DE CONEXIÓN
      // ======================================

      if (
        respuesta.conexionError
      ) {

        // No mostramos ningún mensaje
        // de éxito.
        //
        // El auth-service ya dispara
        // la alerta global de conexión.

        return;

      }


      // ======================================
      // OTRO ERROR DEL BACKEND
      // ======================================

      if (!respuesta.ok) {

        Alert.alert(
          "Error",
          respuesta.mensaje ||
          "No se pudo crear el trabajo."
        );

        return;

      }


      // ======================================
      // TRABAJO CREADO CORRECTAMENTE
      // ======================================

      setTitulo("");

      setContenido("");

      setArchivo(null);


      // Mostrar ventana verde

      setMostrarTrabajoExitoso(
        true
      );


      // Actualizar lista de trabajos

      if (onCreado) {

        onCreado();

      }


      // ======================================
      // OCULTAR MODAL DESPUÉS DE 2 SEGUNDOS
      // ======================================

      setTimeout(() => {

        setMostrarTrabajoExitoso(
          false
        );

      }, 2000);


    } catch (error) {

      console.log(
        "❌ Error al crear trabajo:",
        error
      );

      // Si llegamos acá por una excepción
      // que no fue manejada por el servicio,
      // mostramos el error normal.

      Alert.alert(
        "Error",
        "No se pudo crear el trabajo."
      );


    } finally {

      setCreando(false);

    }

  }


  return (

    <Card style={styles.container}>

      <Input

        placeholder="Título"

        value={titulo}

        onChangeText={setTitulo}

      />


      <Input

        placeholder="Contenido"

        value={contenido}

        onChangeText={setContenido}

        multiline

        style={
          styles.contenido
        }

      />


      <CloudinaryPicker

        onUploaded={
          setArchivo
        }

      />


      {archivo && (

        <Text
          style={
            styles.archivo
          }
        >

          {archivo.name}

        </Text>

      )}


      <Button

        title={

          creando

            ? "Creando..."

            : "Crear trabajo"

        }

        onPress={
          crearTrabajo
        }

        disabled={
          creando
        }

      />


      {/* ================================== */}
      {/* TRABAJO CREADO EXITOSAMENTE */}
      {/* ================================== */}

      <AlertaModal

        visible={
          mostrarTrabajoExitoso
        }

        titulo="¡Muy Bien!"

        mensaje={
          "¡Se ha creado el\ntrabajo con éxito!"
        }

        tipo="exito"

        mostrarBoton={false}

        onAceptar={() =>
          setMostrarTrabajoExitoso(
            false
          )
        }

      />

    </Card>

  );

}


const styles = StyleSheet.create({

  container: {

    margin: SPACING.md,

  },


  contenido: {

    minHeight: 120,

    textAlignVertical:
      "top",

  },


  archivo: {

    marginBottom:
      SPACING.lg,

  },

});