import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import IconButton from "./components/UI/IconButton";
import { useEffect, useState } from "react";
import storage from "./lib/storage";
import CheckItem from "./components/CheckItem";
import { COLORS } from "./lib/constants";

interface ListItem {
  text: string;
  checked: boolean;
}

export default function App() {
  const [list, setList] = useState<Array<ListItem>>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadInitialList();
  }, []);

  const loadInitialList = () => {
    storage.load({ key: "shoppingList" }).then((res) => {
      console.log(res);
      setList(res);
    });
    storage.remove({ key: "shoppingList" });
  };

  const addItemToList = () => {
    if (!input) return;

    const newItem = {
      text: input,
      checked: false,
    };
    const newList = [newItem, ...list];
    setList(newList);
    storage.save({ key: "shoppingList", data: newList });
    setInput("");
  };

  const checkToggleHandler = () => {
    console.log("checked");
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
          renderItem={({ item, index }) => (
            <CheckItem
              index={index}
              checked={item.checked}
              checkToggleHandler={checkToggleHandler}
            >
              {item.text}
            </CheckItem>
          )}
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
    gap: 8,
  },
  listContainer: {
    flex: 1,
    paddingTop: 22,
  },
});
