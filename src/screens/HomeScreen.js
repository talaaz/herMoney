import React from 'react';
import {Button, Text, View} from 'react-native';
import bankdata from '../data/csvjson.json';
import {useState} from 'react';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';

const HomeScreen = ({navigation}) => {
  const dataset = bankdata;

  const data_reformat = dataset.map((data, index) => ({
    ...data,
    AmountNeg: Object.entries(dataset[index])[4][1] * -1,
    month: Object.entries(dataset[index])[0][1].slice(4, 6),
    day: Object.entries(dataset[index])[0][1].slice(0, 2),
    year: Object.entries(dataset[index])[0][1].slice(6, 10),
    Date2: new Date(
      Object.entries(dataset[index])[0][1].slice(6, 10),
      Object.entries(dataset[index])[0][1].slice(3, 5),
      Object.entries(dataset[index])[0][1].slice(0, 2),
    ),
    // weekNumber: getWeek(Object.entries(dataset[11])[0][1]),
    //Object.entries(dataset[index])[0][1].slice(0,2)+"-"+Object.entries(dataset[index])[0][1].slice(3,5)+"-"+Object.entries(dataset[index])[0][1].slice(6,10)
  }));

  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000},
  ];

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data_reformat} x="Amount" y="month" />
      </VictoryChart>

      <Text>Home Screen</Text>
      <Button
        title="Go to Details123"
        onPress={() => navigation.navigate('Details')}
      />

      <Text>Text: {console.log(dataset)}</Text>
    </View>
  );
};

export default HomeScreen;
