import { useEffect, useState } from "react";

import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { irMateria } from "../../../services/navigation-service";
import { useSessionService } from "../../../services/session-service";

import {
  actualizarComision,
  actualizarListaComision,
  ingresarComision as ingresarComisionApi,
} from "../../../services/auth-service";

import Header from "../../../components/Header";

import { COLORS } from "../../../constants/colors";
import { RADIUS } from "../../../constants/radius";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

export default function ListaComision() {
  const [comisiones, setComisiones] = useState([]);

  const { session, actualizarCampo } = useSessionService();

  // ==========================================
  // OBTENER COMISIONES
  // ==========================================
  useEffect(() => {
    async function cargar() {
      const respuesta = await actualizarListaComision(
        session.usuarioID,
        session.sessionID,
        session.rol,
      );

      if (!respuesta.ok) {
        Alert.alert("Error", respuesta.mensaje);
        return;
      }

      console.log("✅ Comisiones recibidas:", respuesta.comisiones);

      setComisiones(respuesta.comisiones);
    }

    cargar();
  }, [session.usuarioID, session.sessionID, session.rol]);

  // ==========================================
  // INGRESAR A COMISION
  // ==========================================

  async function ingresarComision(comision) {
    console.log("➡️ Seleccionando comisión:", comision);

    const ingreso = await ingresarComisionApi(comision, comision.Comision_ID);

    if (!ingreso.ok) {
      Alert.alert("Error", "No se pudo ingresar a la comisión.");
      return;
    }

    console.log("✅ Comisión ingresada:", comision.Comision_ID);

    const actualizada = await actualizarComision(
      session.usuarioID,
      session.sessionID,
      comision.Comision_ID,
      session.rol,
      session.instructorID,
    );

    if (!actualizada.ok) {
      Alert.alert(
        "Error",
        actualizada.mensaje || "No se pudo cargar la comisión.",
      );
      return;
    }

    console.log("✅ Comisión actualizada:", actualizada.comision);

    actualizarCampo("comision", actualizada.comision);

    actualizarCampo("comisionID", comision.Comision_ID);

    actualizarCampo("enlace", "Portada");

    irMateria();
  }

  return (
    <View style={styles.container}>
      <Header
        title="Mis Comisiones"
        subtitle="Seleccioná una comisión para ingresar."
      />

      {comisiones.map((comision) => (
        <Pressable
          key={comision.Comision_ID}
          style={styles.card}
          onPress={() => ingresarComision(comision)}
        >
          <Text style={styles.nombre}>{comision.Materia}</Text>

          <Text style={styles.detalle}>Comisión {comision.Comision}</Text>

          <Text style={styles.detalle}>Profesor: {comision.Instructores}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.background,

    padding: SPACING.xl,
  },

  card: {
    backgroundColor: COLORS.card,

    borderRadius: RADIUS.lg,

    padding: SPACING.xl,

    marginBottom: SPACING.lg,

    borderWidth: 1,

    borderColor: COLORS.border,
  },

  nombre: {
    fontSize: TYPOGRAPHY.h3,

    fontWeight: "bold",

    color: COLORS.primary,

    marginBottom: SPACING.sm,
  },

  detalle: {
    fontSize: TYPOGRAPHY.body,

    color: COLORS.textSecondary,

    marginTop: SPACING.xs,
  },
});
