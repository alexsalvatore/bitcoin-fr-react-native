import React, {Component} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, Linking} from 'react-native'
import { WebView } from 'react-native-webview'
import style from '../Style'

export default class CustomWebView extends Component {

    webview = null;
    lastValideUrl = '';
    backButton = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"'+
    'width="16" height="16"'+
    'viewBox="0 0 172 172"'+
    'style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M114.337,0l-82.087,80.50675l82.087,80.74325l14.663,-14.39425l-67.51,-66.1985l67.51,-66.263z"></path></g></g></svg>';

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

        } else if(webViewState.url === "https://bitcoin.fr/" && this.state.origin != "https://bitcoin.fr/") {

            const newURL =   this.state.origin ;
            const redirectToJS = 'window.location = "' + newURL + '"';
            this.webview.injectJavaScript(redirectToJS);
        

        }else {

            this.lastValideUrl = webViewState.url;

        }

        this.setState({
            loading: webViewState.loading,
        });
      
    }

    render (){
       
        //td-header-menu-wrap 

       const jsCode =  
            "const targetNode = document.getElementsByClassName('home')[0];"+
            "alert(targetNode);"+
            "const config = { attributes: true, childList: true, subtree: true };"+
            "const callback = function (mutationsList, observer) {"+
                    "let leftBtn = document.getElementsByClassName('td-top-mobile-toggle');"+
                    "alert(eftBtn.length);"+
                    "if(leftBtn.length > 0){"+
                    "leftBtn[0].display='none';"+
                    "};"+
            "};"+
            "const observer = new MutationObserver(callback);";
            "observer.observe(targetNode, config);";
           
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