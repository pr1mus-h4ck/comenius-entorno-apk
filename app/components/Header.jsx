import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { TYPOGRAPHY } from "../constants/typography";

export default function Header({

  title,

  subtitle,

  right,

}) {

  return (

    <View style={styles.container}>

      <View>

        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

        ) : null}

      </View>

      {right}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: SPACING.xl,

  },

  title: {

    fontSize: TYPOGRAPHY.h1,

    fontWeight: "bold",

    color: COLORS.text,

  },

  subtitle: {

    marginTop: SPACING.xs,

    fontSize: TYPOGRAPHY.small,

    color: COLORS.textSecondary,

  },

});