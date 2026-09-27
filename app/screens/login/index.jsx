import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import AuthLayout from "../../components/AuthLayout";
import AuthSide from "../../components/AuthSide";
import Button from "../../components/Button";
import Input from "../../components/Input";
import AlertaModal from "../../components/AlertaModal";

import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

import { useSession } from "../../context/SessionContext";

import { login } from "../../services/auth-service";
import { irOtp } from "../../services/navigation-service";
import { iniciarSesion } from "../../services/session";


// ==========================================
// FORMATEAR MENSAJE DE BLOQUEO
// ==========================================

function formatearMensajeBloqueo(mensaje) {

  if (!mensaje) {
    return "Ha ocurrido un error.";
  }


  // Busca un número seguido de "minuto(s)"
  //
  // Ejemplo:
  //
  // "Intente de nuevo en 4 minuto(s)."
  //
  // obtiene:
  //
  // 4

  const coincidencia =
    mensaje.match(
      /(\d+)\s*minuto\(s\)/
    );


  // Si no encuentra el formato esperado,
  // mostramos directamente el mensaje
  // que vino del backend.

  if (!coincidencia) {
    return mensaje;
  }


  const minutos =
    Number(coincidencia[1]);


  // Si queda solamente 1:
  //
  // 1 minuto
  //
  // Si quedan 2, 3, 4...:
  //
  // 2 minutos

  const palabraMinuto =
    minutos === 1
      ? "minuto"
      : "minutos";


  return mensaje.replace(
    /(\d+)\s*minuto\(s\)/,
    `${minutos} ${palabraMinuto}`
  );

}


export default function LoginScreen() {

  const { setSession } = useSession();


  const [correo, setCorreo] =
    useState("");


  const [contrasena, setContrasena] =
    useState("");


  const [mostrarAlerta, setMostrarAlerta] =
    useState(false);


  const [tipoAlerta, setTipoAlerta] =
    useState("error");


  const [tituloAlerta, setTituloAlerta] =
    useState("");


  const [mensajeAlerta, setMensajeAlerta] =
    useState("");


  // ==========================================
  // LOGIN
  // ==========================================

  async function iniciarSesionClick() {


    // ========================================
    // CAMPOS VACÍOS
    // ========================================

    if (
      !correo.trim() ||
      !contrasena.trim()
    ) {

      setTipoAlerta(
        "camposObligatorios"
      );


      setTituloAlerta(
        "Campos Obligatorios"
      );


      setMensajeAlerta(
        "Todos los campos del formulario son obligatorios"
      );


      setMostrarAlerta(true);


      return;

    }


    // ========================================
    // LOGIN
    // ========================================

    const respuesta =
      await login(
        correo,
        contrasena
      );

      // ==========================================
// ERROR DE CONEXIÓN
// ==========================================

if (respuesta.conexionError) {

  setTipoAlerta("error");

  setTituloAlerta("Error");

  setMensajeAlerta(
    "No se pudo iniciar la sesión, vuelva a intentarlo más tarde"
  );

  setMostrarAlerta(true);

  return;

}

    console.log(
      "📨 Resultado login:",
      respuesta
    );


    // ========================================
    // LOGIN CORRECTO
    // ========================================

if (respuesta.ok) {

  iniciarSesion(
    respuesta,
    setSession
  );


  setTipoAlerta(
    "exito"
  );


  setTituloAlerta(
    "Autenticación exitosa"
  );


  setMensajeAlerta(
    "¡Haz iniciado sesión correctamente!"
  );


  setMostrarAlerta(true);


  // Mostramos el mensaje durante
  // un momento y luego continuamos
  // con el OTP.

  setTimeout(() => {

    setMostrarAlerta(false);

    irOtp();

  }, 1500);


  return;

}


    // ========================================
    // BLOQUEO / ERROR FINAL
    // ========================================

    if (
      respuesta.tipo === "error" ||
      respuesta.tipo === "errorLogin"
    ) {

      setTipoAlerta(
        "error"
      );


      setTituloAlerta(
        "Error"
      );


      // ======================================
      // MENSAJE DE BLOQUEO
      // ======================================
      //
      // El backend controla el tiempo.
      //
      // Ejemplo:
      //
      // "Ha excedido el límite de intentos.
      //  Intente de nuevo en 4 minuto(s)."
      //
      // La APK solamente cambia:
      //
      // 1 minuto(s) → 1 minuto
      // 4 minuto(s) → 4 minutos

      setMensajeAlerta(
        formatearMensajeBloqueo(
          respuesta.mensaje
        )
      );


      setMostrarAlerta(true);


      return;

    }


    // ========================================
    // PRIMER / SEGUNDO INTENTO
    // ========================================

    if (
      respuesta.tipo === "aviso"
    ) {

      setTipoAlerta(
        "aviso"
      );


      setTituloAlerta(
        "Error"
      );


      const intentos =
        respuesta.intentos;


      const palabraIntento =
        intentos === 1
          ? "intento"
          : "intentos";


      setMensajeAlerta(

        `Correo y/o Contraseña son incorrectos. Te quedan ${intentos} ${palabraIntento}.`

      );


      setMostrarAlerta(true);


      return;

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


      <AlertaModal

        visible={mostrarAlerta}

        titulo={tituloAlerta}

        mensaje={mensajeAlerta}

        tipo={tipoAlerta}

         mostrarBoton={
          tipoAlerta !== "exito"
        }

        onAceptar={() =>
          setMostrarAlerta(false)
        }

      />

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

    fontSize:
      TYPOGRAPHY.body,

    color:
      COLORS.text,

    textAlign:
      "center",

    marginBottom:
      2,

  },


  titulo: {

    fontSize:
      TYPOGRAPHY.h2,

    fontWeight:
      "bold",

    color:
      COLORS.primary,

    textAlign:
      "center",

    marginBottom:
      SPACING.xs,

  },


  subtitulo: {

    fontSize:
      TYPOGRAPHY.small,

    color:
      COLORS.text,

    textAlign:
      "center",

    marginBottom:
      SPACING.xxl,

  },


  form: {

    width:
      "100%",

  },


  label: {

    fontSize:
      TYPOGRAPHY.small,

    color:
      COLORS.text,

    marginBottom:
      SPACING.xs,

  },

});