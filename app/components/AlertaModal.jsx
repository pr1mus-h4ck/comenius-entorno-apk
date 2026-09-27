import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";


export default function AlertaModal({
  visible,
  titulo,
  mensaje,
  onAceptar,
  tipo = "error",
  mostrarBoton = true,
}) {

  const esAviso =
    tipo === "aviso";

  const esObligatorio =
    tipo === "camposObligatorios";

  const esExito =
    tipo === "exito";


  const fondo = esExito
    ? "#B8F5D2"
    : esAviso
      ? "#FFF0B8"
      : "#F8B8B8";


  const color = esExito
    ? "#20C968"
    : esAviso
      ? "#FF9800"
      : "#F02016";


  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onAceptar}
    >

      <View style={styles.overlay}>

        <View
          style={[
            styles.contenedor,
            {
              backgroundColor: fondo,
            },
          ]}
        >

          <Text
            style={[
              styles.titulo,
              {
                color: color,
              },
            ]}
          >
            {titulo}
          </Text>


          <Text style={styles.mensaje}>
            {mensaje}
          </Text>


          {mostrarBoton && (

            <Pressable

              style={({ pressed }) => [

                styles.boton,

                {
                  backgroundColor: color,
                },

                pressed &&
                  styles.botonPresionado,

              ]}

              onPress={onAceptar}

            >

              <Text style={styles.textoBoton}>
                Aceptar
              </Text>

            </Pressable>

          )}

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

    borderRadius: 15,

    paddingHorizontal: 20,

    paddingTop: 20,

    paddingBottom: 20,

    alignItems: "center",

  },


  titulo: {

    fontSize: 24,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 8,

  },


  mensaje: {

    fontSize: 18,

    color: "#000000",

    textAlign: "center",

    lineHeight: 25,

    marginBottom: 12,

  },


  boton: {

    width: "100%",

    borderRadius: 4,

    paddingVertical: 11,

    alignItems: "center",

    justifyContent: "center",

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

    fontSize: 18,

    fontWeight: "bold",

  },

});