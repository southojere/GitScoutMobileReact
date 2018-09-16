import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Screens
import Search from './Screens/Search'
import Favourites from './Screens/Favourites'
import History from './Screens/History'
import SearchResults from './Screens/SearchResults'
//navigation
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

//Navigation for search to searchResults

const HomeStack = createStackNavigator({
  Search: { screen: Search },
  SearchResults: { screen: SearchResults },
});


export default createBottomTabNavigator({
  Search: { screen: HomeStack },
  History: { screen: History },
  Favourites: { screen: Favourites }
},
  {
    navigationOptions: ({ navigation }) => ({
     
      tabBarIcon: ({ focused, tintColor }) => {
        if(navigation.routeName == "SearchResults"){
          return;
        }
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        } else if (routeName === 'Favourites') {
          iconName = `ios-star${focused ? '' : '-outline'}`;
        } else if (routeName === 'History') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
  }
);

