import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { Section } from "@/components/Section";
import { BarbershopCard } from "@/components/BarbershopCard";
import { ProfileH } from "@/components/ProfileH";

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const userData = route.params?.userData;
  const [allBarbershops, setAllBarbershops] = useState([]);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [user, setUser] = useState(userData?.userData || {});
  const [refreshing, setRefreshing] = useState(false);

  const fetchBarbershops = useCallback(async () => {
    try {
      let res = await fetch("https://cortezziabackend.vercel.app/alldata");
      let data = await res.json();
      setAllBarbershops(data);
    } catch (e) {
      console.error("Erro ao buscar dados:", e);
    }
  }, []);

  useEffect(() => {
    fetchBarbershops();
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchBarbershops().then(() => setRefreshing(false));
    }
  }, [refreshing]);

  useEffect(() => {
    if (!user?.nome) {
      navigation.replace("Login");
    }
  }, [user?.nome]);

  const onRefresh = () => {
    setRefreshing(true);
  };

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

  return (
    <View style={{ margin: 10 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#FFF" }}
      >
        <ProfileH userState={setUser} name={user?.name} profilePic={""} />

        {location && (
          <Text style={{ color: "white", marginTop: 20 }}>
            🌍 {address?.city}, {address?.neighborhood}
          </Text>
        )}
        <Section title={"Barbearias"}>
          <View style={styles.Grid}>
            {allBarbershops.map((barber) => (
              <View key={barber._id}>
                <BarbershopCard
                  barbershop={barber}
                  stars={4}
                  phone={barber.telefone}
                  barbershopImage={barber.imagem}
                  barbershopName={barber.nome}
                  description={barber.descricao}
                />
              </View>
            ))}
          </View>
        </Section>
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
