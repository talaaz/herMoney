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


const currentDate = moment(new Date(), 'DD.MM.YYYY');
var month = currentDate.format('DD');
console.log(month);

// Datastructure populated
const pickerData = [
  {
    title: "Past 3 months",
    interval: { start: 26, end: 117 }
  },
  {
    title: "Past 6 months",
    interval: { start: 1, end: 117 }
  },  
  {
    title: "Past 9 months",
    interval: { start: 1, end: 117 }
  },  
  {
    title: "Past year",
    interval: { start: 1, end: 117 }
  },
]
export const LineChart = ({}) => {
  const data = transformedData('VIZ_01').data;
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const [selectedValueQuarter, setSelectedValueQuarter] = useState(
    pickerData[0].interval,
  );
  

  const filteredData = data.filter(element => {
    return element.DayOfYear >= selectedValueQuarter.start;

  })

  const finalData = filteredData.map(t => {
    return {
      x: t.DayOfYear,
      y: t.BankBalance,
      month: t.Month,
      day: t.DayOfMonth,
    }
  })

  return (
    <View>
      <Picker
      selectedValue={selectedValueQuarter}
      onValueChange={itemValue => setSelectedValueQuarter(itemValue)}
            style={{height: 50, width: 200}}>
              {
                pickerData.map((item, index) => {
                  return <Picker.Item label={item.title} value={item.interval} key={index} />;
                })
              }
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
                  datum.day + ' ' + datum.month + ': ' + parseInt(datum.y) + ' ' + 'DKK'
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
          text="Bankbalance over time"
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
