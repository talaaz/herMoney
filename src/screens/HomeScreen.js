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
import {GoalProgress} from '../component/GoalProgress';
import {ProgressBar, Colors} from 'react-native-paper';

const HomeScreen = ({navigation}) => {
  const total = transformedData('TotalAmount').data;

  const sum = total.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Total Balance</Text>

      <View style={styles.totalCard}>
        <Text style={styles.text}>You have: {sum.toFixed(2)} </Text>
      </View>
      <Text style={styles.text}>Total Balance</Text>
      <LineChart />

      <Text style={styles.text}>Spending</Text>
      <PercentageChart />
      <ScrollChart />
      {/* 
      <Text style={styles.text}>Categories</Text> */}
      {/* <CategoryChart /> */}

      <GoalProgress />
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
  totalCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
  },
});
export default HomeScreen;
