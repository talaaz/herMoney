import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
  VictoryVoronoiContainer,
  VictoryTooltip,
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
    <View style={styles.PrecentageChart}>
      <VictoryChart
        height={300}
        width={400}
        domainPadding={{x: 30, y: 20}}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({datum}) => parseInt(datum.y)}
            labelComponent={
              <VictoryTooltip
                style={{fontSize: '15px', fill: 'black'}}
                cornerRadius={2}
                pointerLength={30}
                active={true}
                flyoutStyle={{
                  fill: 'white',
                }}
                text={({datum}) =>
                  'The percentage is ' + parseInt(datum.y) + '%'
                }
              />
            }
          />
        }>
        <VictoryStack colorScale={colorScale}>
          {dataset.map((data, i) => {
            return <VictoryBar data={data} key={i} />;
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
        <VictoryAxis
          style={{
            axis: {stroke: '#000'},
            ticks: {stroke: '#000'},
            tickLabels: {
              padding: 15,
              angle: -45,
              verticalAnchor: 'middle',
            },
          }}
          tickFormat={dataset.x}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  PrecentageChart: {
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
