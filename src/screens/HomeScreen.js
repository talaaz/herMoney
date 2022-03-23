import React from 'react';
import {Button, Text, View} from 'react-native';
import bankdata from '../data/csvjson.json';
import {useState} from 'react';

const HomeScreen = ({navigation}) => {
  const [text, setText] = useState();

  const dataset = bankdata;
  //const customData = require('./customData.json');
  const data_reformat = dataset.map((data, index) => ({
    ...data,
    AmountNeg: Object.entries(dataset[index])[4][1] * -1,
    month: Object.entries(dataset[index])[0][1].slice(4, 6),
    day: Object.entries(dataset[index])[0][1].slice(0, 2),
    year: Object.entries(dataset[index])[0][1].slice(6, 10),
    Date2: new Date(
      Object.entries(dataset[index])[0][1].slice(6, 10),
      Object.entries(dataset[index])[0][1].slice(3, 5),
      Object.entries(dataset[index])[0][1].slice(0, 2),
    ),
    // weekNumber: getWeek(Object.entries(dataset[11])[0][1]),
    //Object.entries(dataset[index])[0][1].slice(0,2)+"-"+Object.entries(dataset[index])[0][1].slice(3,5)+"-"+Object.entries(dataset[index])[0][1].slice(6,10)
  }));

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details123"
        onPress={() => navigation.navigate('Details')}
      />

      <Text>Text: {console.log(data_reformat[0])}</Text>
    </View>
  );
};

export default HomeScreen;
