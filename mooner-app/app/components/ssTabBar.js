import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  ImageStore,
  SafeAreaView,
  Platform,
  ImageBackground,
  Keyboard,
} from 'react-native';
import tbStyles from '../styles/activeTabBarStyles';
import Colors from '../assets/colors';
import {images} from '../assets/images';
import {Icon} from 'native-base';
import Toast from 'react-native-tiny-toast';
export default class ActiveTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHome: true,
      activeMLM: false,
      activeShop: false,
      activeBooking: false,
      activeDriver: false,
      showTabBar: true,
    };
  }

  componentWillMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  };

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  _keyboardDidShow = () => {
    this.setState({
      showTabBar: false,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      showTabBar: true,
    });
  };

  render = () => {
    return (
      <>
        {this.state.showTabBar ? (
          <View style={tbStyles.activeFooter}>
            <View
              style={{
                borderRadius: 24,
                backgroundColor: 'white',
                shadowColor: 'black',
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}>
              <View style={tbStyles.innerContainer}>
                <TouchableOpacity
                  style={tbStyles.tabcontainer}
                  onPress={() => {
                    Toast.show('Coming Soon', {
                      position: Toast.position.TOP,
                    });
                  }}>
                  <Image
                    source={images.bookingTab}
                    style={tbStyles.tabImages}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tbStyles.tabcontainer}
                  onPress={() => {
                    Toast.show('Coming Soon', {
                      position: Toast.position.TOP,
                    });
                  }}>
                  <Image source={images.mlmTab} style={tbStyles.tabImages} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tbStyles.centerTabContainer}
                  onPress={() => {
                    this.props.navigation.navigate('Home');
                  }}>
                  <Image
                    source={images.homeTab}
                    style={tbStyles.centerTabImages}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tbStyles.tabcontainer}
                  onPress={() => {
                    this.props.navigation.navigate('Inbox');
                  }}>
                  <Image source={images.inboxTab} style={tbStyles.tabImages} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tbStyles.tabcontainer}
                  onPress={() => {
                    Toast.show('Coming Soon', {
                      position: Toast.position.TOP,
                    });
                  }}>
                  <Image source={images.driverTab} style={tbStyles.tabImages} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          false
        )}
      </>
    );
  };
}
