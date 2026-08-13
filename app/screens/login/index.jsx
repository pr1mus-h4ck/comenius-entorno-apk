import { useState } from "react";

import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import AuthLayout from "../../components/AuthLayout";
import AuthSide from "../../components/AuthSide";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

import { useSession } from "../../context/SessionContext";

import { login } from "../../services/auth-service";
import { irOtp } from "../../services/navigation-service";
import { iniciarSesion } from "../../services/session";

export default function LoginScreen() {
  const { setSession } = useSession();

  // ==========================================
  // ESTADOS
  // ==========================================

  const [correo, setCorreo] = useState("");

  const [contrasena, setContrasena] = useState("");

  const [mostrarCredenciales, setMostrarCredenciales] = useState(false);

  // ==========================================
  // LOGIN
  // ==========================================

  async function iniciarSesionClick() {
    const respuesta = await login(correo, contrasena);

    if (respuesta.ok) {
      Alert.alert("Atención", respuesta.mensaje);

      //Guardamos la sesión
      iniciarSesion(respuesta, setSession);

      irOtp();
    }
  }

  // ==========================================
  // COPIAR CREDENCIAL
  // ==========================================

  async function copiarTexto(texto) {
    await Clipboard.setStringAsync(texto);
  }

  // ==========================================
  // PANTALLA DE CREDENCIALES
  // ==========================================

  if (mostrarCredenciales) {
    return (
      <AuthLayout
        left={
          <AuthSide
            title="¿Estás listo para ingresar a CVS?"
            subtitle="No olvides copiar las credenciales."
            buttonText="Ingresar"
            onPress={() => setMostrarCredenciales(false)}
          />
        }
      >
        <View style={styles.credencialesContainer}>
          {/* ==================================
              CORREO ALUMNO
          ================================== */}

          <Text style={styles.credencialTitulo}>Correo de Alumno</Text>

          <Text style={styles.credencialDato}>h1yhzo1z5w@ibolinva.com</Text>

          <Pressable
            style={styles.botonCredencial}
            onPress={() => copiarTexto("h1yhzo1z5w@ibolinva.com")}
          >
            <Text style={styles.textoBotonCredencial}>Copiar Correo</Text>
          </Pressable>

          {/* ==================================
              CORREO INSTRUCTOR
          ================================== */}

          <Text style={styles.credencialTitulo}>Correo de Instructor</Text>

          <Text style={styles.credencialDato}>ev1v4y5v7x@wvatxiy.com</Text>

          <Pressable
            style={styles.botonCredencial}
            onPress={() => copiarTexto("ev1v4y5v7x@wvatxiy.com")}
          >
            <Text style={styles.textoBotonCredencial}>Copiar Correo</Text>
          </Pressable>

          {/* ==================================
              CONTRASEÑA
          ================================== */}

          <Text style={styles.credencialTitulo}>Contraseña Genérica</Text>

          <Text style={styles.credencialDato}>54321</Text>

          <Pressable
            style={styles.botonCredencial}
            onPress={() => copiarTexto("54321")}
          >
            <Text style={styles.textoBotonCredencial}>Copiar Contraseña</Text>
          </Pressable>
        </View>
      </AuthLayout>
    );
  }

  // ==========================================
  // LOGIN
  // ==========================================

  return (
    <AuthLayout
      left={
        <AuthSide
          title="Credenciales de Ingreso"
          subtitle="¿Olvidaste tus credenciales?"
          buttonText="Visualizar"
          onPress={() => setMostrarCredenciales(true)}
        />
      }
    >
      <View style={styles.container}>
        {/* ==================================
            TITULO
        ================================== */}

        <Text style={styles.bienvenido}>¡Bienvenido!</Text>

        <Text style={styles.titulo}>Inicia sesión</Text>

        <Text style={styles.subtitulo}>Usando tu cuenta de estudiante.</Text>

        {/* ==================================
            FORMULARIO
        ================================== */}

        <View style={styles.form}>
          <Text style={styles.label}>Correo Electrónico</Text>

          <Input
            placeholder="Ingresa tu correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Contraseña</Text>

          <Input
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
          />

          <Button title="Iniciar" onPress={iniciarSesionClick} />
        </View>
      </View>
    </AuthLayout>
  );
}

// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({
  // ========================================
  // LOGIN
  // ========================================

  container: {
    width: "100%",

    maxWidth: 400,

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

  // ========================================
  // CREDENCIALES
  // ========================================

  credencialesContainer: {
    width: "100%",

    maxWidth: 450,

    alignSelf: "center",

    justifyContent: "center",
  },

  credencialTitulo: {
    fontSize: TYPOGRAPHY.h3,

    fontWeight: "bold",

    color: COLORS.primary,

    marginBottom: SPACING.xs,
  },

  credencialDato: {
    fontSize: TYPOGRAPHY.body,

    color: COLORS.text,

    marginBottom: SPACING.sm,
  },

  botonCredencial: {
    width: "100%",

    backgroundColor: COLORS.primary,

    borderRadius: 8,

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 12,

    marginBottom: SPACING.sm,
  },

  textoBotonCredencial: {
    color: COLORS.white,

    fontSize: TYPOGRAPHY.small,

    fontWeight: "bold",
  },
});
