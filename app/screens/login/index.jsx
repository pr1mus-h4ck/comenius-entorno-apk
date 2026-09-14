import { useState } from "react";

import {
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AuthLayout from "../../components/AuthLayout";
import AuthSide from "../../components/AuthSide";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

import { useSession } from "../../context/SessionContext";

import {
  login,
  enviarOtp,
} from "../../services/auth-service";
import { irOtp } from "../../services/navigation-service";
import { iniciarSesion } from "../../services/session";

export default function LoginScreen() {

  const { setSession } = useSession();

  const [correo, setCorreo] = useState("");

  const [contrasena, setContrasena] = useState("");


  // ==========================================
  // LOGIN
  // ==========================================

async function iniciarSesionClick() {
  try {
    const respuesta = await login(
      correo,
      contrasena
    );

    if (!respuesta.ok) {
      Alert.alert(
        "Error",
        respuesta.mensaje ||
          "No se pudo iniciar sesión."
      );

      return;
    }

    console.log(
      "✅ Login correcto:",
      respuesta
    );

    iniciarSesion(
      respuesta,
      setSession
    );

    const respuestaOtp = await enviarOtp(
      respuesta.usuarioID,
      respuesta.sessionID
    );

    console.log(
      "✅ Respuesta OTP:",
      respuestaOtp
    );

    if (!respuestaOtp.ok) {
      Alert.alert(
        "Error",
        respuestaOtp.mensaje ||
          "No se pudo enviar el código."
      );

      return;
    }

    setSession((anterior) => ({
      ...anterior,
      otpSolicitado: true,
    }));

    irOtp();

  } catch (error) {
    console.log(
      "❌ Error en login:",
      error
    );

    Alert.alert(
      "Error",
      "No se pudo conectar con el servidor."
    );
  }
}
  return (

    <AuthLayout

      left={

        <AuthSide />

      }

    >

      <View style={styles.container}>

        <Text style={styles.bienvenido}>
          ¡Bienvenido!
        </Text>

        <Text style={styles.titulo}>
          Inicia sesión
        </Text>

        <Text style={styles.subtitulo}>
          Usando tu cuenta de estudiante.
        </Text>


        <View style={styles.form}>

          <Text style={styles.label}>
            Correo Electrónico
          </Text>

          <Input
            placeholder="Ingresa tu correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />


          <Text style={styles.label}>
            Contraseña
          </Text>

          <Input
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
          />


          <Button
            title="Iniciar"
            onPress={iniciarSesionClick}
          />

        </View>

      </View>

    </AuthLayout>

  );
}


// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({

  container: {

    width: "100%",

    alignSelf: "center",

    alignItems: "center",

  },

  bienvenido: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.text,

    textAlign: "center",

    marginBottom: 2,

  },

  titulo: {

    fontSize: TYPOGRAPHY.h2,

    fontWeight: "bold",

    color: COLORS.primary,

    textAlign: "center",

    marginBottom: SPACING.xs,

  },

  subtitulo: {

    fontSize: TYPOGRAPHY.small,

    color: COLORS.text,

    textAlign: "center",

    marginBottom: SPACING.xxl,

  },

  form: {

    width: "100%",

  },

  label: {

    fontSize: TYPOGRAPHY.small,

    color: COLORS.text,

    marginBottom: SPACING.xs,

  },

});