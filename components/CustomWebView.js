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
            url : 'https://bitcoin.fr/',
            lastValideUrl : '',
            loading : false
        }
    }

    _onNavigationStateChange(webViewState){

        console.log(webViewState)
        //is bitcoin.fr url?
        if (!webViewState.url.includes('bitcoin.fr')) {

            const newURL =  this.lastValideUrl;
            const redirectTo = 'window.location = "' + newURL + '"';
            this.webview.injectJavaScript(redirectTo);

            Linking.openURL(webViewState.url);

        } else {
            this.lastValideUrl = webViewState.url;
        }

        this.setState({
            loading: webViewState.loading,
        });
      
    }

    render (){
        var jsCode =  "document.querySelector('.fa-dot-circle-o').style.display = 'none';"
        + "document.querySelector('.fa-bars').style.display = 'none';"
       + "if(document.querySelector('.blog-post-social')) document.querySelector('.blog-post-social').style.display = 'none';"
        + "if(document.querySelector('#disqus_thread')) document.querySelector('#disqus_thread').style.display = 'none';"
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