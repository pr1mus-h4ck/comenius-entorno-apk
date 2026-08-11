import { View, StyleSheet } from "react-native";

import { COLORS } from "../constants/colors";
import { RADIUS } from "../constants/radius";
import { SPACING } from "../constants/spacing";

export default function Card({

  children,

  style,

}) {

  return (

    <View style={[styles.card, style]}>

      {children}

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

  backgroundColor: COLORS.card,

  borderRadius: RADIUS.lg,

  padding: SPACING.xl,

  marginBottom: SPACING.lg,

  borderWidth: 1,

  borderColor: COLORS.border,

  shadowColor: "#000",

  shadowOpacity: 0.08,

  shadowRadius: 8,

  shadowOffset: {

    width: 0,

    height: 3,

  },

  elevation: 3,

},

});