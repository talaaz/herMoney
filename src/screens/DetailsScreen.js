import React from 'react';
import {
  Button,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
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

const DetailsScreen = ({props}) => {
  const data = transformedData('DETAILS').data;
  const data2 = data.sort(
    (a, b) => b.transactionDateFull - a.transactionDateFull,
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {data2.map(d => {
          return (
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.transactionContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.transactionTitle}>{d.Text}</Text>
                  <Text>Amount received:</Text>
                  <Text>Date: {d.transactionDateFull2}</Text>
                </View>
                {d.amount > 0 ? (
                  <Text style={styles.textPos}> {d.amount}</Text>
                ) : (
                  <Text style={styles.textNeg}>{d.amount}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    marginVertical: 4,
    padding: 10,
    margin: 6,
    borderRadius: 4,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
  },
  transactionTitle: {
    fontWeight: 'bold',
    color: 'black',
  },

  textPos: {
    color: 'green',
    fontSize: 18,
    textAlign: 'right',
  },
  textNeg: {
    color: '#c4193f',
    fontSize: 18,
    textAlign: 'right',
  },
});
export default DetailsScreen;
