import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import transformedData from '../functions/transaction';
import {Picker} from '@react-native-picker/picker';
import {LineChart} from '../component/LineChart';
import {CategoryChart} from '../component/CategoryChart';
import {PercentageChart} from '../component/PercentageChart';
import {TextInput, IconButton, Button} from 'react-native-paper';
import {ScrollChart} from '../component/ScrollChart';
const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Total Balance</Text>
      <LineChart />

      <Text style={styles.text}>Spending</Text>
      <PercentageChart />
      <ScrollChart />
      {/* 
      <Text style={styles.text}>Categories</Text> */}
      {/* <CategoryChart /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef8fa',
  },

  text: {
    fontWeight: 'bold',
    margin: 10,
  },
});
export default HomeScreen;
