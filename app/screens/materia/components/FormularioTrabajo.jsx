import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { COLORS } from "../../../constants/colors";
import { SPACING } from "../../../constants/spacing";
import { RADIUS } from "../../../constants/radius";

export default function FormularioTrabajo() {

  const [titulo, setTitulo] = useState("");

  const [contenido, setContenido] = useState("");

  const [archivo, setArchivo] = useState(null);

  function seleccionarArchivo() {

    // Más adelante abrirá DocumentPicker

    console.log("Seleccionar archivo");

  }

  function crearTrabajo() {

    console.log({

      titulo,

      contenido,

      archivo,

    });

    setTitulo("");

    setContenido("");

    setArchivo(null);

  }

  return (

  <Card style={styles.container}>

    <Input

      placeholder="Título"

      value={titulo}

      onChangeText={setTitulo}

    />

    <Input

      placeholder="Contenido"

      value={contenido}

      onChangeText={setContenido}

      multiline

      style={styles.contenido}

    />

    <Pressable

      style={styles.botonArchivo}

      onPress={seleccionarArchivo}

    >

      <Text style={styles.textoArchivo}>

        {archivo || "Seleccionar archivo"}

      </Text>

    </Pressable>

    <Button

      title="Crear trabajo"

      onPress={crearTrabajo}

    />

  </Card>

);

}

const styles = StyleSheet.create({

  container: {

    margin: SPACING.md,

  },

  contenido: {

    minHeight: 120,

    textAlignVertical: "top",

  },

  botonArchivo: {

    padding: SPACING.md,

    borderRadius: RADIUS.md,

    borderWidth: 1,

    borderColor: COLORS.border,

    backgroundColor: COLORS.surface,

    alignItems: "center",

    marginBottom: SPACING.lg,

  },

  textoArchivo: {

    color: COLORS.text,

  },

});