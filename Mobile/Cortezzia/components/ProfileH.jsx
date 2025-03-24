import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { User, User2 } from "lucide-react-native";
export const ProfileH = ({ profilePic, name, userState }) => {
  return (
    <View
      style={{
        marginBottom: 20,
        flexDirection: "row",
        gap: 10,
        paddingBottom: 20,
        padding:20,
        width:"100%"
      }}
    >
      <View
        style={{
          width: 55,
          height: 55,
          borderRadius: 50,
          backgroundColor: "#ccc",
          overflow: "hidden",
        }}
      >
        {profilePic ? (
          <Image
            source={{
              uri: profilePic,
            }}
            style={{
              height: "100%",
            }}
          ></Image>
        ) : (
          <User2 size={"100%"} color={"#0f0f0f"}></User2>
        )}
      </View>

      <View>
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: "bold",

            flexWrap: "wrap",
          }}
        >
          Olá {name}!
        </Text>
        <Text>Bora ficar no estilo?</Text>
      </View>
      <TouchableOpacity>
        <Text>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> {userState({})}}>
        <Text>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};
