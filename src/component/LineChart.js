import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryZoomContainer,
  createContainer,
  VictoryAxis,
} from 'victory-native';
import transformedData from '../functions/transaction';

export const LineChart = ({}) => {
  const data = transformedData('VIZ_01').data;

  const asa = data.map(t => ({
    x: t.DayOfYear,
    y: t.BankBalance,
  }));

  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');

  return (
    <View style={styles.lineChart}>
      <VictoryChart
        width={400}
        height={200}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryZoomVoronoiContainer
            responsive={false}
            labels={({datum}) => parseInt(datum.y)}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{stroke: 'tomato', strokeWidth: 2, fill: 'white'}}
                style={{fontSize: '15px', fill: 'black'}}
                cornerRadius={2}
                pointerLength={10}
                active={true}
                text={({datum}) => parseInt(datum.y) + 'DKK'}
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
          style={{data: {fill: 'tomato'}}}
        />
        <VictoryAxis dependentAxis />
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
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  lineChart: {
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
