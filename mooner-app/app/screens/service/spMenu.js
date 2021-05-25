import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

const vw = Dimensions.get('window').width;
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';
import serviceStyles from '../../styles/serviceStyles';
import appStyles from '../../styles/appStyles';

import colors from '../../assets/colors';
import ActiveHeader from '../../components/activeHeader';
import BackButton from '../../components/backButton';
import {connect} from 'react-redux';
import axios from 'axios';
import {imagesURL, baseURL, SP, spImagesURL} from '../../utilities/constant';
import {getServiceItems} from '../../redux/actions/index';
import Toast from 'react-native-tiny-toast';
class spMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount = () => {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getItems();
    });
  };

  getItems = () => {
    const data = {
      token: this.props.auth.userInfo.access,
    };
    this.props.getServiceItems(data);
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };
  getChild = (item) => {
    const data = {
      token: this.props.auth.userInfo.access,
      id: item.id,
      category: item,
    };

    this.props.getAlphaChildServices(data);
    this.props.updateCurrentChild(item);
    if (this.props.auth.getAlphaChild.length > 0 && this.props.auth.success) {
      Toast.show('Coming soon', {
        position: Toast.position.TOP,
      });
    } else if (item.behaviour == 'Menu') {
      this.props.navigation.navigate('spMenu');
    } else {
      this.props.getCurrentQuestions(item.id);
      this.props.navigation.navigate('spServiceQuestions');
    }
  };
  renderItems = () =>
    this.props.auth.getItems.map((item) =>
      item.category_id == this.props.auth.getCurrentChild.id ? (
        <TouchableOpacity
          key={item.id.toString()}
          style={serviceStyles.itemContainer}
          onPress={() =>
            this.props.navigation.navigate('editItem', {
              item: item,
              category: this.props.auth.getCurrentChild,
            })
          }>
          <Image
            source={{
              uri:
                item.images.length > 0
                  ? spImagesURL + '/' + item.images[0].image
                  : spImagesURL +
                    '/' +
                    this.props.auth.getCurrentChild.category_image,
            }}
            style={serviceStyles.itemLeftImage}
          />
          <View style={serviceStyles.itemRightBlock}>
            <View style={serviceStyles.itemRBRow}>
              <Text
                style={
                  ([appStyles.font16, appStyles.fontSemiBold],
                  {maxWidth: '70%'})
                }>
                {item.name}
              </Text>
              <Text style={[appStyles.font16, appStyles.fontSemiBold]}>
                ${item.price == '' || item.price == null ? 0 : item.price}
              </Text>
            </View>
            <View style={serviceStyles.itemRBRow}>
              <Text
                style={[
                  appStyles.font13,
                  appStyles.fontSemiBold,
                  {color: '#333'},
                ]}>
                {item.weight == '' || item.weight == null
                  ? 0
                  : Math.round(item.weight)}{' '}
                grams
              </Text>
              <Text
                style={[
                  appStyles.font13,
                  appStyles.fontSemiBold,
                  {color: '#219653'},
                ]}>
                {item.method}
              </Text>
            </View>
            <View style={serviceStyles.itemRBRow}>
              <Text
                style={[
                  appStyles.font13,
                  appStyles.fontSemiBold,
                  {color: colors.black},
                ]}>
                {item.opening} - {item.closing}
              </Text>
              <Text
                style={[
                  appStyles.font13,
                  appStyles.fontSemiBold,
                  {color: '#333'},
                ]}>
                Mon-Sat
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        false
      ),
    );

  render = () => {
    return (
      <SafeAreaView style={[homeStyles.body]}>
        {/* header */}
        <ActiveHeader navigation={this.props.navigation} />
        <BackButton navigation={this.props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              appStyles.mt20,
              appStyles.pb30,
              {
                paddingHorizontal: 30,
                height: '100%',
              },
            ]}>
            <View
              style={[
                appStyles.spHeadingRow,
                appStyles.mt30,
                {justifyContent: 'flex-start'},
              ]}>
              <Image
                source={{
                  uri:
                    spImagesURL +
                    '/' +
                    this.props.auth.getCurrentChild.category_image,
                }}
                style={{height: 64, width: 64, borderRadius: 16}}
              />
              <Text
                style={[
                  {marginLeft: 20},
                  appStyles.fontBold,
                  appStyles.font24,
                ]}>
                {this.props.auth.getCurrentChild.name}
              </Text>
            </View>

            <View style={appStyles.mt20}>{this.renderItems()}</View>
            <TouchableOpacity
              style={[
                serviceStyles.itemContainer,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.lightPink,
                },
              ]}
              onPress={() => this.props.navigation.navigate('addNewItem')}>
              <Image
                source={images.addNewItemImage}
                style={{width: '55%', resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getServiceItems: (data) => dispatch(getServiceItems(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(spMenuScreen);
