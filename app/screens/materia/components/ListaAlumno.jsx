import { StyleSheet, Text, View } from "react-native";

export default function ListaAlumno() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios Asignados</Text>

      <Text style={styles.texto}>
        La lista de alumnos se cargará desde el servidor.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  texto: {
    fontSize: 16,
  },
});
