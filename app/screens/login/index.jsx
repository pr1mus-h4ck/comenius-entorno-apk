import { useState } from "react";

import {
  StyleSheet,
  Text,
  View
} from "react-native";

import Button from "../../components/Button";

import Input from "../../components/Input";

import Card from "../../components/Card";

import AuthLayout from "../../components/AuthLayout";

import AuthSide from "../../components/AuthSide";

import { COLORS } from "../../constants/colors";

import { SPACING } from "../../constants/spacing";

import { TYPOGRAPHY } from "../../constants/typography";

import { RADIUS } from "../../constants/radius";

import { useSession } from "../../context/SessionContext";

import { iniciarSesion } from "../../services/session";

import { login } from "../../services/auth-service";

import { irOtp } from "../../services/navigation-service";

export default function LoginScreen() {

  // ==========================
  // Hooks
  // ==========================

  const { setSession } = useSession();

  // ==========================
  // Estados
  // ==========================

  const [correo, setCorreo] = useState("");

  const [contrasena, setContrasena] = useState("");

  // ==========================
  // Login
  // ==========================

  async function iniciarSesionClick() {

    const respuesta = await login(
      correo,
      contrasena
    );

    if (respuesta.ok) {

      iniciarSesion(
        respuesta,
        setSession
      );

      // Por ahora siempre pasa a OTP
      irOtp();

    }

  }

  // ==========================
  // Render
  // ==========================

return (

  <AuthLayout

    left={

      <AuthSide

        title="Credenciales de ingreso"

        subtitle="¿Olvidaste tus credenciales?"

        buttonText="Visualizar"

        onPress={() => {}}

      />

    }

  >

    <Text style={styles.bienvenido}>
      ¡Bienvenido!
    </Text>

    <Text style={styles.titulo}>
      Iniciar sesión
    </Text>

    <Text style={styles.subtitulo}>
      Usando tu cuenta de estudiante.
    </Text>

    <Input
      placeholder="Correo electrónico"
      value={correo}
      onChangeText={setCorreo}
    />

    <Input
      placeholder="Contraseña"
      secureTextEntry
      value={contrasena}
      onChangeText={setContrasena}
    />

    <Button
      title="Iniciar sesión"
      onPress={iniciarSesionClick}
    />

  </AuthLayout>

);
}

const styles = StyleSheet.create({

  container: {

  flex: 1,

  justifyContent: "center",

  alignItems: "center",

  padding: SPACING.xxl,

  backgroundColor: COLORS.background,

},

  card: {

  backgroundColor: COLORS.card,

  borderRadius: RADIUS.md,

  padding: SPACING.xl,

  marginBottom: SPACING.lg,

  borderWidth: 1,

  borderColor: COLORS.border,

  width: "100%",

  alignSelf: "center",

},

  bienvenido: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.textSecondary,

    marginBottom: SPACING.xs,

  },

  titulo: {

    fontSize: TYPOGRAPHY.title,

    fontWeight: "bold",

    color: COLORS.text,

    marginBottom: SPACING.sm,

  },

  subtitulo: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.textSecondary,

    marginBottom: SPACING.xxl,

  },

});