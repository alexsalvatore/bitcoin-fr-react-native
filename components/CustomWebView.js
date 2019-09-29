import React, {Component} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, Linking} from 'react-native'
import { WebView } from 'react-native-webview'
import style from '../Style'

export default class CustomWebView extends Component {

    webview = null;
    lastValideUrl = '';
    
    constructor(props){
        super(props);
        this.state = {
            origin : 'https://bitcoin.fr/',
            url : 'https://bitcoin.fr/',
            lastValideUrl : '',
            loading : false
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
        
        /*
        //Useless???
        } else if(webViewState.url === "https://bitcoin.fr/" && this.state.origin != "https://bitcoin.fr/") {

            const newURL =   this.state.origin ;
            const redirectToJS = 'window.location = "' + newURL + '"';
            this.webview.injectJavaScript(redirectToJS);
        */

        //Using state navigator when we go out from the main page
        } else if(webViewState.url != this.state.origin) {
            
            console.log("Go out");
            //this.props.navigation.push("Home");

        } else {

            this.lastValideUrl = webViewState.url;

        }

        this.setState({
            loading: webViewState.loading,
        });
      
    }

    render (){
       
        //td-header-menu-wrap 
        //to test https://stackoverflow.com/questions/30946829/mutationobserver-not-working

       const jsCode =  
            //"const targetNode = document.getElementsByClassName('td-search-wrap-mob')[0];"+
           // "alert(targetNode);"+
           "let topbar = document.getElementsByClassName('tdc-header-wrap');"+
           "topbar[0].style.display= 'none';"+
            "const config = { childList: true, subtree: true };"+
            "const observer = new MutationObserver(function(mutations) {"+
                //"alert(mutations.length);"+
                "let leftBtn = document.getElementsByClassName('tdc-header-wrap');"+
                //"alert(leftBtn.length);"+
                "if(leftBtn.length > 0){"+
                //"alert('button found');"+
                "leftBtn[0].style.display= 'none';"+
                "};"+
            "});"+
            "observer.observe(document, config);";
           
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