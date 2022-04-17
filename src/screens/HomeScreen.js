import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
  VictoryLabel,
  VictoryScatter,
  VictoryBrushContainer,
  VictoryZoomContainer,
} from 'victory-native';
import {ProgressBar, Colors} from 'react-native-paper';
import * as Progress from 'react-native-progress';

import transformedData from '../functions/transaction';
import {Picker} from '@react-native-picker/picker';
import {LineChart} from '../component/LineChart';
import {CategoryChart} from '../component/CategoryChart';
import {PercentageChart} from '../component/PercentageChart';
const HomeScreen = ({navigation}) => {
  const data = transformedData('VIZ_01').data;
  const dataset = transformedData('VIZ_02');
  const datasetCat = transformedData('VIZ_03').data;
  var distinct_list = [...new Set(datasetCat.map(({cat}) => cat))];
  const asa = data.map(t => ({
    x: t.DayOfYear,
    y: t.BankBalance,
  }));
  const colorScale = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
  ];

  const datasetCat2 = transformedData('VIZ_04').data;

  function myFunction(month, category) {
    var total = 0;

    datasetCat2
      .filter(data => data.transactionDate === month)
      .map((data, i) => {
        // total = total + data.amount;
        if (data.Category === category) {
          total = total + data.amount;
        } else {
          0;
        }
        // console.log('total: ' + total);
      });
    return total.toFixed(3);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Total Balance</Text>
      <LineChart />

      <Text style={styles.text}>Spending</Text>
      <PercentageChart />
      <ProgressBar
        progress={Math.round((-2100 / 3000) * 100) * 100}
        color={Colors.red800}
      />
      <Progress.Circle size={30} indeterminate={true} />
      <Progress.Pie progress={0.4} size={50} />

      <ScrollView horizontal={true}>
        {distinct_list.map((item, i) => {
          return (
            <View style={styles.card_template}>
              <Text>{myFunction('January', item)}</Text>
              <Progress.Pie
                progress={
                  Math.round((myFunction('January', item) / 3000) * 100) / 100
                }
                size={50}
              />
              <ProgressBar
                progress={
                  Math.round((myFunction('January', item) / 3000) * 100) / 100
                }
                color={colorScale[i]}
              />
              <View
                style={[
                  styles.text_container,
                  {backgroundColor: colorScale[i]},
                ]}>
                <Text style={styles.card_title}>{item}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Text style={styles.text}>Categories</Text>
      <CategoryChart />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },

  text: {
    fontWeight: 'bold',
    margin: 10,
  },
  card_template: {
    width: 250,
    height: 250,
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
    margin: 10,
    borderRadius: 10,
  },
  card_image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    margin: 10,
  },
  text_container: {
    position: 'absolute',
    width: 250,
    height: 30,
    bottom: 0,
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: 10,
  },
  card_title: {
    color: 'white',
  },
});
export default HomeScreen;
