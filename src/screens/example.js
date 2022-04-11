// import React, {Component} from 'react';
// import {View, StyleSheet, Text, Dimensions} from 'react-native';
// import {Provider, Appbar} from 'react-native-paper';
// import {StackedBarChart} from 'react-native-chart-kit';
// import bankdata from '../data/csvjson2.json';

// const DetailsScreen = ({props}) => {
//   const dataset = bankdata;
//   const data_reformat = dataset.map((data, index) => ({
//     ...data,
//     AmountNeg: Object.entries(dataset[index])[4][1] * -1,
//     month: Object.entries(dataset[index])[0][1].slice(3, 5),
//     day: Object.entries(dataset[index])[0][1].slice(0, 2),
//     year: Object.entries(dataset[index])[0][1].slice(6, 10),
//     Date2: new Date(
//       Object.entries(dataset[index])[0][1].slice(6, 10),
//       Object.entries(dataset[index])[0][1].slice(3, 5),
//       Object.entries(dataset[index])[0][1].slice(0, 2),
//     ),
//   }));

//   const data = {
//     labels: [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ],
//     legend: [...new Set(data_reformat.map(item => item.Category))], // [ 'A', 'B']

//     data: [
//       [60, 60, 60],
//       [30, 30, 60],
//       [60, 60, 60],
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//     ],
//     barColors: ['#F2E96D', '#E9D40B', '#B6AB0E'],
//   };
//   const _goBack = () => console.log('Went back');
//   const _handleSearch = () => console.log('Searching');
//   const _handleMore = () => console.log('Shown more');
//   return (
//     <Provider>
//       <Appbar.Header style={styles.header}>
//         <Appbar.BackAction onPress={_goBack} />
//         <Appbar.Content title="My App" subtitle="Subtitle" />
//         <Appbar.Action icon="magnify" onPress={_handleSearch} />
//         <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
//       </Appbar.Header>
//       <View style={styles.mainbox}>
//         <Text style={styles.title}>
//           React Native StackedBar chart Example - MyWebtuts.com
//         </Text>
//         <StackedBarChart
//           data={data}
//           width={380}
//           height={400}
//           strokeWidth={16}
//           radius={20}
//           chartConfig={{
//             backgroundColor: '#218838',
//             backgroundGradientFrom: '#e2e2e2',
//             backgroundGradientTo: '#e2e2e2',
//             decimalPlaces: 2, // optional, defaults to 2dp
//             color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: '6',
//               strokeWidth: '2',
//               stroke: '#218838',
//             },
//           }}
//           style={{
//             marginVertical: 8,
//             borderRadius: 16,
//           }}
//           hideLegend={false}
//         />
//       </View>
//     </Provider>
//   );
// };
// const styles = StyleSheet.create({
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   mainbox: {
//     textAlign: 'center',
//     margin: 5,
//     justifyContent: 'space-between',
//   },
// });

// export default DetailsScreen;
