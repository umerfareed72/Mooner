import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';

import AuthHeader from '../../components/authHeader';
import {images} from '../../assets/images';
import splashStyles from '../../styles/splashStyles';
import appStyles from '../../styles/appStyles';
import Video from 'react-native-video';
import {PLAYER_STATES} from 'react-native-media-controls';

export default class mainSplash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPlaying: false,
      videoId: '',
      videoTitle: '',
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
    };
    this.videoPlayer = React.createRef(null);
  }

  playVideo = () => {
    const onProgress = (data) => {
      if (
        !this.state.isLoading &&
        this.state.playerState !== PLAYER_STATES.ENDED
      ) {
        this.setState({
          currentTime: data.currentTime + 1,
        });
      }
    };

    const onLoad = (data) => {
      this.setState({
        duration: data.duration,
        isLoading: false,
      });
    };

    const onLoadStart = (data) => this.setState({isLoading: true});

    const onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

    return (
      <View
        style={{
          top: '-18%',
          height: Dimensions.get('window').height,
        }}>
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={this.state.paused}
          ref={this.videoPlayer}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={require('../../assets/videos/splash-anim.mp4')}
          resizeMode="cover"
          style={{
            height: '100%',
            width: '100%',
          }}
          volume={0}
        />
      </View>
    );
  };

  render = () => {
    return (
      <View style={appStyles.body}>
        <AuthHeader
          navigation={this.props.navigation}
          showBackButton={false}
          showSkipButton={false}
          backButtonColor={'default'}
        />
        {this.playVideo()}
        <Text style={[appStyles.h1Auth, splashStyles.h1SplashTitle]}>
          Empowering Everyone{'\n'}To Be Self Employed
        </Text>
        <TouchableOpacity
          style={[
            splashStyles.rightContainer,
            splashStyles.rightAbsoluteContainer,
          ]}
          onPress={() => this.props.navigation.replace('Welcome')}>
          <Image
            style={[splashStyles.icon30]}
            source={images.rightArrow}></Image>
        </TouchableOpacity>
      </View>
    );
  };
}
