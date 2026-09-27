import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";


export default function ConfirmacionModal({
  visible,
  titulo,
  mensaje,
  textoConfirmar,
  textoCancelar,
  onConfirmar,
  onCancelar,
}) {

  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancelar}
    >

      <View style={styles.overlay}>

        <View style={styles.contenedor}>

          <Text style={styles.titulo}>
            {titulo}
          </Text>


          <Text style={styles.mensaje}>
            {mensaje}
          </Text>


          {/* ========================= */}
          {/* CONFIRMAR */}
          {/* ========================= */}

          <Pressable
            style={({ pressed }) => [

              styles.boton,

              pressed &&
                styles.botonPresionado,

            ]}
            onPress={onConfirmar}
          >

            <Text style={styles.textoBoton}>
              {textoConfirmar}
            </Text>

          </Pressable>


          {/* ========================= */}
          {/* CANCELAR */}
          {/* ========================= */}

          <Pressable
            style={({ pressed }) => [

              styles.boton,

              pressed &&
                styles.botonPresionado,

            ]}
            onPress={onCancelar}
          >

            <Text style={styles.textoBoton}>
              {textoCancelar}
            </Text>

          </Pressable>

        </View>

      </View>

    </Modal>

  );

}


const styles = StyleSheet.create({

  overlay: {

    flex: 1,

    backgroundColor:
      "rgba(0, 0, 0, 0.5)",

    justifyContent:
      "center",

    alignItems:
      "center",

    paddingHorizontal: 25,

  },


  contenedor: {

    width: "100%",

    maxWidth: 350,

    backgroundColor:
      "#FFF0B8",

    borderRadius: 15,

    paddingHorizontal: 20,

    paddingTop: 20,

    paddingBottom: 20,

    alignItems:
      "center",

  },


  titulo: {

    fontSize: 24,

    fontWeight: "bold",

    color: "#FF9800",

    textAlign: "center",

    lineHeight: 28,

    marginBottom: 12,

  },


  mensaje: {

    fontSize: 18,

    color: "#000000",

    textAlign: "center",

    lineHeight: 24,

    marginBottom: 12,

  },


  boton: {

    width: "100%",

    backgroundColor:
      "#FF9800",

    borderRadius: 4,

    paddingVertical: 11,

    alignItems:
      "center",

    justifyContent:
      "center",

    marginTop: 5,

  },


  botonPresionado: {

    opacity: 0.75,

    transform: [
      {
        scale: 0.98,
      },
    ],

  },


  textoBoton: {

    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "bold",

  },

});