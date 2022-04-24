import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {DefaultTheme} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryZoomContainer,
  VictoryLabel,
  createContainer,
  VictoryAxis,
} from 'victory-native';
import transformedData from '../functions/transaction';
import moment from 'moment';

export const LineChart = ({}) => {
  const data = transformedData('VIZ_01').data;
  
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const [selectedValueQuarter, setSelectedValueQuarter] = useState(
    'Quarter one',
  );

  const filteredData = data.filter(element => {
    return element.Quarter === selectedValueQuarter;

  })

  const finalData = filteredData.map(t => {
    return {
      x: t.DayOfYear,
      y: t.BankBalance,
    }
  })

  return (
    <View>
      <Picker
      selectedValue={selectedValueQuarter}
      onValueChange={itemValue => setSelectedValueQuarter(itemValue)}
            style={{height: 50, width: 200}}>
            <Picker.Item label='Quarter One' value='Quarter One' key={0} />
            <Picker.Item label='Quarter Two' value='Quarter Two' key={1} />
            <Picker.Item label='Quarter Three' value='Quarter Three' key={2} />
            <Picker.Item label='Quarter Four' value='Quarter Four' key={3} />
          </Picker>
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
                text={({datum}) =>
                  'Day' + datum.x + ' ' + parseInt(datum.y) + 'DKK'
                }
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
          data={finalData}
          x="DayOfYear"
        />
        <VictoryScatter
          data={finalData}
          x="DayOfYear"
          size={0.4}
          style={{data: {fill: 'tomato'}}}
        />
        <VictoryLabel
          x={225}
          y={25}
          textAnchor="middle"
          text="Spending Timeline"
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
          tickFormat={finalData.x}
          label="Day of year"
        />
      </VictoryChart>
    </View>

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
