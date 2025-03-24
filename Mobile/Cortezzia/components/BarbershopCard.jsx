import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Home, User, Star } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
export const BarbershopCard = ({
  barbershop,
  barbershopImage,
  barbershopName,
  stars,
  description,
  phone,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(barbershop)
        navigation.navigate("BarberPage", { barbershop });
      }}
    >
      <View style={styles.card}>
        <Image source={{ uri: barbershopImage }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.heading}>{barbershopName}</Text>
          <View style={styles.rating}>
            <View style={styles.rating}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Star size={15} color={styles.rating.color}></Star>
                <Text style={{ color: styles.rating.color }}>{stars}.2</Text>
              </View>
              <Text>●</Text>
              <Text style={styles.phone}>{phone}</Text>
            </View>
          </View>

          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.description}
          >
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: "#dedede50",
    gap: 10,
  },
  image: {
    width: 70, // Adjust as needed
    height: 70, // Adjust as needed
    borderRadius: 100,
  },
  content: {
    width: "90%",
    marginTop: 10,
  },
  heading: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "#575757",
    width: "90%",
    marginBottom: 10,
  },
  rating: {
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    color: "#fcba03",
  },
  phone: {
    color: "#575757",
    fontSize: 13,
  },
});
