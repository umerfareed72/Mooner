import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

const vw = Dimensions.get('window').width;
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';
import serviceStyles from '../../styles/serviceStyles';
import appStyles from '../../styles/appStyles';
import {Item, Input, Picker, Icon} from 'native-base';
import colors from '../../assets/colors';
import ActiveHeader from '../../components/activeHeader';
import BackButton from '../../components/backButton';
import {connect} from 'react-redux';
import axios from 'axios';
import {imagesURL, baseURL, SP, spImagesURL} from '../../utilities/constant';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import SPDayTimeModal from '../../components/spComponents/spDayTimeModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const options = {
  title: 'Select Image',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.5,
};

class spEditItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      unit: '',
      price: '',
      dine: '',
      description: '',
      weight: '',
      portfolioData: [],
      portfolioUri: [],
      showTimeModal: false,
      openingTimeMode: moment(Date.now()).format('A'),
      openingTime: moment(Date.now()).format('hh:mm'),
      closingTimeMode: moment(Date.now()).format('A'),
      closingTime: moment(Date.now()).format('hh:mm'),
      OC: 1,
      date: new Date(),
      days: [
        {id: '1', name: 'Mon'},
        {id: '2', name: 'Tue'},
        {id: '3', name: 'Wed'},
        {id: '4', name: 'Thu'},
        {id: '5', name: 'Fri'},
        {id: '6', name: 'Sat'},
        {id: '7', name: 'Sun'},
      ],
      dineOption: [{value: 'Take away'}, {value: 'Dine'}, {value: 'Delivery'}],
      selectedDaysArr: [],
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      deletedImageId: '',
      showCloseTime: false,
      showOpenTime: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      name: this.props.route.params.item.name,
      unit:
        this.props.route.params.item.quantity != null
          ? this.props.route.params.item.quantity
          : 0,
      price:
        this.props.route.params.item.price != null
          ? this.props.route.params.item.price
          : 0,
      description: this.props.route.params.item.description,
      openingTime: this.props.route.params.item.opening,
      closingTime: this.props.route.params.item.closing,
      dine: this.props.route.params.item.method,
      weight:
        this.props.route.params.item.weight != null
          ? this.props.route.params.item.weight
          : 0,
      monday: this.props.route.params.item.monday,
      tuesday: this.props.route.params.item.tuesday,
      wednesday: this.props.route.params.item.wednesday,
      thursday: this.props.route.params.item.thursday,
      friday: this.props.route.params.item.friday,
      saturday: this.props.route.params.item.saturday,
      sunday: this.props.route.params.item.sunday,
    });
  };

  renderForm = () => {
    return (
      <View>
        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>Unit/Quantity</Text>
        <Item style={{borderBottomWidth: 0}}>
          <Input
            placeholder={
              this.state.unit != '' ? this.state.unit.toString() : ''
            }
            placeholderTextColor={colors.defaultBlack}
            keyboardType={'number-pad'}
            value={this.state.unit.toString()}
            onChangeText={(value) => {
              this.setState({unit: value});
            }}
            style={[appStyles.mt10, appStyles.loginInputIcon]}></Input>
        </Item>
        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>Price</Text>
        <Item style={{borderBottomWidth: 0}}>
          <Input
            placeholder={
              this.state.price != '' ? this.state.price.toString() : ''
            }
            keyboardType={'number-pad'}
            placeholderTextColor={colors.defaultBlack}
            value={this.state.price.toString()}
            onChangeText={(value) => {
              this.setState({price: value});
            }}
            style={[appStyles.mt10, appStyles.loginInputIcon]}></Input>
        </Item>
        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>Weight</Text>
        <Item style={{borderBottomWidth: 0}}>
          <Input
            placeholder={this.state.weight.toString()}
            keyboardType={'number-pad'}
            placeholderTextColor={colors.defaultBlack}
            value={this.state.weight.toString()}
            onChangeText={(value) => {
              this.setState({weight: value});
            }}
            style={[appStyles.mt10, appStyles.loginInputIcon]}></Input>
        </Item>
        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>Dine</Text>
        <Item
          style={[
            appStyles.mt10,
            appStyles.loginInputIcon,
            {
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: colors.halfWhite,
              borderBottomWidth: 0,
              paddingLeft: 10,
            },
          ]}>
          <Picker
            mode="dropdown"
            iosHeader="Select an Option"
            iosIcon={<Icon name="arrow-down" />}
            style={[
              {
                width: '100%',
              },
            ]}
            textStyle={{
              fontSize: 12,
              fontFamily: 'Gilroy-Regular',
            }}
            itemTextStyle={{
              fontSize: 12,
              fontFamily: 'Gilroy-Regular',
            }}
            // placeholderStyle={{color: '#bfc6ea'}}
            // placeholderTextColor="white"
            // placeholderIconColor="#007aff"
            placeholder={'Select'}
            selectedValue={this.state.dine}
            onValueChange={(value) => {
              this.setState({dine: value});
            }}>
            <Picker.Item label="Select One" value="Select One" />

            <Picker.Item label="Take Away" value="Take away" />
            <Picker.Item label="Dine" value="Dine" />
            <Picker.Item label="Delivery" value="Delivery" />
          </Picker>
        </Item>
        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>
          Select Time Available
        </Text>
        <TouchableOpacity
          style={[
            appStyles.mt10,
            appStyles.loginInputIcon,
            {justifyContent: 'center'},
          ]}
          onPress={() => this.setState({showTimeModal: true})}>
          <Text
            style={{
              fontSize: 12,
              color: '#333333',
              opacity: 1,
              fontFamily: 'Gilroy-Medium',
            }}>
            Opening {'&'} Closing
          </Text>
        </TouchableOpacity>
        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>Description</Text>
        <Item style={{borderBottomWidth: 0}}>
          <Input
            placeholder={this.state.description}
            placeholderTextColor={colors.defaultBlack}
            value={this.state.description}
            onChangeText={(value) => {
              this.setState({description: value});
            }}
            multiline={true}
            style={[
              appStyles.mt10,
              appStyles.loginInputIcon,
              appStyles.BigTextFieldHeight,
            ]}></Input>
        </Item>
        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>Add Portfolio</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Upload Image',
              'Choose image upload option',
              [
                {text: 'Cancel', onPress: () => console.log('Cancelled')},
                {text: 'Open Camera', onPress: () => this.uploadImage(1)},
                {text: 'Open Gallery', onPress: () => this.uploadImage(0)},
              ],
              {cancelable: false},
            )
          }
          style={[
            appStyles.answerInputField,
            appStyles.mt10,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Image
            source={images.uploadIcon}
            style={{width: 24, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderTimePicker = () => {
    return (
      <SPDayTimeModal
        showModal={this.state.showTimeModal}
        odate={this.state.opendate}
        cdate={this.state.closedate}
        onPressOpenTime={() => {
          this.setState({
            showOpenTime: !this.state.showOpenTime,
            showCloseTime: false,
          });
        }}
        onPressCloseTime={() => {
          this.setState({
            showCloseTime: !this.state.showCloseTime,
            showOpenTime: false,
          });
        }}
        showOpentimePicker={this.state.showOpenTime}
        showClosetimePicker={this.state.showCloseTime}
        onOpenDateChange={(d) => {
          this.setOpenTimeValues(d);
        }}
        onClosedDateChange={(d) => {
          this.setCloseTimeValue(d);
        }}
        openingTime={this.state.openingTime}
        openingTimeMode={this.state.openingTimeMode}
        closingTime={this.state.closingTime}
        closingTimeMode={this.state.closingTimeMode}
        closeTimeModal={() =>
          this.setState({
            showTimeModal: false,
          })
        }
        selectDay={this.state.selectedDaysArr}
        monday={this.state.monday}
        tuesday={this.state.tuesday}
        wednesday={this.state.wednesday}
        thursday={this.state.thursday}
        friday={this.state.friday}
        saturday={this.state.saturday}
        sunday={this.state.sunday}
        onPressMonday={() => this.setState({monday: !this.state.monday})}
        onPressTuesday={() => this.setState({tuesday: !this.state.tuesday})}
        onPressWednesday={() =>
          this.setState({wednesday: !this.state.wednesday})
        }
        onPressThursday={() => this.setState({thursday: !this.state.thursday})}
        onPressFriday={() => this.setState({friday: !this.state.friday})}
        onPressSaturday={() => this.setState({saturday: !this.state.saturday})}
        onPressSunday={() => this.setState({sunday: !this.state.sunday})}
      />
    );
  };

  //Time Setter Logic
  setOpenTimeValues = (DataVal) => {
    this.setState({openingTime: moment(DataVal).format('hh:mm')});
    this.setState({openingTimeMode: moment(DataVal).format('A')});
  };
  setCloseTimeValue = (DataVal) => {
    this.setState({closingTime: moment(DataVal).format('hh:mm')});
    this.setState({closingTimeMode: moment(DataVal).format('A')});
  };
  deleteImage = (image_id, item_id) => {
    axios
      .delete(baseURL + SP + 'delete_sp_items_images/' + image_id + '/', {
        headers: {
          Authorization: `Bearer ${this.props.auth.userInfo.access}`,
        },
      })
      .then(async (res) => {
        if (res.status == 204) {
          //success
          this.setState({
            deletedImageId: image_id,
          });
        } else {
        }
      })
      .catch((error) => {
        console.error('Delete Item Error: ', error);
      });
  };

  renderImages = () =>
    this.state.portfolioData.map((item) => (
      <ImageBackground
        key={item.uri.toString()}
        source={{
          uri: item.uri,
        }}
        style={{height: 50, width: 90, margin: 5}}
        imageStyle={{
          height: 50,
          width: 90,
          borderRadius: 12,
        }}></ImageBackground>
    ));

  renderOldImages = () =>
    this.props.route.params.item.images.map((item) => (
      <ImageBackground
        key={item.id.toString()}
        source={{
          uri: spImagesURL + '/' + item.image,
        }}
        style={{
          height: 50,
          width: 90,
          margin: 5,
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          display: this.state.deletedImageId == item.id ? 'none' : 'flex',
        }}
        imageStyle={{
          height: 50,
          width: 90,
          borderRadius: 12,
        }}>
        <TouchableOpacity
          onPress={() => this.deleteImage(item.id, item.item_id)}
          style={{
            height: 20,
            width: 20,
            borderRadius: 13,
            backgroundColor: colors.defaultRed,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: -5,
            marginTop: -5,
          }}>
          <Icon
            style={{
              fontSize: 15,
              color: 'white',
            }}
            name="cross"
            type="Entypo"
          />
        </TouchableOpacity>
      </ImageBackground>
    ));

  uploadImage = async (val) => {
    if (val == 1) {
      launchCamera(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          const source = {uri: response.uri};
          // const source = {uri: 'data:image/jpeg;base64,' + response.base64};

          if (response.fileSize / 1048576 < 10) {
            this.state.portfolioData.push(source);
            this.setState({
              photoData: response.data,
              photoUri: response.uri,
            });
          } else {
            alert('Select another image its size is to large');
          }
        }
      });
    } else {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          const source = {uri: response.uri};
          // const source = {uri: 'data:image/jpeg;base64,' + response.base64};

          if (response.fileSize / 1048576 < 10) {
            this.state.portfolioData.push(source);
            this.state.portfolioUri.push({uri: response.uri});
            this.setState({
              photoData: response.data,
              photoUri: response.uri,
            });
          } else {
            alert('Select another image its size is to large');
          }
        }
      });
    }
  };

  sendRequest = () => {
    let body = new FormData();
    body.append('category', this.props.route.params.category.id);
    body.append('name', this.state.name);
    body.append('quantity', this.state.unit);
    body.append('weight', this.state.weight);
    body.append('description', this.state.description);
    body.append('price', this.state.price);
    body.append('method', this.state.dine);
    body.append(
      'opening',
      this.state.openingTime + ' ' + this.state.openingTimeMode,
    );
    body.append(
      'closing',
      this.state.closingTime + ' ' + this.state.closingTimeMode,
    );
    body.append('monday', this.state.monday);
    body.append('tuesday', this.state.tuesday);
    body.append('wednesday', this.state.wednesday);
    body.append('thursday', this.state.thursday);
    body.append('friday', this.state.friday);
    body.append('saturday', this.state.saturday);
    body.append('sunday', this.state.sunday);

    this.state?.portfolioData?.forEach((item, i) => {
      body.append('image', {
        uri: item.uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    });

    axios
      .put(
        baseURL + SP + 'edit_sp_items/' + this.props.route.params.item.id + '/',
        body,
        {
          headers: {
            Authorization: `Bearer ${this.props.auth.userInfo.access}`,
          },
        },
      )
      .then(async (res) => {
        if (res.data.status) {
          this.setState({portfolioData: []});
          this.props.navigation.navigate('spMenu');
        } else {
        }
      })
      .catch((error) => {
        console.error('Post Menu Item Error: ', error);
      });
  };

  render = () => {
    return (
      <SafeAreaView style={[homeStyles.body]}>
        {/* header */}
        <ActiveHeader navigation={this.props.navigation} />
        <BackButton navigation={this.props.navigation} />
        <KeyboardAwareScrollView>
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
                    this.props.route.params.item.images.length > 0
                      ? spImagesURL +
                        '/' +
                        this.props.route.params.item.images[0].image
                      : spImagesURL +
                        '/' +
                        this.props.route.params.category.category_image,
                }}
                style={{height: 64, width: 64, borderRadius: 16}}
              />
              <Text
                style={[
                  {marginLeft: 20},
                  appStyles.fontBold,
                  appStyles.font24,
                ]}>
                {this.props.route.params.item.name}
              </Text>
            </View>

            {/* Form Section */}
            <View
              style={[
                homeStyles.mt30,
                {
                  width: '100%',
                },
              ]}>
              {/* render form */}
              {this.renderForm()}
            </View>
            {/* render picked Images */}
            <View
              style={[
                appStyles.mt40,
                {flexWrap: 'wrap', flexDirection: 'row'},
              ]}>
              {/* render Images */}
              {this.props.route.params.item.images.length > 0 &&
                this.renderOldImages()}
              {this.state.portfolioData.length > 0 && this.renderImages()}
            </View>

            <TouchableOpacity
              onPress={() => this.sendRequest()}
              style={serviceStyles.purpleForwardButton}>
              <Image
                source={images.rightBlackArrow}
                style={serviceStyles.forwardButtonArrow}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        {this.state.showTimeModal && this.renderTimePicker()}
      </SafeAreaView>
    );
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(spEditItemScreen);
