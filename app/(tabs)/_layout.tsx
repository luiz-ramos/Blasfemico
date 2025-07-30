import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import { Calendar, Search } from "lucide-react-native"

function renderComponent<P>(Component: React.ComponentType<P>, props: P) {
    return <Component {...props} />;
}

type TabIconProps<P> = {
    icon: React.ComponentType<P>;
    title: string;
    focused: boolean;
    size: number;
};

const TabIcon = <P,>({ icon: Icon, focused, title, size }: TabIconProps<P>) => {
    if(focused) {
        return (
            <View className="bg-blue-500 rounded-full px-10 py-4 flex flex-1 flex-row items-center justify-center w-full min-w-[140px] min-h-14 mt-3 overflow-hidden">
                {renderComponent(Icon, {
                    color: '#fde047',
                    size: 18,
                    strokeWidth: 3,
                } as P)}
                <Text className="font-bold text-yellow-300 text-sm ml-2">
                    {title}
                </Text>
            </View>
        );
    }

    return (
        <View className={"size-full justify-center items-center rounded-full w-full min-w-[140px] " +
            "min-h-16 mt-3 overflow-hidden flex flex-1 flex-row"}>
            {renderComponent(Icon, {
                color: '#3b82f6',
                size: 18,
                strokeWidth: 2
            } as P)}
            <Text className="font-bold text-blue-500 text-sm ml-2">
                {title}
            </Text>
        </View>
    )
};

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarStyle: {
                    borderRadius: 50,
                    marginHorizontal: 60,
                    marginBottom: 36,
                }
            }}

        >
            <Tabs.Screen
                name={"index"}
                options={{
                    title: "Faltas",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={Calendar} focused={focused} title={"Faltas"} size={110} />
                    )
                }}
            />
            <Tabs.Screen
                name={"portal"}
                options={{
                    title: "Consultas",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={Search} focused={focused} title={"Consultas"} size={110} />
                    )
                }}
            />
        </Tabs>
    )
}

export default _Layout