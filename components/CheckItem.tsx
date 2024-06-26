import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../lib/constants";

interface CheckItemProps {
  children: React.ReactNode;
  checked: boolean;
  index: number,
  checkToggleHandler: () => void;
}

const CheckItem = ({ children, checked, checkToggleHandler }: CheckItemProps) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Checkbox
          value={checked}
          color={COLORS.primary}
          onValueChange={checkToggleHandler}
        />
        <Text style={styles.listItem}>{children}</Text>
      </View>
      <Ionicons name={"close"} size={24} color={"white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItem: {
    color: "white",
    paddingVertical: 10,
    fontSize: 18,
    height: 44,
  },
  innerContainer: {
    gap: 8,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
});

export default CheckItem;
