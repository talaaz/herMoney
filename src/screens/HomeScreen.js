import React from 'react';
import {Button, Text, View, StyleSheet, ScrollView} from 'react-native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
} from 'victory-native';
import transformedData from '../functions/transaction';

const HomeScreen = ({navigation}) => {
  const data = transformedData('VIZ_01').data;
  const dataset = transformedData('VIZ_02');
  const asa = data.map(t => ({
    x: t.DayOfYear,
    y: t.BankBalance,
  }));
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Total Balance</Text>
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
        </VictoryChart>
      </View>
      <Text style={styles.text}>SPENDING</Text>
      <VictoryChart height={400} width={450} domainPadding={{x: 30, y: 20}}>
        <VictoryStack
          colorScale={[
            '#2a0cd0',
            '#5ac50f',
            '#c5534e',
            '#443885',
            '#aeb8b1',
            '#996429',
            '#f3f',
            '#4ae2fd',
            '#792f3f',
          ]}>
          {dataset.map((data, i) => {
            return <VictoryBar data={data} key={i} />;
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
        <VictoryAxis tickFormat={dataset.x} />
      </VictoryChart>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  lineChart: {
    backgroundColor: '#BCBCBC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  text: {
    fontWeight: 'bold',
    margin: 10,
  },
});
export default HomeScreen;
