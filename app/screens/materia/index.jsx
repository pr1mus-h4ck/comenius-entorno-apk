import { ScrollView, StyleSheet, View } from "react-native";

import { useSessionService } from "../../services/session-service";

import BottomMenu from "../../components/BottomMenu";
import MateriaMenu from "../../components/MateriaMenu";
import MateriaHeader from "./components/MateriaHeader";

import PanelClase from "./components/PanelClase";
import Portada from "./components/Portada";
import Trabajos from "./components/Trabajos";

import { COLORS } from "../../constants/colors";

export default function MateriaScreen() {
  const { session } = useSessionService();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <MateriaHeader
          nombre={session.comision?.Materia}
          comision={session.comision?.Comision}
          turno={session.comision?.Turnos}
          horarios={session.comision?.Horarios}
          profesor={session.comision?.Instructores}
        />

        <MateriaMenu />

        {session.enlace === "Portada" && <Portada />}

        {session.enlace === "Panel de Clase" && <PanelClase />}

        {session.enlace === "Trabajos" && <Trabajos />}
      </ScrollView>

      <BottomMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 90,
  },
});
