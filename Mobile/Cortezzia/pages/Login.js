import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation } from "@react-navigation/native";
import PlaceHolderLogo from "@/components/placeholderlogo";
import Icon from "react-native-vector-icons/Feather"; // Import an icon
const styles = StyleSheet.create({
  input: {
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: "#C4C4C450",
    width:"100%",
  },
});

const fetchUser = async (email, password) => {
  try {
    const response = await fetch(
      `https://cortezziabackend.vercel.app/log-in-user?email=${email}&password=${password}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      return data; // Return user data
    }
    throw new Error("Usuário não encontrado.");
  } catch (e) {
    console.log(e);
    return { code: 500, message: "Error while connecting to server" };
  }
};

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [seePass, setSeePass] = useState(false);
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const navigation = useNavigation();
  const handleLogin = async (email, password) => {
    setLoggingIn(true);
    try {
      if (!password || !email) {
        setLoggingIn(false);
        return alert("Preencha todos os campos");
      }
      const userData = await fetchUser(email, password);
      
      if (userData !== null) {
        navigation.replace("Home", { userData }); // Navigate to Home and pass user data
        setLoggingIn(false);
      } else {
        alert("Invalid credentials");
        setLoggingIn(false);
      }
    } catch (e) {
      alert("Não foi possível conectar ao servidor");
      console.log(e);
      setLoggingIn(false);
    }
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
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              gap: 20,
              alignItems: "center",
            }}
          >
            <PlaceHolderLogo size={100}></PlaceHolderLogo>
            <Text
              style={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
                marginBottom: 20,
              }}
            >
              Entrar agora.
            </Text>
          </View>

          <View style={{ gap: 5 }}>
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
                  right: "5%",
                  top: "25%",
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

        <View
          style={{
            gap: 30,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 10,
              width: "100%",
            }}
            onPress={async () => {
              await handleLogin(email, password);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              {loggingIn ? (
                <ActivityIndicator color={"white"} size={"large"} />
              ) : (
                "Log in"
              )}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "blue" }}>Clique aqui {""}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default Login;
