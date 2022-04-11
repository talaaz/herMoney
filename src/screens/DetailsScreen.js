import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import {Provider, Appbar} from 'react-native-paper';
import {StackedBarChart, PieChart} from 'react-native-chart-kit';
import bankdata from '../data/csvjson2.json';

const DetailsScreen = ({props}) => {
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
    return [item.month, item.Category]; // item.month]; //item.Category,
  });

  function getNum(val) {
    if (isNaN(val)) {
      return 0;
    }
    return val;
  }

  function transformData(dataset) {
    const months = [
      1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
    ];
    const monthName = [
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

    return dataset.map(data => {
      return data.map((datum, i) => {
        return {x: datum.Category, z: datum.month, y: getNum(datum.Amount)};
      });
    });
  }
  const dataTala = transformData(result);

  const dataTalaTotal = dataTala.map((data, index) => ({
    ...data,
    total: data.reduce(function (sum, tax) {
      return sum + tax.y;
    }, 0),
  }));

  const perChunk = 7;

  const resultttt = dataTalaTotal.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  const dataTalaTotal2 = resultttt.map((data, index) => ({
    ...data,
    totalMonth: data.reduce(function (sum, tax) {
      return sum + tax.total;
    }, 0),
  }));

  const data = {
    labels: [
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
    ],
    legend: [...new Set(data_reformat.map(item => item.Category))],

    data: [
      [
        (7240 / -6063) * 100,
        (-688 / -6063) * 100,
        (-2954 / -6063) * 100,
        (-2133 / -6063) * 100,
        (-849 / -6063) * 100,
        (-335 / -6063) * 100,
        (-6344 / -6063) * 100,
      ],
      [
        (-1806 / 562) * 100,
        (-2954 / 562) * 100,
        (14701 / 562) * 100,
        (-1362 / 562) * 100,
        (-4146 / 562) * 100,
        (-769 / 562) * 100,
        (-3103 / 562) * 100,
      ],
      [
        (-2698 / -1099) * 100,
        (-2954 / -1099) * 100,
        (13212 / -1099) * 100,
        (-2042 / -1099) * 100,
        (-2883 / -1099) * 100,
        (-2520 / -1099) * 100,
        (-1214 / -1099) * 100,
      ],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    barColors: [
      '#EC5565',
      '#E9D40B',
      '#B6AB0E',
      '#F26E53',
      '#16E7EC',
      '#FFCE55',
      '#5BC1A6',
    ],
  };

  return (
    <Provider>
      <ScrollView>
        <Text style={styles.title}>
          React Native StackedBar chart Example - MyWebtuts.com
        </Text>

        <StackedBarChart
          data={data}
          width={380}
          height={900}
          //strokeWidth={16}
          //radius={20}
          chartConfig={{
            backgroundColor: '#218838',
            backgroundGradientFrom: '#e2e2e2',
            backgroundGradientTo: '#e2e2e2',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#218838',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          hideLegend={false}
        />
      </ScrollView>
    </Provider>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  mainbox: {
    textAlign: 'center',
    margin: 5,
    justifyContent: 'space-between',
  },
});

export default DetailsScreen;
