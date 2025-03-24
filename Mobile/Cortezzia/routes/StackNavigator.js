// navigation/StackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Import Screens
import HomeScreen from "../pages/Home";
import Discover from "../pages/Discover";
import Login from "../pages/Login";
import Register from "@/pages/Register";
import BarberPage from "@/pages/BarberPage";
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen options={{
          headerShown:false,
        }} name="Home" component={HomeScreen} />
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BarberPage" component={BarberPage} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
