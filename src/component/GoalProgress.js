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

import transformedData from '../functions/transaction';
import {ProgressBar, Colors, IconButton, TextInput} from 'react-native-paper';

export const GoalProgress = ({}) => {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>Your goal is to spare : {text} DKK</Text>
        </View>
        <View style={{flex: 1}}>
          <IconButton
            icon="pencil"
            color={Colors.red500}
            size={20}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      <Text>You are 50% away from your goal</Text>
      <View style={styles.mainbox}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                label="Make a goal"
                placeholder="300"
                value={text}
                onChangeText={text => setText(text)}
              />
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setText(text);
                }}>
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <ProgressBar progress={0.5} color={Colors.red900} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    paddingBottom: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    margin: 10,
    fontSize: 15,
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
    width: 250,
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
