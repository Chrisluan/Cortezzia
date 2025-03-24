import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import PlaceHolderLogo from "@/components/placeholderlogo";
import Icon from "react-native-vector-icons/Feather"; // Import an icon
const styles = StyleSheet.create({
  input: {
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: "#C4C4C450",
    width: "100%",
  },
});

const registerUser = async (email, password, name) => {
  try {
    const response = await fetch(
      `https://cortezziabackend.vercel.app/registeruser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Especifique o tipo de conteúdo
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data[0]; // Retorna os dados do usuário
    }


    return { code: 404, message: "E-mail já registrado." };
  } catch (e) {
    console.log(e);
    return { code: 500, message: "Error while connecting to server" };
  }
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePass, setSeePass] = useState(false);
  const [name, setName] = useState("");
  const [registering, setRegistering] = useState(false);
  const navigation = useNavigation();
  const handleRegister = async (email, password, name) => {
    console.log("registrando...")
    if (!email || !password || !name) {
      alert("Preencha todos os campos!");
      return;
    }
    setRegistering(true);
    const register = await registerUser(email, password, name);
    console.log(register);

    if (register) {
      alert(register.message || "Erro ao registrar");
    } else {
      navigation.replace("Login", {}); // Redireciona para a tela de login
    }
    setRegistering(false);
  };
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SafeAreaView
        style={{
          gap: 10,
          width: "90%",
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 20,
            paddingVertical: 50,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 40,
              gap: 5,
            }}
          >
            <PlaceHolderLogo size={90}></PlaceHolderLogo>

            <Text
              style={{ textAlign: "center", fontWeight: 800, fontSize: 30 }}
            >
              Registrar
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "rgba(0,0,0, 0.5)",
              }}
            >
              Sua barbearia no seu Bolso.
            </Text>
          </View>

          <View style={{ gap: 10 }}>
            <TextInput
              placeholder="Nome"
              style={styles.input}
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
              onChangeText={setName}
              value={name}
            />
            <TextInput
              placeholder="E-mail"
              style={styles.input}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              value={email}
            />
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TextInput
                placeholder="Password"
                secureTextEntry={seePass}
                passwordRules="2"
                onChangeText={setPassword}
                value={password}
            
                style={styles.input}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right:"5%",
                  top:"25%"
                }}
                onPress={() => setSeePass(!seePass)}
              >
                <Icon
                  name={seePass ? "eye-off" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              padding: 10,
              paddingVertical: 15,
              borderRadius: 10,
              width: "100%",
            }}
            onPress={async () => {
              await handleRegister(email, password, name);
            }}
          >
            {registering ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text
                style={{ fontSize: 15, color: "white", textAlign: "center" }}
              >
                Cadastrar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default Register;
