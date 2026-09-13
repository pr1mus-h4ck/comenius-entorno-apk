import { useEffect, useState } from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  irLogin,
  irMateria,
} from "../../../services/navigation-service";

import {
  useSessionService,
} from "../../../services/session-service";

import {
  actualizarListaComision,
  actualizarComision,
} from "../../../services/auth-service";

import Header from "../../../components/Header";

import { COLORS } from "../../../constants/colors";
import { RADIUS } from "../../../constants/radius";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

export default function ListaComision() {
  const [comisiones, setComisiones] = useState([]);

  const {
    session,
    actualizarSesion,
    limpiarSesion,
  } = useSessionService();

  useEffect(() => {
    async function cargar() {
      if (
        !session.usuarioID ||
        !session.sessionID ||
        !session.rol
      ) {
        return;
      }

      try {
        const respuesta =
          await actualizarListaComision(
            session.usuarioID,
            session.sessionID,
            session.rol
          );

        console.log(
          "✅ Respuesta comisiones:",
          respuesta
        );

        if (!respuesta.ok) {
          Alert.alert(
            "Sesión expirada",
            "La sesión ya no es válida. Iniciá sesión nuevamente."
          );

          await limpiarSesion();
          irLogin();

          return;
        }

        setComisiones(
          respuesta.comisiones || []
        );
      } catch (error) {
        console.log(
          "❌ Error al cargar comisiones:",
          error
        );

        Alert.alert(
          "Error",
          "No se pudieron obtener las comisiones."
        );
      }
    }

    cargar();
  }, [
    session.usuarioID,
    session.sessionID,
    session.rol,
  ]);

  async function ingresarComision(comision) {
    console.log(
      "➡️ Seleccionando comisión:",
      comision
    );

    try {
      const respuesta =
        await actualizarComision(
          session.usuarioID,
          session.sessionID,
          comision.Comision_ID,
          session.rol,
          session.instructorID
        );

      console.log(
        "✅ Comisión actualizada:",
        respuesta
      );

      if (!respuesta.ok) {
        Alert.alert(
          "Error",
          respuesta.mensaje ||
            "No se pudo cargar la comisión."
        );

        return;
      }

      const datosComision =
        Array.isArray(
          respuesta.comision
        )
          ? respuesta.comision[0]
          : respuesta.comision;

      if (!datosComision) {
        Alert.alert(
          "Error",
          "No se encontraron datos de la comisión."
        );

        return;
      }

      actualizarSesion({
        comision: datosComision,
        comisionID:
          comision.Comision_ID,
        enlace: "Portada",
        item: "Materia",
        trabajo: null,
        alumno: null,
        listaAlumno: null,
      });

      irMateria();
    } catch (error) {
      console.log(
        "❌ Error al seleccionar comisión:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo cargar la comisión."
      );
    }
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.lista}>
        {comisiones.map(
          (comision) => (
            <Pressable
              key={
                comision.Comision_ID
              }
              style={styles.comision}
              onPress={() =>
                ingresarComision(
                  comision
                )
              }
            >
              <Text
                style={styles.materia}
              >
                {comision.Materia}
              </Text>

              <Text
                style={
                  styles.comisionNombre
                }
              >
                {comision.Comision}
              </Text>

              <Text
                style={styles.horarios}
              >
                {comision.Horarios}
              </Text>
            </Pressable>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  lista: {
    padding: SPACING.md,
    gap: SPACING.md,
  },

  comision: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
  },

  materia: {
    ...TYPOGRAPHY.subtitle,
  },

  comisionNombre: {
    ...TYPOGRAPHY.body,
  },

  horarios: {
    ...TYPOGRAPHY.caption,
  },
});