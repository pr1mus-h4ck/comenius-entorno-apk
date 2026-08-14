import { useRef, useState } from "react";
import { Alert } from "react-native";

import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import AuthLayout from "../../components/AuthLayout";
import AuthSide from "../../components/AuthSide";

import { irLogin } from "../../services/navigation-service";

import { COLORS } from "../../constants/colors";
import { RADIUS } from "../../constants/radius";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";


import { useSessionService } from "../../services/session-service";

import {
  enviarOtp
} from "../../services/auth-service";



export default function OtpScreen() {

  const { session, actualizarSesion, } = useSessionService();

  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const [codigo, setCodigo] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputs = useRef([]);

  async function enviarCodigo() {

    const respuesta = await enviarOtp(
      session.usuarioID,
      session.sessionID
    );

    if (!respuesta.ok) {

      Alert.alert(
        "Error",
        respuesta.mensaje
      );

      return;
    }

    setCodigoEnviado(true);
  }

  function cambiarCodigo(valor, indice) {

    const nuevoCodigo = [...codigo];

    nuevoCodigo[indice] = valor;

    setCodigo(nuevoCodigo);

    if (valor && indice < 5) {
      inputs.current[indice + 1]?.focus();
    }

  }

  async function confirmarCodigo() {

    const codigoCompleto = codigo.join("");

    const respuesta = await confirmarOtp(
      session.usuarioID,
      session.sessionID,
      codigoCompleto
    );

    if (!respuesta.ok) {

      Alert.alert(
        "Error",
        respuesta.mensaje
      );

      return;
    }

    actualizarSesion({
      verificacion: respuesta.verificacion,
      rol: respuesta.rol,
      nombre: respuesta.nombre,
      instructorID: respuesta.instructorID,
    });

    irInicio();
  }

  return (

    <AuthLayout

      left={

        <AuthSide

          title="¿Te arrepentiste?"

          subtitle='Haz click en "Cancelar" para volver al inicio.'

          buttonText="Cancelar"

          onPress={irLogin}

        />

      }

    >

      {!codigoEnviado ? (

        <>

          <Text style={styles.paso}>
            Paso 1/2
          </Text>

          <Text style={styles.titulo}>
            OTP Verificación
          </Text>

          <Text style={styles.descripcion}>
            Te enviaremos un código al siguiente correo.
          </Text>

          <Text style={styles.correo}>
            usuario@correo.com
          </Text>

          <Pressable
            style={styles.boton}
            onPress={enviarCodigo}
          >

            <Text style={styles.textoBoton}>
              Continuar
            </Text>

          </Pressable>

        </>

      ) : (

        <>

          <Text style={styles.paso}>
            Paso 2/2
          </Text>

          <Text style={styles.titulo}>
            Confirmar código
          </Text>

          <Text style={styles.descripcion}>
            Ingresá el código recibido.
          </Text>

          <View style={styles.codigoContainer}>

            {codigo.map((digito, indice) => (

              <TextInput

                key={indice}

                ref={(input) => {
                  inputs.current[indice] = input;
                }}

                style={styles.codigoInput}

                value={digito}

                onChangeText={(valor) =>
                  cambiarCodigo(valor, indice)
                }

                keyboardType="number-pad"

                maxLength={1}

                textAlign="center"

              />

            ))}

          </View>

          <Pressable

            style={styles.boton}

            onPress={confirmarCodigo}

          >

            <Text style={styles.textoBoton}>
              Confirmar
            </Text>

          </Pressable>

        </>

      )}

    </AuthLayout>

  );

}

const styles = StyleSheet.create({

  paso: {

    fontSize: TYPOGRAPHY.small,

    color: COLORS.textSecondary,

    marginBottom: SPACING.xs,

    textAlign: "center",

  },

  titulo: {

    fontSize: TYPOGRAPHY.h1,

    fontWeight: "bold",

    color: COLORS.primary,

    textAlign: "center",

    marginBottom: SPACING.sm,

  },

  descripcion: {

    fontSize: TYPOGRAPHY.body,

    color: COLORS.text,

    textAlign: "center",

    marginBottom: SPACING.lg,

  },

  correo: {

    fontSize: TYPOGRAPHY.body,

    fontWeight: "bold",

    color: COLORS.primary,

    textAlign: "center",

    backgroundColor: COLORS.surface,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: RADIUS.md,

    padding: SPACING.md,

    marginBottom: SPACING.xl,

  },

  boton: {

    backgroundColor: COLORS.primary,

    borderRadius: RADIUS.md,

    padding: SPACING.lg,

    alignItems: "center",

  },

  textoBoton: {

    color: COLORS.white,

    fontWeight: "bold",

    fontSize: TYPOGRAPHY.body,

  },

  codigoContainer: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: SPACING.xl,

  },

  codigoInput: {

    width: 48,

    height: 58,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: RADIUS.md,

    backgroundColor: COLORS.white,

    fontSize: TYPOGRAPHY.h2,

    color: COLORS.text,

  },

});