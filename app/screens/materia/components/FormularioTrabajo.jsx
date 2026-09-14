import {
  Alert,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import { useState } from "react";

import {
  crearTrabajo as crearTrabajoApi,
} from "../../../services/auth-service";

import {
  useSessionService,
} from "../../../services/session-service";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { RADIUS } from "../../../constants/radius";

export default function FormularioTrabajo({
  onCreado,
}) {
  const [titulo, setTitulo] = useState("");

  const [contenido, setContenido] =
    useState("");

  const [archivo, setArchivo] =
    useState(null);

  const [creando, setCreando] =
    useState(false);

  const { session } =
    useSessionService();

  function seleccionarArchivo() {
    // Más adelante abrirá DocumentPicker.
    // Por ahora solamente dejamos preparado
    // el botón.

    console.log(
      "Seleccionar archivo"
    );
  }

  async function crearTrabajo() {
    if (!titulo.trim()) {
      Alert.alert(
        "Error",
        "El título del trabajo es obligatorio."
      );

      return;
    }

    if (!contenido.trim()) {
      Alert.alert(
        "Error",
        "El contenido del trabajo es obligatorio."
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
        "No se encontraron los datos de la sesión del instructor."
      );

      return;
    }

    if (creando) {
      return;
    }

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
          []
        );

      console.log(
        "✅ Respuesta crear trabajo:",
        respuesta
      );

      if (!respuesta.ok) {
        Alert.alert(
          "Error",
          respuesta.mensaje ||
            "No se pudo crear el trabajo."
        );

        return;
      }

      Alert.alert(
        "Trabajo creado",
        "El trabajo se creó correctamente."
      );

      setTitulo("");
      setContenido("");
      setArchivo(null);

      if (onCreado) {
        onCreado();
      }
    } catch (error) {
      console.log(
        "❌ Error al crear trabajo:",
        error
      );

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
        style={styles.contenido}
      />

      <Pressable
        style={styles.botonArchivo}
        onPress={seleccionarArchivo}
      >
        <Text style={styles.textoArchivo}>
          {archivo ||
            "Seleccionar archivo"}
        </Text>
      </Pressable>

      <Button
        title={
          creando
            ? "Creando..."
            : "Crear trabajo"
        }
        onPress={crearTrabajo}
        disabled={creando}
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
    textAlignVertical: "top",
  },

  botonArchivo: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    marginBottom: SPACING.lg,
  },

  textoArchivo: {
    color: COLORS.text,
  },
});