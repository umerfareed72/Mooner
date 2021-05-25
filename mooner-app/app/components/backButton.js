import React, {Component} from 'react';
import {
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  TouchableHighlight,
  TouchableHighlightBase,
} from 'react-native';
import appStyles from '../styles/appStyles';
import {images} from '../assets/images';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default class BackButton extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.onPress
            ? this.props.onPress()
            : this.props.navigation.goBack();
        }}
        style={{position: 'relative', backgroundColor: 'transparent'}}>
        <View style={[appStyles.backButton, this.props.styles]}>
          <Image source={images.backArrow} style={appStyles.backButtonArrow} />
        </View>
      </TouchableNativeFeedback>
    );
  };
}
