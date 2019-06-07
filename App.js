import React from 'react';
import { StyleSheet, Text, View, WebView, ActivityIndicator } from 'react-native';
import Home from './components/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#318ce7',
    paddingTop: 35,
  },
});
