import React from 'react';
import {Button, Text, View} from 'react-native';
import transformedData from '../functions/transaction';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryStack,
  VictoryTooltip,
} from 'victory-native';

const DetailsScreen = ({props}) => {
  const data = transformedData('VIZ_01').data;
  const dataset = transformedData('VIZ_02');
  const asa = data.map(t => ({
    x: t.DayOfYear,
    y: t.BankBalance,
  }));
  return (
    <>
      <VictoryChart height={400} width={400} domainPadding={{x: 30, y: 20}}>
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
          {dataset.map((d, i) => {
            return <VictoryBar data={d} key={i} />;
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
        <VictoryAxis tickFormat={[]} />
      </VictoryChart>
    </>
  );
};

export default DetailsScreen;
