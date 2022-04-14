import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
} from 'victory-native';
import transformedData from '../functions/transaction';

export const PercentageChart = ({}) => {
  const dataset = transformedData('VIZ_02');
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
  return (
    <View style={styles.lineChart}>
      <VictoryChart height={300} width={400} domainPadding={{x: 30, y: 20}}>
        <VictoryStack colorScale={colorScale}>
          {dataset.map((data, i) => {
            return <VictoryBar data={data} key={i} />;
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
        <VictoryAxis tickFormat={dataset.x} />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  lineChart: {
    backgroundColor: '#BCBCBC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
});
