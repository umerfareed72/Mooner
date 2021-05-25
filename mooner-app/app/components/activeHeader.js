import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import Styles from '../styles/headerStyles';
import appStyles from '../styles/appStyles';

import Colors from '../assets/colors';
import {images} from '../assets/images';
// import {Icon} from 'native-base';

export default class ActiveHeader extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <>
        {Platform.OS == 'ios' ? (
          <StatusBar></StatusBar>
        ) : (
          <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        )}

        <View style={Styles.activeHeader}>
          <View style={Styles.sectionLeft}>
            {!this.props.hideToggle ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}>
                <Image
                  style={{
                    tintColor: Colors.defaultBlack,
                    width: 30,
                    resizeMode: 'contain',
                  }}
                  source={images.menuIcon}></Image>
              </TouchableOpacity>
            ) : (
              false
            )}
          </View>

          <View style={Styles.sectionMiddle}>
            {/* <Text style={Styles.activeLogoText}>
              M<Text style={{color: Colors.defaultRed}}>OO</Text>NER
            </Text> */}
            <Image
              source={images.moonerActiveLogo}
              style={{
                height: 40,
                // width: 70,
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={Styles.sectionRight}>
            <TouchableOpacity>
              <Image
                style={{
                  tintColor: Colors.defaultRed,
                  width: 20,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
                source={images.notificationIcon}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <ImageBackground
                source={require('../assets/images/user-default.jpg')}
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: 'contain',
                }}
                imageStyle={{
                  borderRadius: 16,
                }}></ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
}
