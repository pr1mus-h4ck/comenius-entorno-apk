import { ScrollView, StyleSheet } from "react-native";

import { useSessionService } from "../../services/session-service";

import MateriaHeader from "./components/MateriaHeader";
import MateriaMenu from "../../components/MateriaMenu";

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

        nombre={session.comision?.nombre}

        comision={session.comision?.comision}

        profesor={session.comision?.profesor}

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