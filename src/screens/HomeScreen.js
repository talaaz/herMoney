import React, {useState} from 'react';
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
  VictoryLabel,
  VictoryScatter,
  VictoryBrushContainer,
  VictoryZoomContainer,
} from 'victory-native';
import transformedData from '../functions/transaction';
import {Picker} from '@react-native-picker/picker';

const HomeScreen = ({navigation}) => {
  const data = transformedData('VIZ_01').data;
  const dataset = transformedData('VIZ_02');
  const datasetCat = transformedData('VIZ_03').data;

  const asa = data.map(t => ({
    x: t.DayOfYear,
    y: t.BankBalance,
  }));
  const [selectedValue, setSelectedValue] = useState('java');
  let arr = [];
  var distinct_list = [...new Set(datasetCat.map(({cat}) => cat))];
  const [selectedDomain, setSelectedDomain] = useState();
  const [zoomDomain, setZoomDomain] = useState();

  const handleZoom = domain => {
    setSelectedDomain(domain);
  };

  const handleBrush = domain => {
    setZoomDomain(domain);
  };
  const month = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

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
          <VictoryScatter
            data={asa}
            x="DayOfYear"
            size={0.4}
            style={{data: {fill: 'red'}}}
          />
        </VictoryChart>
      </View>
      <Text style={styles.text}>SPENDING</Text>
      <VictoryChart height={300} width={450} domainPadding={{x: 30, y: 20}}>
        <VictoryStack
          colorScale={[
            '#003f5c',
            '#2f4b7c',
            '#665191',
            '#a05195',
            '#d45087',
            '#f95d6a',
            '#ff7c43',
            '#ffa600',
          ]}>
          {dataset.map((data, i) => {
            return <VictoryBar data={data} key={i} />;
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={tick => `${tick}%`} />
        <VictoryAxis tickFormat={dataset.x} />
      </VictoryChart>
      <Text style={styles.text}>Categories</Text>
      <Picker
        selectedValue={selectedValue}
        style={{height: 50, width: 300}}
        onValueChange={itemValue => setSelectedValue(itemValue)}>
        {distinct_list.map((item, index) => {
          return <Picker.Item label={item} value={item} key={index} />;
        })}
      </Picker>
      <VictoryChart
        height={300}
        width={400}
        scale={{x: 'time'}}
        containerComponent={
          <VictoryZoomContainer
            responsive={false}
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }>
        {datasetCat
          .filter(data => data.cat === selectedValue.toString())
          .map((data, i) => {
            let newArr = new Array(10).fill(0).map(v => ({...data}));
            return (
              <VictoryBar
                barRatio={0.1}
                alignment="start"
                data={newArr}
                x="x"
                y="y"
                labels={({datum}) => `${datum.y}`}
              />
            );
          })}
        <VictoryAxis tickFormat={x => month[new Date(x).getMonth()]} />
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
