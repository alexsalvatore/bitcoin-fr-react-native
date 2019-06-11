import React, {Component} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, Linking} from 'react-native'
import { WebView } from 'react-native-webview'
import style from '../Style'
import CustomWebView from './CustomWebView'

export default class Home extends CustomWebView {


    constructor(props){
        super(props);
        this.state = {
            url : 'https://bitcoin.fr/',
        }
    }

   
}