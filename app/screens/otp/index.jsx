import { useRef, useState } from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AuthLayout from "../../components/AuthLayout";
import AuthSide from "../../components/AuthSide";
import ConfirmacionModal from "../../components/ConfirmacionModal";
import AlertaModal from "../../components/AlertaModal";

import {
  irLogin,
  irInicio,
} from "../../services/navigation-service";

import {
  useSessionService,
} from "../../services/session-service";

import {
  enviarOtp,
  confirmarOtp,
} from "../../services/auth-service";

import { COLORS } from "../../constants/colors";
import { RADIUS } from "../../constants/radius";
import { SPACING } from "../../constants/spacing";
import { TYPOGRAPHY } from "../../constants/typography";

function formatearMensajeBloqueo(
  mensaje
) {

  if (!mensaje) {
    return "Ha ocurrido un error.";
  }


  const coincidencia =
    mensaje.match(
      /(\d+)\s*minuto\(s\)/
    );


  if (!coincidencia) {
    return mensaje;
  }


  const minutos =
    Number(
      coincidencia[1]
    );


  const palabraMinuto =
    minutos === 1
      ? "minuto"
      : "minutos";


  return mensaje.replace(

    /(\d+)\s*minuto\(s\)/,

    `${minutos} ${palabraMinuto}`

  );

}


