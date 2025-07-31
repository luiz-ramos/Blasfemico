import {Modal, Pressable, Text, TextInput, View} from "react-native";
import * as SQLite from 'expo-sqlite';
import {useState, useEffect} from 'react';
import { SquarePlus } from 'lucide-react-native';

export default function Index() {
    const db = SQLite.openDatabaseSync('absences.db');
    const [disciplines, setDisciplines] = useState<any[]>([]);
    const [currentDiscipline, setCurrentDiscipline] = useState<string>('');
    const [currentNumAbsences, setCurrentNumAbsences] = useState<number>(0);
    const [currentMaxAbsences, setCurrentMaxAbsences] = useState<number>(0);
    const [isAddingDiscipline, setIsAddingDiscipline] = useState<boolean>(false);

    useEffect(() => {
        try {
            db.execSync("CREATE TABLE IF NOT EXISTS absences (id INTEGER PRIMARY KEY, " +
                "name TEXT NOT NULL, numAbsences INTEGER NOT NULL, maxAbsences INTEGER NOT NULL);");
        } catch (error) {
            console.log(error);
        }
        const newRows = db.getAllSync("SELECT * FROM absences");
        setDisciplines(newRows);
    }, []);

    const renderDisciplines = () => {
        return disciplines.map((discipline, index) => {
            return (
                <View key={index} className="flex flex-row justify-between w-[90%] mt-5 rounded-full ml-3">
                    <View className="align-items-center">
                        <Text className={"text-3xl font-semibold text-gray-600 ml-4"}>
                            {discipline.name}
                        </Text>
                    </View>
                    <View className="align-items-center">
                        <Text className={"text-3xl font-semibold text-gray-600"}>
                            {discipline.numAbsences}
                        </Text>
                    </View>
                    <View className="align-items-center">
                        <Text className={"text-3xl font-semibold text-gray-600 mr-4"}>
                            {discipline.maxAbsences}
                        </Text>
                    </View>
                </View>
            );
        });
    }

    const addDiscipline = () =>{
        try {
            db.runAsync("INSERT INTO absences (name, numAbsences, maxAbsences) values (?, ?, ?)",
                currentDiscipline, currentNumAbsences, currentMaxAbsences);
        } catch (error) {
            console.log(error);
        }
    }

    type TextInputWrapperProps = {
        value: string | number;
        setFunction: (input: string | number) => void;
    };

    const TextInputWrapper = ({ value, setFunction }: TextInputWrapperProps) => {
        const isNumber = typeof value === "number";
        const shownValue = isNumber ? (
            value === 0 ? "" : value.toString()
        ) : value;

        return (
            <View className="w-[60%] justify-center min-h-12">
                <TextInput
                    className="border border-black rounded-lg"
                    textAlign={'center'}
                    value={shownValue}
                    onChangeText={(text) => setFunction(isNumber ? Number(text) : text.toUpperCase())}
                    {...(isNumber ? { inputMode: "numeric" } : {})}
                />
            </View>
        );
    };

  return (
    <View className={"flex-1 flex-start pt-20 pl-4"} >
        <View className={" flex-col w-[90%] rounded-2xl bg-red-400 pb-4 ml-3"}>
            {renderDisciplines()}
            <View className="flex flex-row justify-center w-[90%] mt-5 rounded-2xl ml-5 mr-3 bg-gray-600 py-4">
                <Pressable onPress={() => setIsAddingDiscipline(true)}>
                    <SquarePlus size={30} color={'#f87171'} strokeWidth={2}/>
                </Pressable>
                <Modal animationType={"slide"} visible={isAddingDiscipline} transparent={true}>
                    <View className={"flex-col absolute top-0 left-0 right-0 bottom-0 justify-center " +
                        "items-center gap-4 w-full mt-10 py-10"}>
                        <TextInputWrapper value={currentDiscipline} setFunction={setCurrentDiscipline} />
                        <TextInputWrapper value={currentNumAbsences} setFunction={setCurrentNumAbsences} />
                        <TextInputWrapper value={currentMaxAbsences} setFunction={setCurrentMaxAbsences} />
                        <Pressable onPress={() => setIsAddingDiscipline(false)}>
                            <SquarePlus size={30} color={'#f87171'}/>
                        </Pressable>
                    </View>
                </Modal>
            </View>
        </View>
    </View>
  );
}
