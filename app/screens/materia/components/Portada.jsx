import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { obtenerPortada } from "../../../services/auth-service";
import { useSessionService } from "../../../services/session-service";

import Card from "../../../components/Card";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { TYPOGRAPHY } from "../../../constants/typography";

export default function Portada() {

  const [portada, setPortada] = useState([]);

  const { session } = useSessionService();


  // ==========================================
  // OBTENER PORTADA
  // ==========================================

useEffect(() => {
  async function cargarPortada() {
    if (
      !session.usuarioID ||
      !session.sessionID ||
      !session.comisionID
    ) {
      return;
    }

    const respuesta = await obtenerPortada(
      session.usuarioID,
      session.sessionID,
      session.comisionID
    );

    if (!respuesta.ok) {
      console.log(
        "❌ Error:",
        respuesta.mensaje
      );
      return;
    }

    console.log(
      "✅ Portada recibida:",
      respuesta.portada
    );

    setPortada(respuesta.portada || []);
  }

  cargarPortada();
}, [
  session.usuarioID,
  session.sessionID,
  session.comisionID,
]);


  return (

    <View>

      {portada.map((item, index) => (

        <Card
          key={index}
          style={styles.card}
        >

          <Text style={styles.titulo}>
            Objetivos
          </Text>

          <Text style={styles.texto}>
            {item.Objetivo}
          </Text>

          <Text style={styles.titulo}>
            Evaluación de la cursada
          </Text>

          <Text style={styles.texto}>
            {item.EvaluacionCursada}
          </Text>

        </Card>

      ))}

    </View>

  );

}


const styles = StyleSheet.create({

  card: {

    marginHorizontal: SPACING.md,

  },

  titulo: {

    fontSize: TYPOGRAPHY.h3,

    fontWeight: "bold",

    color: COLORS.primaryDark,

    marginTop: SPACING.md,

    marginBottom: SPACING.sm,

  },

  texto: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.text,

    lineHeight: 22,

  },

});