import { Text, View } from "react-native";
import * as SQLite from 'expo-sqlite';
import {useState, useEffect} from 'react';

const db = await SQLite.openDatabaseAsync('absences.db');

export default function Index() {
    const [disciplines, setDisciplines] = useState<string[]>([]);
    const [absences, setAbsences] = useState<number[]>([]);
    const [max, setMax] = useState<number[]>([]);

    useEffect(() => {
        const runAsync = async () => {
            const result = await db.execAsync('CREATE TABLE IF NOT EXISTS faltas ' +
                '(name TEXT PRIMARY KEY NOT NULL, numAbsences INTEGER NOT NULL, maxAbsences INTEGER)');
        }

        runAsync();
    }, []);

  return (
    <View className={"flex-1 flex-start pt-20 pl-4"} >
      <Text className={"font-bold text-black text-5xl"}>Faltas:</Text>
    </View>
  );
}
