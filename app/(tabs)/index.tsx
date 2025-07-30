import { Text, View } from "react-native";
import * as SQLite from 'expo-sqlite'

export default function Index() {
  return (
    <View className={"flex-1 flex-start pt-20 pl-4"} >
      <Text className={"font-bold text-black text-5xl"}>Welcome!</Text>
    </View>
  );
}
