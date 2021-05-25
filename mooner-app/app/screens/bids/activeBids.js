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
import colors from '../../assets/colors';
import ActiveHeader from '../../components/activeHeader';
import BackButton from '../../components/backButton';

import {
  getServiceCategories,
  searchServiceCategories,
} from '../../redux/actions/index';
import {connect} from 'react-redux';
import axios from 'axios';
import {imagesURL, baseURL} from '../../utilities/constant';
import appStyles from '../../styles/appStyles';

class ActiveBidsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  renderBids = () => {
    return (
      <>
        <TouchableOpacity
          style={[serviceStyles.childContainer]}
          onPress={() => this.props.navigation.navigate('ServiceQuestion')}>
          <Image source={images.homeBanner} style={appStyles.weirdImageFrame} />
          <Text style={[appStyles.semiBoldBodyText, appStyles.mt10]}>name</Text>
          <Text style={appStyles.regularSmallBodyText}>Starting from $999</Text>
          <Text style={appStyles.regularSmallBodyText}>Mar 24,2021</Text>
        </TouchableOpacity>
      </>
    );
  };

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
            <View style={[appStyles.spHeadingRow, appStyles.mt30]}>
              <Text style={[appStyles.fontBold, appStyles.font24]}>
                Active Bids
              </Text>
            </View>
            <View
              style={[
                appStyles.mt30,
                serviceStyles.childContainerRow,
                {flexWrap: 'wrap'},
              ]}>
              {this.renderBids()}
            </View>
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
    getServiceCategories: (data) => dispatch(getServiceCategories(data)),
    searchServiceCategories: (data) => dispatch(searchServiceCategories(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveBidsScreen);
