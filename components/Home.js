import * as React from 'react';
import CustomWebView from './CustomWebView';
import { Text } from 'react-native';

export default class Home extends CustomWebView {

    constructor(props){
        super(props);
        this.state = {
            origin : 'https://bitcoin.fr/',
            url : 'https://bitcoin.fr/',
        }
    }

}