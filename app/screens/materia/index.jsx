import { ScrollView, StyleSheet } from "react-native";

import { useSessionService } from "../../services/session-service";

import MateriaHeader from "./components/MateriaHeader";
import MateriaMenu from "../../components/MateriaMenu";
import BottomMenu from "../../components/BottomMenu";

import Portada from "./components/Portada";
import PanelClase from "./components/PanelClase";
import Trabajos from "./components/Trabajos";

import { COLORS } from "../../constants/colors";

export default function MateriaScreen() {

  const { session } = useSessionService();

  return (

    <ScrollView

        style={styles.container}

        contentContainerStyle={styles.content}

      >

      <MateriaHeader

        nombre={session.comision?.Materia}

        comision={session.comision?.Comision}
        
        profesor={session.comision?.Instructores}

      />

      <MateriaMenu />

      {session.enlace === "Portada" && (
        <Portada />
      )}

      {session.enlace === "Panel de Clase" && (
        <PanelClase />
      )}

      {session.enlace === "Trabajos" && (
        <Trabajos />
      )}

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {

  flex: 1,

  backgroundColor: COLORS.background,

},

  content: {

    paddingHorizontal: 20,

    paddingBottom: 30,

},

});

return (
  <View style={styles.container}>

    <MateriaHeader
      nombre={session.comision?.Materia}
      comision={session.comision?.Comision}
      profesor={session.comision?.Instructores}
    />

    <View style={styles.contenido}>

      {session.enlace === "Portada" && (
        <Portada />
      )}

      {session.enlace === "Panel de Clase" && (
        <PanelClase />
      )}

      {session.enlace === "Trabajos" && (
        <Trabajos />
      )}

    </View>

    <BottomMenu />

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  contenido: {
    flex: 1,
    paddingBottom: 75,
  },
});