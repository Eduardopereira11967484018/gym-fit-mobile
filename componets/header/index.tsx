import {
  View,
  StyleSheet,
  Pressable,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Colors } from "../../constants/Colors";

interface HeaderProps {
  step: string;
  title: string;
}

export function Header({ step, title }: HeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.springify()} exiting={FadeOut}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Pressable onPress={() => router.back()} style={styles.iconButton}>
              <Feather name="arrow-left" size={28} color={Colors.white} />
            </Pressable>

            <Text style={styles.stepText}>
              {step}{" "}
              <Feather
                name="loader"
                size={16}
                color={Colors.white}
                style={{ marginLeft: 4 }}
              />
            </Text>
          </View>

          <Text style={styles.title}>{title}</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconButton: {
    backgroundColor: Colors.orange,
    padding: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  stepText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginTop: 10,
    letterSpacing: 1.5,
    lineHeight: 34,
  },
});
