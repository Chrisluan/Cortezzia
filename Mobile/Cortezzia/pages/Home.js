import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Calendar, User, MapPin } from "lucide-react-native";
import { useRoute } from "@react-navigation/native";
import { BarbershopCard } from "@/components/BarbershopCard";
const HomeScreen = () => {
  const route = useRoute();
  const { userData } = route.params || {};
  const [allBarbershops, setAllBarbershops] = useState([]);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão Negada", "Localização é necessária.");
      return;
    }
    try {
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      const city =
        data.address.city ||
        data.address.town ||
        (data.address.village === "Cunhambebe"
          ? "Angra dos Reis"
          : data.address.village);
      const neighborhood = data.address.suburb || data.address.neighbourhood;
      setAddress({ city, neighborhood });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter sua localização.");
    }
  };

  useEffect(() => {
    async function get() {
      try {
        let res = await fetch("https://cortezziabackend.vercel.app/alldata");
        let data = await res.json();
        setAllBarbershops(data);
      } catch (e) {
        console.error("Erro ao buscar dados:", e);
      }
    }

    get(); // Chama a função dentro do useEffect
  }, []); // [] garante que o efeito execute apenas uma vez

  return (
    <View style={{ flex: 1, backgroundColor: "#0D1B2A", padding: 20 }}>
      <ScrollView>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Bem-vindo {userData.userData.nome}! Ao Cortezzia ✂️
        </Text>
        <TouchableOpacity
          onPress={getLocation}
          style={{ backgroundColor: "#1B263B", padding: 15, borderRadius: 10 }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Obter Localização
          </Text>
        </TouchableOpacity>
        {location && (
          <Text style={{ color: "white", marginTop: 20 }}>
            🌍 {address?.city}, {address?.neighborhood}
          </Text>
        )}

        <View style={styles.Grid}>
          {allBarbershops.map((barber) => {
            console.log(barber.nome);
            return (
              <BarbershopCard
                key={barber._id}
                stars={4}
                barbershopImage={barber.imagem}
                barbershopName={barber.nome}
                description={barber.descricao}
              ></BarbershopCard>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  Grid: {
    width: "100%",
    flexDirection: "column",
    padding: 5,
    gap: 5,
  },
});

export default HomeScreen;
