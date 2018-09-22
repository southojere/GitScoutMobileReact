import React from 'react';

//Screens
import Search from './src/Screens/Search'
import Favourites from './src/Screens/Favourites'
import History from './src/Screens/History'
import SearchResults from './src/Screens/SearchResults'
import UserProfile from './src/Screens/UserProfile'
//navigation
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

//Navigation for search to searchResults

const HomeStack = createStackNavigator({
  Search: { screen: Search },
  SearchResults: { screen: SearchResults },
  UserProfile: { screen: UserProfile}
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

