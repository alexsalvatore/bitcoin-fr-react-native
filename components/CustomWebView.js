import React, {Component} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, Linking} from 'react-native'
import { WebView } from 'react-native-webview'
import style from '../Style'

const webViewBackgroundColor = '#318ce7';

export default class CustomWebView extends Component {

    webview = null;
    lastValideUrl = '';
    
    constructor(props){
        super(props);
        this.state = {
            origin : 'https://bitcoin.fr/',
            url : 'https://bitcoin.fr/',
            lastValideUrl : '',
            loading : true
        }
    }

    _onNavigationStateChange(webViewState){

        console.log(webViewState)

        // Add a  back bottom
        //const backButtonJS =
       // "setTimeout(() => {"+
        //"document.getElementById('td-top-mobile-toggle').style.display = 'none';"+
       // "var leftBtn = document.getElementsByClassName('td-top-mobile-toggle')[0];"+
        //"leftBtn.innerHTML = 'back';";
        //"leftBtn.addEventListener('click', setTimeout(() =>{ window.history.back();}, 10) );"+
        //"}, 10);";

       // this.webview.injectJavaScript(backButtonJS);
        //Add the button

        //is bitcoin.fr url?
        if (!webViewState.url.includes('bitcoin.fr')) {

            const newURL =  this.lastValideUrl;
            const redirectTo = 'window.location = "' + newURL + '"';
            this.webview.injectJavaScript(redirectTo);
            Linking.openURL(webViewState.url);
      
        //Using state navigator when we go out from the main page
        } else if(webViewState.url != this.state.origin) {
            
            console.log("Go out");

        } else {

            this.lastValideUrl = webViewState.url;

        }

        /*
        //Add a loding screen but create a CSS bug on td-menu-background
        this.setState({
            loading: webViewState.loading,
        });
        */
      
    }

    render (){
       
        //td-header-menu-wrap 
        //to test https://stackoverflow.com/questions/30946829/mutationobserver-not-working

       const jsCode =  "";
           
        return( <View style={style.view}>

                <WebView
                    ref={ref => (this.webview = ref)}
                    originWhitelist={['*']}
                    style = { (this.state.loading)? style.webViewHidden : style.webView}
                    source={{uri: this.state.url}}
                    injectedJavaScript={jsCode}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                  />

                  { this.state.loading && 
                    <ActivityIndicator
                    style={style.loading}
                    size="large"
                    color="#ffffff" />
                  }
              </View>
              )
       
    }
}