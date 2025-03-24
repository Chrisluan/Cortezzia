import { Text, View } from "react-native";
const PlaceHolderLogo = ({size}) => {
    return (
<View
    style={{
      backgroundColor: "black",
      padding: 10,
      width: size,
      height: size,
      borderRadius: size *100,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text
      style={{
        fontSize: size/4,
        color: "white",
        fontWeight: 800,
      }}
    >
      LOGO
    </Text>
  </View>
    )
  
};
export default PlaceHolderLogo;