export default function OtpScreen() {

  const [
  cerrarSesionPorBloqueo,
  setCerrarSesionPorBloqueo,
] = useState(false);

  const {
    session,
    actualizarSesion,
    limpiarSesion,
  } = useSessionService();


  const [codigoEnviado, setCodigoEnviado] =
    useState(false);


  const [codigo, setCodigo] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

function aceptarAlertaOtp() {

  setMostrarAlerta(false);

  if (cerrarSesionPorBloqueo) {

    setCerrarSesionPorBloqueo(false);

    limpiarSesion();

    irLogin();

  }

}
  
// ==========================================
// ALERTA OTP
// ==========================================

const [
  mostrarAlerta,
  setMostrarAlerta,
] = useState(false);

const [
  tipoAlerta,
  setTipoAlerta,
] = useState("error");

const [
  tituloAlerta,
  setTituloAlerta,
] = useState("");

const [
  mensajeAlerta,
  setMensajeAlerta,
] = useState("");


  const inputs = useRef([]);


  // ==========================================
  // MODAL CANCELAR AUTENTICACIÓN
  // ==========================================

  const [
    mostrarConfirmacionCancelar,
    setMostrarConfirmacionCancelar,
  ] = useState(false);


  // ==========================================
  // MODAL SESIÓN FINALIZADA
  // ==========================================

  const [
    mostrarSesionFinalizada,
    setMostrarSesionFinalizada,
  ] = useState(false);

  const [
    mostrarErrorConexion,
    setMostrarErrorConexion,
  ] = useState(false);

  // ==========================================
  // MODAL ENVÍO OTP EXITOSO
  // ==========================================

  const [
    mostrarEnvioExitoso,
    setMostrarEnvioExitoso,
  ] = useState(false);


  // ==========================================
  // MODAL CONFIRMACIÓN OTP EXITOSA
  // ==========================================

  const [
    mostrarConfirmacionExitosa,
    setMostrarConfirmacionExitosa,
  ] = useState(false);


  // ==========================================
  // MOSTRAR CONFIRMACIÓN DE CANCELACIÓN
  // ==========================================

  function cancelarAutenticacion() {

    setMostrarConfirmacionCancelar(true);

  }


  // ==========================================
  // CONFIRMAR CANCELACIÓN
  // ==========================================

  function confirmarCancelar() {

    setMostrarConfirmacionCancelar(false);

    limpiarSesion();

    setMostrarSesionFinalizada(true);


    setTimeout(() => {

      setMostrarSesionFinalizada(false);

      irLogin();

    }, 1500);

  }


  // ==========================================
  // NO CANCELAR
  // ==========================================

  function noCancelar() {

    setMostrarConfirmacionCancelar(false);

  }

function aceptarErrorConexion() {

  setMostrarErrorConexion(false);

  limpiarSesion();

  irLogin();

  setMostrarSesionFinalizada(true);

  setTimeout(() => {

    setMostrarSesionFinalizada(false);

  }, 2000);

}


  // ==========================================
  // ENVIAR OTP
  // ==========================================

  async function enviarCodigo() {

    const respuesta =
      await enviarOtp(

        session.usuarioID,

        session.sessionID

      );


    // ========================================
    // ERROR DE CONEXIÓN
    // ========================================

    if (respuesta.conexionError) {

      setMostrarErrorConexion(true);

      return;

    }


    // ========================================
    // OTRO ERROR
    // ========================================

    if (!respuesta.ok) {

      Alert.alert(
        "Error",
        respuesta.mensaje
      );

      return;

    }


    // ========================================
    // ENVÍO EXITOSO
    // ========================================

    setMostrarEnvioExitoso(true);


    setTimeout(() => {

      setMostrarEnvioExitoso(false);

      setCodigoEnviado(true);

    }, 2000);

  }


  // ==========================================
  // CAMBIAR DIGITO
  // ==========================================

  function cambiarCodigo(valor, indice) {

    const nuevoCodigo = [...codigo];

    nuevoCodigo[indice] = valor;

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

  //
  //
  //

  function limpiarCodigo() {

  setCodigo([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

}


  // ==========================================
  // CONFIRMAR OTP
  // ==========================================

  async function confirmarCodigo() {

    const codigoCompleto =
      codigo.join("");


    // ========================================
    // VALIDACIÓN ANTES DEL FETCH
    // ========================================

if (!codigoCompleto) {

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


    if (
      codigoCompleto.length !== 6
    ) {

      Alert.alert(
        "Error",
        "Debe completar el código de 6 dígitos."
      );

      return;

    }


    // ========================================
    // FETCH
    // ========================================

    const respuesta =
      await confirmarOtp(

        session.usuarioID,

        session.sessionID,

        codigoCompleto

      );


    // ========================================
    // ERROR DE CONEXIÓN
    // ========================================

    if (respuesta.conexionError) {

      setMostrarErrorConexion(true);

      return;

    }

    // ========================================
// OTP INCORRECTO / BLOQUEO
// ========================================

if (!respuesta.ok) {

  // ======================================
  // USUARIO BLOQUEADO
  // ======================================

  if (
    respuesta.tipo === "errorConfirmar" ||
    (
      respuesta.mensaje &&
      respuesta.mensaje.includes(
        "Ha excedido el límite de intentos"
      )
    )
  ) {

    limpiarCodigo();

    setCerrarSesionPorBloqueo(true);

    setTipoAlerta("error");

    setTituloAlerta("Error");

    setMensajeAlerta(
      formatearMensajeBloqueo(
        respuesta.mensaje
      )
    );

    setMostrarAlerta(true);

    return;
  }


  // ======================================
  // CÓDIGO INCORRECTO
  // ======================================

  if (
    respuesta.intentos !== undefined &&
    respuesta.intentos !== null
  ) {

    const intentos =
      Number(respuesta.intentos);

    const palabraIntento =
      intentos === 1
        ? "intento"
        : "intentos";

    limpiarCodigo();

    setTipoAlerta("aviso");

    setTituloAlerta("Error");

    setMensajeAlerta(
      `El Código ingresado es incorrecto. Te quedan ${intentos} ${palabraIntento}.`
    );

    setMostrarAlerta(true);

    return;
  }


  // ======================================
  // OTRO ERROR
  // ======================================

  setTipoAlerta("error");

  setTituloAlerta("Error");

  setMensajeAlerta(
    respuesta.mensaje ||
      "No se pudo validar el código."
  );

  setMostrarAlerta(true);

  return;
}

    // ========================================
    // LOGIN COMPLETADO
    // ========================================

    actualizarSesion({

      verificacion:
        respuesta.verificacion,

      rol:
        respuesta.rol,

      nombre:
        respuesta.nombre,

      instructorID:
        respuesta.instructorID,

    });


    // ========================================
    // CONFIRMACIÓN EXITOSA
    // ========================================

    setMostrarConfirmacionExitosa(true);


    // Mostramos el mensaje durante
    // 2 segundos y después
    // vamos directamente a Inicio.

    setTimeout(() => {

      setMostrarConfirmacionExitosa(false);

      irInicio();

    }, 2000);

  }


return (

  <AuthLayout

    left={

      <AuthSide

        title="¿Te arrepentiste?"

        subtitle='Haz click en "Cancelar" para volver al inicio.'

        buttonText="Cancelar"

        onPress={
          cancelarAutenticacion
        }

      />

    }

  >

    {/* ================================== */}
    {/* CONTENIDO OTP */}
    {/* ================================== */}

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
          {session.correo}
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

          {codigo.map(
            (digito, indice) => (

              <TextInput

                key={indice}

                ref={(input) => {

                  inputs.current[indice] =
                    input;

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

                keyboardType="number-pad"

                maxLength={1}

                textAlign="center"

              />

            )
          )}

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


    {/* ================================== */}
    {/* MODAL CANCELAR AUTENTICACIÓN */}
    {/* ================================== */}

    <ConfirmacionModal

      visible={
        mostrarConfirmacionCancelar
      }

      titulo={
        "Estás a punto de\nCancelar el\nProceso de\nAutenticación"
      }

      mensaje={
        "¿Estás seguro/a de\nquerer Cancelar el\nProceso?"
      }

      textoConfirmar={
        "Sí, quiero Cancelar"
      }

      textoCancelar={
        "No, no quiero Cancelar"
      }

      onConfirmar={
        confirmarCancelar
      }

      onCancelar={
        noCancelar
      }

    />


    {/* ================================== */}
    {/* MODAL SESIÓN FINALIZADA */}
    {/* ================================== */}

    <AlertaModal

      visible={
        mostrarSesionFinalizada
      }

      titulo="Sesión Finalizada"

      mensaje={
        "¡Se ha Finalizado la\nSesión con Éxito!"
      }

      tipo="exito"

      mostrarBoton={false}

      onAceptar={() =>
        setMostrarSesionFinalizada(
          false
        )
      }

    />


    {/* ================================== */}
    {/* MODAL ENVÍO OTP EXITOSO */}
    {/* ================================== */}

    <AlertaModal

      visible={
        mostrarEnvioExitoso
      }

      titulo={
        "Se ha Enviado con\nÉxito"
      }

      mensaje={
        "¡Se ha Enviado el Correo\na tu Casilla de E-Mail con\nÉxito!"
      }

      tipo="exito"

      mostrarBoton={false}

      onAceptar={() =>
        setMostrarEnvioExitoso(
          false
        )
      }

    />


    {/* ================================== */}
    {/* MODAL CONFIRMACIÓN OTP EXITOSA */}
    {/* ================================== */}

    <AlertaModal

      visible={
        mostrarConfirmacionExitosa
      }

      titulo={
        "Se ha Confirmado\ncon Éxito"
      }

      mensaje={
        "¡Se ha Confirmado el\nCódigo que se te\nproporcionó a tu Casilla\nde E-Mail con Éxito!"
      }

      tipo="exito"

      mostrarBoton={false}

      onAceptar={() =>
        setMostrarConfirmacionExitosa(
          false
        )
      }

    />


    {/* ================================== */}
    {/* MODAL ERROR DE CONEXIÓN */}
    {/* ================================== */}

    <AlertaModal

      visible={
        mostrarErrorConexion
      }

      titulo="Error"

      mensaje={
        "No se pudo validar su identidad, vuelva intentarlo más tarde"
      }

      tipo="error"

      mostrarBoton={true}

      onAceptar={
        aceptarErrorConexion
      }

    />


    {/* ================================== */}
    {/* MODAL ERROR / INTENTOS OTP */}
    {/* ================================== */}

<AlertaModal
  visible={
    mostrarAlerta
  }

  titulo={
    tituloAlerta
  }

  mensaje={
    mensajeAlerta
  }

  tipo={
    tipoAlerta
  }

  mostrarBoton={true}

  onAceptar={
    aceptarAlertaOtp
  }
/>

  </AuthLayout>

);

}


const styles = StyleSheet.create({

  paso: {

    fontSize:
      TYPOGRAPHY.small,

    color:
      COLORS.textSecondary,

    marginBottom:
      SPACING.xs,

    textAlign:
      "center",

  },


  titulo: {

    fontSize:
      TYPOGRAPHY.h1,

    fontWeight:
      "bold",

    color:
      COLORS.primary,

    textAlign:
      "center",

    marginBottom:
      SPACING.sm,

  },


  descripcion: {

    fontSize:
      TYPOGRAPHY.body,

    color:
      COLORS.text,

    textAlign:
      "center",

    marginBottom:
      SPACING.lg,

  },


  correo: {

    fontSize:
      TYPOGRAPHY.body,

    fontWeight:
      "bold",

    color:
      COLORS.primary,

    textAlign:
      "center",

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius:
      RADIUS.md,

    padding:
      SPACING.md,

    marginBottom:
      SPACING.xl,

  },


  boton: {

    backgroundColor:
      COLORS.primary,

    borderRadius:
      RADIUS.md,

    padding:
      SPACING.lg,

    alignItems:
      "center",

  },


  textoBoton: {

    color:
      COLORS.white,

    fontWeight:
      "bold",

    fontSize:
      TYPOGRAPHY.body,

  },


  codigoContainer: {

    flexDirection:
      "row",

    justifyContent:
      "center",

    alignItems:
      "center",

    gap:
      SPACING.sm,

    marginBottom:
      SPACING.xl,

  },


  codigoInput: {

    width: 48,

    height: 58,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius:
      RADIUS.md,

    backgroundColor:
      COLORS.white,

    fontSize:
      TYPOGRAPHY.h2,

    color:
      COLORS.text,

    textAlign:
      "center",

    textAlignVertical:
      "center",

    padding: 0,

  },

});