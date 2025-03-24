// Criando o Tab Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();


export const BottomTab = ()=>{
    return (
        <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#1B263B", borderTopWidth: 0 },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#7D8597",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: ({ color }) => <Home color={color} size={24} /> }}
        />
        <Tab.Screen
          name="Agendamentos"
          component={HomeScreen} // Substituir pelo componente correto
          options={{ tabBarIcon: ({ color }) => <Calendar color={color} size={24} /> }}
        />
        <Tab.Screen
          name="Descobrir"
          component={HomeScreen} // Substituir pelo componente correto
          options={{ tabBarIcon: ({ color }) => <MapPin color={color} size={24} /> }}
        />
        <Tab.Screen
          name="Perfil"
          component={HomeScreen} // Substituir pelo componente correto
          options={{ tabBarIcon: ({ color }) => <User color={color} size={24} /> }}
        />
      </Tab.Navigator>
    )
}