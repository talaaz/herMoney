import React from 'react';
import {Button, Text, View, ScrollView} from 'react-native';
import bankdata from '../data/csvjson2.json';
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

  function arrayFromObject(obj) {
    var arr = [];
    for (var i in obj) {
      arr.push(obj[i]);
    }
    return arr;
  }

  function groupBy(list, fn) {
    var groups = {};
    for (var i = 0; i < list.length; i++) {
      var group = JSON.stringify(fn(list[i]));
      if (group in groups) {
        groups[group].push(list[i]);
      } else {
        groups[group] = [list[i]];
      }
    }
    return arrayFromObject(groups);
  }
  const result = groupBy(data_reformat, function (item) {
    return [item.month]; // item.month]; //item.Category,
  });

  // console.log(result);

  function getNum(val) {
    if (isNaN(val)) {
      return 0;
    }
    return val;
  }

  function transformData(dataset) {
    const months = [
      143482, -219753, -6, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
    ];

    return dataset.map(data => {
      return data.map((datum, i) => {
        return {
          x: datum.Category,
          z: datum.month,
          y: getNum(datum.Amount / months[i]) * 100,
        };
      });
    });
  }

  const dataTala = transformData(result);
  const final = dataTala.map((data, index) => ({
    ...data,
    total: data.reduce(function (sum, tax) {
      return sum + tax.y;
    }, 0),
  }));

  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    <ScrollView>
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

      <VictoryChart height={400} width={400} domainPadding={{x: 10, y: 20}}>
        <VictoryStack colorScale={['black', 'blue', 'tomato', 'red']}>
          {dataTala.map((data, i) => {
            return <VictoryBar data={data} key={i} />;
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
        <VictoryAxis tickFormat={month} />
      </VictoryChart>

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
