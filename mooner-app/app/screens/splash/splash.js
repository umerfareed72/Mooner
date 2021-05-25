import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  Easing,
  Animated,
} from 'react-native';

var vh = Dimensions.get('window').height;

import {images} from '../../assets/images';

import splashStyles from '../../styles/splashStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      borderRadius: 10000,
      viewHeight: new Animated.Value(1000),
      viewWidth: 200,
      spinner: 'none',
      showCirle: 'flex',
      show: true,
      spinValue: new Animated.Value(0),
    };
  }

  componentDidMount = async () => {
    this.spinner();
    Animated.timing(this.state.viewHeight, {
      toValue: 100,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      this.setState({show: false});
      if (this.state.show == false) {
        this.setState({showCirle: 'none', spinner: 'flex'});
      } else {
        this.setState({showCirle: 'flex', spinner: 'none'});
      }
    });

    const authToken = await AsyncStorage.getItem('Access_Token');
    if (authToken) {
      this.props.navigation.replace('active');
    } else {
      setTimeout(() => this.props.navigation.replace('mainSplash'), 3000);
    }
  };

  spinner = () => {
    Animated.loop(
      Animated.timing(this.state.spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <>
        <StatusBar sbarStyle="dark-content" />
        <SafeAreaView>
          <ScrollView style={splashStyles.scrollView}>
            <View style={splashStyles.innerView}>
              <Animated.Image
                style={{
                  transform: [{rotate: spin}],
                  height: 80,
                  width: 80,
                  display: this.state.spinner,
                }}
                source={images.spinner}
              />
              <Animated.View
                style={
                  ([splashStyles.sectionCenter],
                  {
                    backgroundColor: '#fedb29',
                    height: this.state.viewHeight,
                    width: this.state.viewHeight,
                    borderRadius: this.state.borderRadius,
                    display: this.state.showCirle,
                  })
                }
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
