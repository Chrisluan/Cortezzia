import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
export const Section = ({ children, title }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider}></View>
      <View>{children}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize:15,
    flexDirection: "column",
    fontWeight:600,
    paddingBottom:10
  },
  divider:{
    width:"50%",
    height:1,
    backgroundColor:"#cccccc50"
  }
});
