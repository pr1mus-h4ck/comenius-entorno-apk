import {
  StyleSheet,
} from "react-native";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { SPACING } from "../../../constants/spacing";

export default function FormularioPublicacion() {

  const [titulo, setTitulo] = useState("");

  const [contenido, setContenido] = useState("");

  function publicar() {

    console.log({

      titulo,

      contenido,

    });

    setTitulo("");

    setContenido("");

  }

  return (

  <Card style={styles.container}>

    <Input

      placeholder="Título (opcional)"

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

    <Button

      title="Publicar"

      onPress={publicar}

    />

  </Card>

);

}

const styles = StyleSheet.create({

  container: {

    backgroundColor: "#FFFFFF",

    margin: 20,

    padding: 20,

    borderRadius: 12,

  },

  input: {

    borderWidth: 1,

    borderColor: "#DDD",

    borderRadius: 8,

    padding: 12,

    marginBottom: 15,

  },

  boton: {

    backgroundColor: "#2563EB",

    padding: 15,

    borderRadius: 8,

    alignItems: "center",

  },

  textoBoton: {

    color: "#FFFFFF",

    fontWeight: "bold",

  },

});