import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLabel,
  VictoryLegend,
} from 'victory-native';
import transformedData from '../functions/transaction';

import {ProgressBar, Colors, IconButton, TextInput} from 'react-native-paper';

export const PercentageChart = ({}) => {
  const dataset = transformedData('VIZ_02');
  const datasetCat2 = transformedData('GOALS').data;
  const [showLegend, setShowLegend] = useState('false');
  var distinct_list = [...new Set(datasetCat2.map(({Category}) => Category))];
  const colorScale = [
    '#003f5c',
    '#bad80a',
    '#ff8c00',
    '#a05195',
    '#00188f',
    '#f95d6a',
    '#00bcf2',
    '#ff8c00',
  ];
  const toVictoryLegend = line => {
    return line.color
      ? {
          name: line,
        }
      : {name: line};
  };
  return (
    <View style={styles.PrecentageChart}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>Show categories</Text>
        </View>
        <View style={{flex: 1}}>
          <IconButton
            icon="eye"
            color={Colors.red500}
            size={20}
            onPress={() => setShowLegend(true)}
          />
        </View>
      </View>
      <View style={styles.mainbox}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showLegend}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setShowLegend(!showLegend);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <IconButton
                icon="close"
                color={Colors.red500}
                size={20}
                onPress={() => setShowLegend(!showLegend)}
              />
              <VictoryLegend
                // title="Legend"
                // centerTitle
                orientation="vertical"
                // gutter={20}
                // style={{border: {stroke: 'black'}, title: {fontSize: 10}}}
                data={distinct_list.map((s, idx) => {
                  const item = toVictoryLegend(s);
                  return {...item, symbol: {fill: colorScale[idx]}};
                })}
              />
            </View>
          </View>
        </Modal>
      </View>
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
                text={({datum}) => datum.z + ': ' + parseInt(datum.y) + '%'}
              />
            }
          />
        }>
        <VictoryStack colorScale={colorScale}>
          {dataset.map((data, i) => {
            return <VictoryBar data={data} key={i} />;
          })}
        </VictoryStack>

        <VictoryLabel
          x={225}
          y={25}
          textAnchor="middle"
          text="Spending based on categories"
        />

        <VictoryAxis
          dependentAxis
          tickFormat={tick => `${tick}%`}
          label="percentage of each category"
          style={{
            tickLabels: {
              padding: 0,
              verticalAnchor: 'middle',
              fontSize: 8,
            },
          }}
        />
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
  mainbox: {
    //justifyContent: 'space-between',
    padding: 2,
    width: 350,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 600,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 290,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#ad1638',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
