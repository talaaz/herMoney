import React from 'react';
import {Button, Text, View, ScrollView} from 'react-native';
import bankdata from '../data/csvjson.json';
import {useState} from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryZoomContainer,
  VictoryAxis,
  VictoryStack,
} from 'victory-native';

const HomeScreen = ({navigation}) => {
  const dataset = bankdata;

  const data_reformat = dataset.map((data, index) => ({
    ...data,
    AmountNeg: Object.entries(dataset[index])[4][1] * -1,
    month: Object.entries(dataset[index])[0][1].slice(3, 5),
    day: Object.entries(dataset[index])[0][1].slice(0, 2),
    year: Object.entries(dataset[index])[0][1].slice(6, 10),
    Date2: new Date(
      Object.entries(dataset[index])[0][1].slice(6, 10),
      Object.entries(dataset[index])[0][1].slice(3, 5),
      Object.entries(dataset[index])[0][1].slice(0, 2),
    ),
    //weekNumber: getWeek(Object.entries(dataset[11])[0][1]),
    //Object.entries(dataset[index])[0][1].slice(0,2)+"-"+Object.entries(dataset[index])[0][1].slice(3,5)+"-"+Object.entries(dataset[index])[0][1].slice(6,10)
  }));
  const negative_amount = data_reformat
    .filter(data => data.Amount <= 0)
    .map((data, index) => ({Amount: data.Amount * -1, date: data.Date}));

  const positive_amount = data_reformat
    .filter(data => data.Amount > 0)
    .map((data, index) => ({Amount: data.Amount, date: data.Date}));

  const positive_sum = positive_amount.reduce((accumulator, object) => {
    return accumulator + object.Amount;
  }, 0);

  const negative_sum =
    -1 *
    negative_amount.reduce((accumulator, object) => {
      return accumulator + object.Amount;
    }, 0);

  const domains = {
    month: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    day: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  };
  function groupBy(collection, property) {
    var i = 0,
      val,
      index,
      values = [],
      result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }
  const month_groups = groupBy(data_reformat, 'month');
  function groupBySecond(collection) {
    var i = 0,
      j = 0,
      result = [];
    for (; i < collection.length; i++) {
      result.push(groupBy(collection[i], 'Category'));
    }
    return result;
  }
  const grouped = groupBySecond(month_groups);

  return (
    <ScrollView style={{flex: 1}}>
      <Text>Home Screen</Text>

      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          interpolation="natural"
          style={{
            data: {stroke: 'green'},
            parent: {border: '1px solid #ccc'},
          }}
          data={positive_amount}
          y="Amount"
          x="date"
        />
        <VictoryLine
          interpolation="natural"
          style={{
            data: {stroke: '#c43a31'},
            parent: {border: '1px solid #ccc'},
          }}
          data={negative_amount}
          y="Amount"
          x="date"
        />
      </VictoryChart>

      <Button
        title="Go to Details123"
        onPress={() => navigation.navigate('Details')}
      />

      <Text>Text: {console.log()}</Text>
      <Text>amount first element: {data_reformat[0].Amount}</Text>
      <Text>
        amount pos:
        {positive_sum}
      </Text>
      <Text>
        amount neg:
        {negative_sum}
      </Text>
    </ScrollView>
  );
};

export default HomeScreen;
