import React from 'react';
import {
  ScrollView, StyleSheet, Text,
  View
} from 'react-native';
import { GoalProgress } from '../component/GoalProgress';
import { LineChart } from '../component/LineChart';
import { PercentageChart } from '../component/PercentageChart';
import { ScrollChart } from '../component/ScrollChart';
import transformedData from '../functions/transaction';


const HomeScreen = ({navigation}) => {
  const total = transformedData('TotalAmount').data;
  
  const sum = total.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);

  var dagar = 20000 + sum;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Current Balance</Text>

      <View style={styles.totalCard}>
        <Text style={styles.text}>You have: {dagar.toFixed(2)}.- DKK</Text>
      </View>
      <Text style={styles.text}>Total Balance</Text>
      <LineChart />

      <Text style={styles.text}>Spending</Text>
      <PercentageChart />
      <ScrollChart key={1} />
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
