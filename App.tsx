import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import IconButton from "./components/UI/IconButton";
import { useEffect, useState } from "react";
import storage from "./lib/storage";
import CheckItem from "./components/CheckItem";
import { COLORS } from "./lib/constants";

export default function App() {
  const [list, setList] = useState<Array<string>>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadInitialList();
  }, []);

  const loadInitialList = () => {
    const shoppingList = storage.load({ key: "shoppingList" }).then((res) => {
      setList(res);
    });
  };

  const addItemToList = () => {
    if (!input) return;

    const newList = [input, ...list];
    setList(newList);
    storage.save({ key: "shoppingList", data: newList });
    setInput("");
  };

  // Text color: https://dribbble.com/shots/19618347-Fitness-Mobile-App 19A873
  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="To add..."
          placeholderTextColor={"white"}
          value={input}
          onChangeText={(text) => setInput(text)}
          style={styles.input}
        />
        <IconButton
          icon="add"
          size={24}
          color={"white"}
          onPress={addItemToList}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={({ item }) => <CheckItem>{item}</CheckItem>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "flex-start",
  },
  input: {
    height: 40,
    flex: 1,
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  listContainer: {
    flex: 1,
    paddingTop: 22,
  },
});
