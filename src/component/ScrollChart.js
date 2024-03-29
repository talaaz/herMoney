import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import transformedData from '../functions/transaction';
import {Picker} from '@react-native-picker/picker';
import {ProgressBar, Colors} from 'react-native-paper';

export const ScrollChart = ({}) => {
  const datasetCat2 = transformedData('GOALS').data;

  var distinct_list = [...new Set(datasetCat2.map(({Category}) => Category))];
  var distinct_listMonth = [
    ...new Set(
      datasetCat2.map(({transactionDateMonth}) => transactionDateMonth),
    ),
  ];
  var distinct_listYear = [
    ...new Set(datasetCat2.map(({transactionDateYear}) => transactionDateYear)),
  ];

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

  function myFunction(month, year, category) {
    var total = 0;
    datasetCat2
      .filter(
        data =>
          data.transactionDateMonth === month &&
          data.transactionDateYear == year,
      )
      .map((data, i) => {
        if (data.Category === category) {
          total = total + data.amount;
        } else {
          0;
        }
      });
    return total.toFixed(3);
  }
  const [text, setText] = React.useState('3000');
  const [selectedValueMonth, setSelectedValueMonth] = useState(
    distinct_listMonth[0],
  );
  const [selectedValueYear, setSelectedValueYear] = useState(
    distinct_listYear[0],
  );

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Picker
            selectedValue={selectedValueMonth}
            style={{height: 50, width: 200}}
            onValueChange={itemValue => setSelectedValueMonth(itemValue)}>
            {distinct_listMonth.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>
        </View>
        <View style={{flex: 1}}>
          <Picker
            selectedValue={selectedValueYear}
            style={{height: 50, width: 200}}
            onValueChange={itemValue => setSelectedValueYear(itemValue)}>
            {distinct_listYear.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>
        </View>
      </View>
      <ScrollView horizontal={true}>
        {distinct_list.map((item, i) => {
          return (
            <View style={styles.card_template}>
              <View style={styles.card_amount}>
                <Text style={styles.amountText}>
                  {myFunction(selectedValueMonth, selectedValueYear, item)} DKK
                </Text>
              </View>
              <View
                style={[
                  styles.text_container,
                  {backgroundColor: colorScale[i]},
                ]}>
                <Text style={styles.card_title}>{item}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },

  text: {
    fontWeight: 'bold',
    margin: 10,
  },
  card_template: {
    height: 150,
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
    borderRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 5,
    margin: 10,
    width: 250,
  },
  card_amount: {
    margin: 10,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text_container: {
    position: 'absolute',
    width: 250,
    height: 30,
    bottom: 0,
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    margin: 0,
    flex: 2,
  },
  card_title: {
    color: 'white',
  },
  amountText: {
    fontWeight: 'bold',
    margin: 30,
  },
});
