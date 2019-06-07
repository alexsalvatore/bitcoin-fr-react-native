import React, {Component} from 'react'
import {View, Text, WebView, StyleSheet} from 'react-native'

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            url : 'https://bitcoin.fr/'
        }
    }

    _onNavigationStateChange(webViewState){

        console.log(webViewState)
        //is bitcoin.fr url?
        if(webViewState.url.toLowerCase().indexOf('bitcoin.fr') < 0){
            webViewState.url =  this.state.url;
        }
      
    }

    render (){
        return( <View style={styles.view}>
          <WebView
            source={{uri: this.state.url}}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            />
        </View>
        )
    }

}

const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: '#318ce7',
    },
  });