import React from 'react';
import {
  Button,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
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
              {d.amount > 0 ? (
                <View style={styles.transactionContainerPos}>
                  <Text style={styles.transactionTitlePos}>{d.Text}</Text>
                  <Text style={styles.textPos}>
                    Amount received: {d.amount}
                  </Text>
                  <Text style={styles.textPos}>
                    Date: {d.transactionDateFull2}
                  </Text>
                </View>
              ) : (
                <View style={styles.transactionContainerNeg}>
                  <Text style={styles.transactionTitleNeg}>{d.Text}</Text>

                  <Text style={styles.textNeg}>Amount spent: {d.amount}</Text>

                  <Text style={styles.textNeg}>
                    Date: {d.transactionDateFull2}
                  </Text>
                </View>
              )}
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionContainerNeg: {
    marginVertical: 6,
    padding: 10,
    margin: 10,
    borderRadius: 4,
    backgroundColor: '#f6b4c3',
  },
  transactionContainerPos: {
    marginVertical: 6,
    padding: 10,
    margin: 10,
    borderRadius: 4,
    backgroundColor: '#A9FBCD',
  },
  transactionTitlePos: {
    fontWeight: 'bold',
    color: 'green',
  },
  transactionTitleNeg: {
    fontWeight: 'bold',
    color: '#c4193f',
  },

  textPos: {
    color: 'green',
  },
  textNeg: {
    color: '#c4193f',
  },
});
export default DetailsScreen;
