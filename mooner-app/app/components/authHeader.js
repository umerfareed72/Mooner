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
} from 'react-native';
import Styles from '../styles/appStyles';
import Colors from '../assets/colors';
import {images} from '../assets/images';
import colors from '../assets/colors';
import {connect} from 'react-redux';

class AuthHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  skipFunction = () => {
    if (this.props.auth.userInfo == '') {
      this.props.navigation.replace('active');
    } else {
      this.props.navigation.replace('signupSuccessMessage');
    }
  };

  render = () => {
    return (
      <>
        {Platform.OS == 'ios' ? (
          <StatusBar backgroundColor={Colors.black} barStyle="dark-content" />
        ) : (
          <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
        )}
        <View style={Styles.authHeader}>
          <View style={Styles.sectionLeft}>
            {this.props.showBackButton ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack(null)}>
                <Image
                  style={[
                    Styles.authImage,
                    {
                      tintColor:
                        this.props.backButtonColor != 'default'
                          ? Colors.defaultRed
                          : Colors.defaultYellow,
                    },
                  ]}
                  source={images.backArrow}></Image>
              </TouchableOpacity>
            ) : (
              false
            )}
          </View>

          <View style={Styles.sectionMiddle}>
            {/* <Text style={Styles.authLogoText}>
              M<Text style={{color: Colors.defaultPurple}}>OO</Text>NER
            </Text> */}
            <Image
              source={images.moonerAuthLogo}
              style={{
                height: 70,
                width: 70,
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={Styles.sectionRight}>
            {this.props.showSkipButton ? (
              <TouchableOpacity onPress={() => this.skipFunction()}>
                <Text style={Styles.authSkipText}>Skip</Text>
              </TouchableOpacity>
            ) : (
              false
            )}
          </View>
        </View>
      </>
    );
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(AuthHeader);
