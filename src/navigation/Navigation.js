import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import BottomTabNavigator from './bottom_tab/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const Navigation = props => {
  return (
    <NavigationContainer initialRouteName="bottomTab">
      <Stack.Navigator>
        <Stack.Screen
          name="bottomTab"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
