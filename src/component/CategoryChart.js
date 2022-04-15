import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryLabel,
  VictoryZoomContainer,
} from 'victory-native';
import transformedData from '../functions/transaction';
import {Picker} from '@react-native-picker/picker';

export const CategoryChart = ({}) => {
  const datasetCat = transformedData('VIZ_03').data;

  var distinct_list = [...new Set(datasetCat.map(({cat}) => cat))];
  const [selectedValue, setSelectedValue] = useState(distinct_list[0]);

  const [zoomDomain, setZoomDomain] = useState();

  const handleZoom = domain => {
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
    <View style={styles.lineChart}>
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
