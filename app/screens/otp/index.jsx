import {
  useRef,
  useState,
} from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  enviarOtp,
  confirmarOtp,
} from "../../services/auth-service";

import {
  useSessionService,
} from "../../services/session-service";

import {
  irInicio,
} from "../../services/navigation-service";

import {
  COLORS,
} from "../../constants/colors";

import {
  SPACING,
} from "../../constants/spacing";

export default function OtpScreen() {
  const {
    session,
    actualizarSesion,
  } = useSessionService();

  const [
    codigo,
    setCodigo,
  ] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [
    enviandoOtp,
    setEnviandoOtp,
  ] = useState(false);

  const [
    confirmando,
    setConfirmando,
  ] = useState(false);

  const inputs =
    useRef([]);

  async function solicitarOtp() {
    if (
      !session.usuarioID ||
      !session.sessionID
    ) {
      Alert.alert(
        "Error",
        "No existe una sesión válida."
      );

      return;
    }

    if (enviandoOtp) {
      return;
    }

    setEnviandoOtp(true);

    try {
      const respuesta =
        await enviarOtp(
          session.usuarioID,
          session.sessionID
        );

      console.log(
        "✅ Respuesta OTP:",
        respuesta
      );

      if (!respuesta.ok) {
        Alert.alert(
          "Error",
          respuesta.mensaje ||
            "No se pudo enviar el código."
        );

        return;
      }

      actualizarSesion({
        otpSolicitado: true,
      });

      Alert.alert(
        "Código enviado",
        "Revisá el medio donde recibís el código OTP."
      );
    } catch (error) {
      console.log(
        "❌ Error enviando OTP:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo enviar el código."
      );
    } finally {
      setEnviandoOtp(false);
    }
  }

  function cambiarCodigo(
    valor,
    indice
  ) {
    const nuevoCodigo = [
      ...codigo,
    ];

    nuevoCodigo[indice] =
      valor.slice(-1);

    setCodigo(nuevoCodigo);

    if (
      valor &&
      indice < 5
    ) {
      inputs.current[
        indice + 1
      ]?.focus();
    }
  }

  async function confirmarCodigo() {
    const codigoCompleto =
      codigo.join("");

    if (
      codigoCompleto.length !== 6
    ) {
      Alert.alert(
        "Error",
        "Ingresá el código completo."
      );

      return;
    }

    if (confirmando) {
      return;
    }

    setConfirmando(true);

    try {
      const respuesta =
        await confirmarOtp(
          session.usuarioID,
          session.sessionID,
          codigoCompleto
        );

      console.log(
        "✅ Confirmación OTP:",
        respuesta
      );

      if (!respuesta.ok) {
        Alert.alert(
          "Error",
          respuesta.mensaje ||
            "El código ingresado no es válido."
        );

        return;
      }

      actualizarSesion({
        verificacion: true,
        otpSolicitado: false,
      });

      irInicio();
    } catch (error) {
      console.log(
        "❌ Error confirmando OTP:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo validar el código."
      );
    } finally {
      setConfirmando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>
          Verificación OTP
        </Text>

        <Text style={styles.descripcion}>
          Ingresá el código de 6 caracteres
          enviado para verificar tu identidad.
        </Text>

        <View style={styles.codigoContainer}>
          {codigo.map(
            (digito, indice) => (
              <TextInput
                key={indice}
                ref={(input) => {
                  inputs.current[
                    indice
                  ] = input;
                }}
                style={
                  styles.codigoInput
                }
                value={digito}
                onChangeText={(valor) =>
                  cambiarCodigo(
                    valor,
                    indice
                  )
                }
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={1}
                textAlign="center"
              />
            )
          )}
        </View>

        <Pressable
          style={[
            styles.boton,
            confirmando &&
              styles.botonDeshabilitado,
          ]}
          onPress={
            confirmarCodigo
          }
          disabled={confirmando}
        >
          <Text
            style={styles.textoBoton}
          >
            {confirmando
              ? "Verificando..."
              : "Confirmar código"}
          </Text>
        </Pressable>

        <Pressable
          style={
            styles.botonSecundario
          }
          onPress={solicitarOtp}
          disabled={enviandoOtp}
        >
          <Text
            style={
              styles.textoBotonSecundario
            }
          >
            {enviandoOtp
              ? "Enviando..."
              : "Solicitar código nuevamente"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: SPACING.lg,
    backgroundColor:
      COLORS.background,
  },

  card: {
    padding: SPACING.lg,
    borderRadius: 12,
    backgroundColor:
      COLORS.white,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },

  descripcion: {
    color:
      COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },

  codigoContainer: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginBottom: SPACING.lg,
  },

  codigoInput: {
    width: 42,
    height: 52,
    borderWidth: 1,
    borderColor:
      COLORS.border,
    borderRadius: 8,
    color: COLORS.text,
    fontSize: 20,
  },

  boton: {
    padding: SPACING.md,
    borderRadius: 8,
    backgroundColor:
      COLORS.primary,
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },

  textoBoton: {
    color: COLORS.white,
    fontWeight: "bold",
  },

  botonSecundario: {
    padding: SPACING.md,
    alignItems: "center",
  },

  textoBotonSecundario: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});