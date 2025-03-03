import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    {console.log(userData)}
      <Text>Olá, {userData.userData.nome}!</Text>
      <Button title="Log Out" onPress={() => navigation.replace("Login")} />
    </View>
  );
};

export default HomeScreen;
