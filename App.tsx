import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import IconButton from "./components/UI/IconButton";
import { useState } from "react";

const MOCK_DATA = ["apple", "oranges"];

export default function App() {
  const [list, setList] = useState<Array<string>>(MOCK_DATA);
  const [input, setInput] = useState("");

  const addItemToList = () => {
    if (!input) return;

    setList((prevList) => [input, ...prevList]);
    setInput("");
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="To buy..."
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <IconButton
          icon="add"
          size={24}
          color={"pink"}
          onPress={addItemToList}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  listContainer: {
    flex: 1,
    paddingTop: 22,
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
