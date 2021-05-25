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
import moment from 'moment';
import {imagesURL} from '../../utilities/constant';
import {getActiveServices} from '../../redux/actions/index';
const vw = Dimensions.get('window').width;
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';
import serviceStyles from '../../styles/serviceStyles';
import colors from '../../assets/colors';
import ActiveHeader from '../../components/activeHeader';
import {connect} from 'react-redux';
import appStyles from '../../styles/appStyles';

import SPServices from '../../components/spComponents/spServices';
import BackButton from '../../components/backButton';
import {WP} from '../../utilities/responsive';

class allPostedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeJobsCount: 0,
      totalEarningCount: 0,
      activeBids: [],
      activeServices: [],
      showModal: false,
    };
  }

  render = () => {
    return (
      <SafeAreaView style={[homeStyles.body]}>
        <ActiveHeader navigation={this.props.navigation} />
        <BackButton
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}></BackButton>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              appStyles.mt20,
              appStyles.pb30,
              appStyles.ph30,
              {width: '100%'},
            ]}>
            <View style={[appStyles.spHeadingRow, appStyles.mt30]}>
              <Text style={[appStyles.fontSemiBold, appStyles.font24]}>
                Posted Jobs
              </Text>
            </View>
            <View style={[appStyles.mt30, serviceStyles.childContainerRow]}>
              {this.props?.auth?.getactiveServices?.posted_jobs?.length > 0 ? (
                <FlatList
                  data={this.props?.auth?.getactiveServices?.posted_jobs}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        serviceStyles.childContainer,
                        {
                          marginStart: WP('2'),
                          paddingVertical: WP('5'),
                          height: WP('60'),
                        },
                      ]}
                      onPress={() => {
                        // console.log(item);
                        this.props.navigation.navigate('ssProfile', {item});
                      }}>
                      <Image
                        source={{
                          uri: `${imagesURL}/media/${item?.category_image}`,
                        }}
                        style={[
                          {
                            height: '55%',
                            width: '80%',
                            borderTopLeftRadius: 80,
                            borderTopRightRadius: 80,
                            borderBottomLeftRadius: 120,
                            borderBottomRightRadius: 100,
                            // resizeMode: 'contain',
                          },
                        ]}
                      />
                      <Text
                        style={[appStyles.semiBoldBodyText, appStyles.mt20]}>
                        {item?.category_name}
                      </Text>
                      <Text
                        style={{fontSize: WP('3.5'), marginVertical: WP('3')}}>
                        ${item?.budget}
                      </Text>
                      <Text style={{color: colors.activeGreen}}>
                        {moment(item?.schedule).format('MMM DD, YYYY')}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 16,
                    }}>
                    Not Found :(
                  </Text>
                </View>
              )}
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
    getActiveServices: (data) => dispatch(getActiveServices(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(allPostedJobs);
