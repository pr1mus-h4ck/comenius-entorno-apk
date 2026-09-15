import { useRef } from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CloudinaryPicker({
  onUploaded,
}) {
  const inputRef = useRef(null);

  function seleccionarArchivo() {
    inputRef.current?.click();
  }

  async function subirArchivo(event) {
    const archivo = event.target.files?.[0];

    if (!archivo) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "file",
        archivo
      );

      formData.append(
        "upload_preset",
        "comenius_prueba"
      );

      const respuesta = await fetch(
        "https://api.cloudinary.com/v1_1/dgilte6sf/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const recibido =
        await respuesta.json();

      console.log(
        "✅ Respuesta Cloudinary:",
        recibido
      );

      if (!respuesta.ok) {
        Alert.alert(
          "Error",
          "No se pudo subir el archivo."
        );

        return;
      }

      const archivoSubido = {
        url: recibido.secure_url,
        name:
          recibido.original_filename ||
          archivo.name,
      };

      console.log(
        "✅ Archivo subido:",
        archivoSubido
      );

      if (onUploaded) {
        onUploaded(
          archivoSubido
        );
      }

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

    event.target.value = "";
  }

  return (
    <View>
      <Pressable
        style={styles.boton}
        onPress={seleccionarArchivo}
      >
        <Text style={styles.texto}>
          Seleccionar archivo
        </Text>
      </Pressable>

      {typeof document !==
        "undefined" && (
        <input
          ref={inputRef}
          type="file"
          style={{
            display: "none",
          }}
          onChange={subirArchivo}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    marginBottom: 15,
  },

  texto: {
    fontWeight: "bold",
  },
});