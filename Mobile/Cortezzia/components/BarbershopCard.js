import { View, Text, Image, StyleSheet } from "react-native";

export const BarbershopCard = ({ barbershopImage, barbershopName, stars, description }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: barbershopImage }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.heading}>{barbershopName}</Text>
        <Text style={styles.text}>{stars}/5</Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#112336",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  image: {
    width: "100%",  // Adjust as needed
    height: 150,    // Adjust as needed
    borderRadius: 8,
  },
  content: {
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "white",
    marginBottom: 10,
  },
  text: {
    color: "white",
  },
});

