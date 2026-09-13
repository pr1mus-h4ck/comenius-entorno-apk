import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

export default function CloudinaryPicker({
  onUploaded,
}) {
  async function seleccionarArchivo() {
    if (
      typeof document ===
      "undefined"
    ) {
      Alert.alert(
        "No disponible",
        "El selector de archivos está disponible en la versión web."
      );

      return;
    }

    const input =
      document.createElement(
        "input"
      );

    input.type = "file";

    input.onchange =
      async (event) => {
        const file =
          event.target.files?.[0];

        if (!file) {
          return;
        }

        try {
          const formData =
            new FormData();

          formData.append(
            "file",
            file
          );

          formData.append(
            "upload_preset",
            "comenius_prueba"
          );

          const respuesta =
            await fetch(
              "https://api.cloudinary.com/v1_1/dgilte6sf/upload",
              {
                method: "POST",
                body: formData,
              }
            );

          const resultado =
            await respuesta.json();

          console.log(
            "✅ Cloudinary:",
            resultado
          );

          if (
            !resultado.secure_url
          ) {
            Alert.alert(
              "Error",
              "No se pudo subir el archivo."
            );

            return;
          }

          onUploaded?.({
            url:
              resultado.secure_url,

            name:
              resultado.original_filename ||
              file.name,
          });
        } catch (error) {
          console.log(
            "❌ Error Cloudinary:",
            error
          );

          Alert.alert(
            "Error",
            "No se pudo subir el archivo."
          );
        }
      };

    input.click();
  }

  return (
    <Pressable
      style={styles.boton}
      onPress={
        seleccionarArchivo
      }
    >
      <Text
        style={styles.texto}
      >
        Seleccionar archivo
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    padding: 15,

    borderRadius: 8,

    backgroundColor:
      "#EEEEEE",

    alignItems:
      "center",

    marginBottom: 15,
  },

  texto: {
    fontWeight:
      "bold",
  },
});