import React from 'react';
import { StyleSheet, Text, View, WebView, ActivityIndicator } from 'react-native';
import Home from './components/Home';
import Stock from './components/Stock';
import {  createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Stock: {screen: Stock},
})

Home.navigationOptions = { tabBarLabel: 'Accueil' };
Stock.navigationOptions = { tabBarLabel: 'Cours BTC' };


const App = createAppContainer(MainNavigator);
export default App;

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#318ce7',
    paddingTop: 35,
  },
});*/
