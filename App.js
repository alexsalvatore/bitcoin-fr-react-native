import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './components/Home';
import Events from './components/Events';
import Stock from './components/Stock';
import {  createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {Platform} from 'react-native';
import CustomWebView from './components/CustomWebView';

export default class App extends CustomWebView  {

  constructor(props){
    super(props);
    this.state = {
        origin : 'https://bitcoin.fr/',
        url : 'https://bitcoin.fr/',
    }
}

}