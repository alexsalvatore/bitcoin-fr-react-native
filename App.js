import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './components/Home';
import Events from './components/Events';
import Stock from './components/Stock';
import {  createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {Platform} from 'react-native';

//Stack Navigator are just a list of screen that follows
/*
const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Stock: {screen: Stock},
}
)
Home.navigationOptions = { tabBarLabel: 'Accueil' };
Stock.navigationOptions = { tabBarLabel: 'Cours BTC' };
*/

const HomeStackNavigator = createStackNavigator({
  Home: {screen: Home}
})

//https://aboutreact.com/react-native-bottom-navigation/

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStackNavigator,
        navigationOptions:{
          title: 'Accueil',
          /*tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-search" style={{color:tintColor}} />
          )*/
        }
      },
      Events: { screen: Events,
        navigationOptions:{
          title: 'Événements',
          /*tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-search" style={{color:tintColor}} />
          )*/
        } },
      Stock: { screen: Stock,
        navigationOptions:{
          title: 'Cours du BTC',
          /*tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-search" style={{color:tintColor}} />
          )*/
        } },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;

        let platform = (Platform.OS === " ios")? 'ios' : 'md';
        console.log("plateform = "+platform);

        if (routeName === 'Home') {
          iconName = platform+'-home';
        }else if (routeName === 'Events') {
            iconName =  platform+'-calendar';
        } else if (routeName === 'Stock') {
          iconName =  platform+'-analytics';
        } 

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#318ce7',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#318ce7',
    paddingTop: 35,
  },
});*/
