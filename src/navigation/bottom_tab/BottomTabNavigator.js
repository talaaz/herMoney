import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: '#ad1638',
    },
    headerTintColor: '#e5e5e5',
    headerBackTitle: '',
    tabBarStyle: [{backgroundColor: '#ad1638'}],
  };
  return (
    <Tab.Navigator screenOptions={screenOptionStyle}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Overview',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="trending-up"
              color="white"
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cash" color="white" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
