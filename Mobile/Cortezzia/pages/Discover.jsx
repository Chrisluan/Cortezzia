import React from 'react';
import { View, Text, Button } from 'react-native';

const Discover = ({ navigation, user}) => {
  return (
    <View>
      <Text>Ola</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Discover;
