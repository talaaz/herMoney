import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
} from 'victory-native';
import transformedData from '../functions/transaction';

export const LineChart = ({}) => {
  const data = transformedData('VIZ_01').data;

  const asa = data.map(t => ({
    x: t.DayOfYear,
    y: t.BankBalance,
  }));
  return (
    <View style={styles.lineChart}>
      <VictoryChart
        width={400}
        height={200}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({datum}) => parseInt(datum.y)}
            labelComponent={
              <VictoryTooltip
                style={{fontSize: '15px', fill: 'black'}}
                cornerRadius={15}
                pointerLength={10}
                active={true}
                flyoutStyle={{
                  fill: 'red',
                }}
                text={({datum}) => parseInt(datum.y)}
              />
            }
          />
        }>
        <VictoryLine
          interpolation="natural"
          style={{
            data: {stroke: 'black'},
            parent: {border: '1px solid #ccc'},
            labels: {fill: 'black'},
          }}
          data={asa}
          x="DayOfYear"
        />
        <VictoryScatter
          data={asa}
          x="DayOfYear"
          size={0.4}
          style={{data: {fill: 'red'}}}
        />
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
