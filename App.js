import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import signUp from './component/signup';
import home from './component/home';
import { createStackNavigator } from 'react-navigation';
import Routes from './routes/routes';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = [
  '60000ms'
]

const Application = createStackNavigator({
  Welcome: signUp,
  signUp: signUp,
  Home: home
}, {
    navigationOptions: {
      header: false,
    }
  })

export default class App extends React.Component {
  render() {
    return (
      <Routes />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});
