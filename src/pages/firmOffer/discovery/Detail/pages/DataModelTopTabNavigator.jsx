//弃用
// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import AllIncomeScreen from './pages/allIncome';
// import ProfitScreen from './pages/profit';

// import CustomTopNavBar from '../../../../../components/TopNavBar';

// const Tab = createMaterialTopTabNavigator();

// const DataModelTopTabNavigator = ({ data }) => {
//   console.log('DataModelTopTabNavigator', data);
  
//   return (
//     <Tab.Navigator
//       initialRouteName="累计收益"
//       tabBar={(props) => (
//         <CustomTopNavBar 
//           {...props} 
//           customStyles={{
//             container: {
//               paddingLeft: 0,
//             },
//           }}
//         />
//       )}
//       screenOptions={{
//         tabBarStyle: { elevation: 0 },
//         lazy: true,
//         swipeEnabled: true,
//       }}
//     >
//       <Tab.Screen 
//         name="累计收益" 
//         component={AllIncomeScreen} 
//         initialParams={{ id: data }}
//         options={{
//           tabBarLabel: '累计收益',
//         }}
//       />
//       <Tab.Screen 
//         name="累计收益率" 
//         component={ProfitScreen} 
//         initialParams={{ id: data }}
//         options={{
//           tabBarLabel: '累计收益率',
//         }}
//       />
//     </Tab.Navigator>
//   );
// };


// export default DataModelTopTabNavigator;