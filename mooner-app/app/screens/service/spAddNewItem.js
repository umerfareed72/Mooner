import React, {Component, Fragment} from 'react';
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
  Platform,
  TextInput,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
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
import * as yup from 'yup';
import {Formik} from 'formik';
import loginStyle from '../../styles/loginStyle';
import SPDayTimeModal from '../../components/spComponents/spDayTimeModal';
import Indicator from '../../components/Indicator';
import Toast from 'react-native-tiny-toast';
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
  includeBase64: true,
  saveToPhotos: true,
};

class spAddNewItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      dine: '',
      portfolioData: [],
      portfolioUri: [],
      showTimeModal: false,
      openingTimeMode: moment(Date.now()).format('A'),
      openingTime: moment(Date.now()).format('hh:mm'),
      closingTimeMode: moment(Date.now()).format('A'),
      closingTime: moment(Date.now()).format('hh:mm'),
      OC: 1,
      opendate: new Date(),
      closedate: new Date(),
      showOpenTime: false,
      showCloseTime: false,
      days: [
        {id: '1', name: 'Mon'},
        {id: '2', name: 'Tue'},
        {id: '3', name: 'Wed'},
        {id: '4', name: 'Thu'},
        {id: '5', name: 'Fri'},
        {id: '6', name: 'Sat'},
        {id: '7', name: 'Sun'},
      ],
      dineOption: [
        {value: 'Select'},
        {value: 'Take away'},
        {value: 'Dine'},
        {value: 'Delivery'},
      ],
      selectedDaysArr: [],
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      loading: false,
    };
  }

  renderTimePicker = () => {
    return (
      <>
        <SPDayTimeModal
          showModal={this.state.showTimeModal}
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
          onPressThursday={() =>
            this.setState({thursday: !this.state.thursday})
          }
          onPressFriday={() => this.setState({friday: !this.state.friday})}
          onPressSaturday={() =>
            this.setState({saturday: !this.state.saturday})
          }
          onPressSunday={() => this.setState({sunday: !this.state.sunday})}
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
          }></SPDayTimeModal>
      </>
    );
  };

  //Time Setter Logic
  setOpenTimeValues = (DataVal) => {
    this.setState({openingTime: moment(DataVal).format('hh:mm')});
    this.setState({
      opendate: DataVal,
      openingTimeMode: moment(DataVal).format('A'),
    });
  };
  setCloseTimeValue = (DataVal) => {
    this.setState({closingTime: moment(DataVal).format('hh:mm')});
    this.setState({
      closingTimeMode: moment(DataVal).format('A'),
      closedate: DataVal,
    });
  };

  renderImages = () =>
    this.state.portfolioUri.map((item) => (
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

  validateRequest = () => {
    if (this.state.dine == '') {
      Toast.show('Item must have Dine', {
        position: Toast.position.TOP,
      });
      return false;
    } else if (this.state.portfolioData == '') {
      Toast.show('Item must have Image', {
        position: Toast.position.TOP,
      });
      return false;
    } else {
      return true;
    }
  };

  sendRequest = async (values) => {
    if (this.validateRequest()) {
      this.setState({loading: true});
      let body = new FormData();
      body.append('category', this.props.auth.getCurrentChild.id);
      body.append('name', values.itemName);
      body.append('quantity', values.Quantity);
      body.append('weight', values.Weight);
      body.append('description', values.description);
      body.append('price', values.Price);
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
      this.state.portfolioData.forEach((item, i) => {
        body.append('image', {
          uri: item.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      });
      await axios
        .post(baseURL + SP + 'create_sp_items/', body, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.props.auth.userInfo.access}`,
          },
        })
        .then(async (res) => {
          if (res.data.status) {
            this.setState({loading: false});
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Home'}],
              }),
            );
          } else {
            this.setState({loading: false});
            alert('Item Not Registered');
          }
        })
        .catch((error) => {
          this.setState({loading: false});
          alert('Network Error');
          console.error('Post Menu Item Error: ', error);
        });
    }
  };

  render = () => {
    return (
      <SafeAreaView style={[homeStyles.body]}>
        {/* header */}
        <ActiveHeader navigation={this.props.navigation} />
        <BackButton navigation={this.props.navigation} />
        <KeyboardAwareScrollView>
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
                  Add New Item
                </Text>
              </View>

              <Image
                style={[serviceStyles.signupImageAuth, appStyles.mt20]}
                source={images.spCategoriesBanner}
              />

              <Text
                style={[
                  appStyles.font16,
                  appStyles.mt20,
                  {color: colors.defaultRed},
                ]}>
                Enter Item Details
              </Text>
              <Text style={[appStyles.font13, {color: colors.defaultPurple}]}>
                This will help service seeker when they find your services.
              </Text>

              {/* Form Section */}
              <View
                style={[
                  homeStyles.mt30,
                  {
                    width: '100%',
                  },
                ]}>
                {/* render form */}
                <Formik
                  initialValues={{
                    itemName: '',
                    Quantity: '',
                    Price: '',
                    Weight: '',
                    description: '',
                  }}
                  onSubmit={(values, formikActions) => {
                    this.sendRequest(values);
                    formikActions.resetForm();
                  }}
                  validationSchema={yup.object().shape({
                    itemName: yup.string().required('item name is required'),
                    Quantity: yup.number().required(),
                    Price: yup.number().required(),
                    Weight: yup.number().required(),
                    description: yup.string().required(),
                  })}>
                  {({
                    values,
                    handleChange,
                    errors,
                    setFieldTouched,
                    touched,
                    isValid,
                    handleSubmit,
                  }) => (
                    <Fragment>
                      <View>
                        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>
                          Item Name
                        </Text>
                        <TextInput
                          placeholder="Enter Title"
                          placeholderTextColor={colors.defaultBlack}
                          value={values.itemName}
                          onChangeText={handleChange('itemName')}
                          onBlur={() => setFieldTouched('itemName')}
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            this.secondTextInput.focus();
                          }}
                          blurOnSubmit={false}
                          style={[
                            appStyles.mt10,
                            appStyles.loginInputIcon,
                          ]}></TextInput>
                        {touched.itemName && errors.itemName && (
                          <View style={appStyles.mt10}>
                            <Text style={[loginStyle.text12smallAuth]}>
                              {errors.itemName}
                            </Text>
                          </View>
                        )}
                        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>
                          Unit/Quantity
                        </Text>
                        <TextInput
                          placeholder="0"
                          placeholderTextColor={colors.defaultBlack}
                          keyboardType={'number-pad'}
                          value={values.Quantity}
                          onChangeText={handleChange('Quantity')}
                          onBlur={() => setFieldTouched('Quantity')}
                          returnKeyType="next"
                          ref={(input) => {
                            this.secondTextInput = input;
                          }}
                          onSubmitEditing={() => {
                            this.thirdTextInput.focus();
                          }}
                          blurOnSubmit={false}
                          style={[
                            appStyles.mt10,
                            appStyles.loginInputIcon,
                          ]}></TextInput>
                        {touched.Quantity && errors.Quantity && (
                          <View style={appStyles.mt10}>
                            <Text style={[loginStyle.text12smallAuth]}>
                              {errors.Quantity}
                            </Text>
                          </View>
                        )}
                        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>
                          Price
                        </Text>
                        <TextInput
                          placeholder="Enter Price of this service"
                          keyboardType={'number-pad'}
                          placeholderTextColor={colors.defaultBlack}
                          value={values.Price}
                          onChangeText={handleChange('Price')}
                          onBlur={() => setFieldTouched('Price')}
                          returnKeyType="next"
                          ref={(input) => {
                            this.thirdTextInput = input;
                          }}
                          onSubmitEditing={() => {
                            this.fourthTextInput.focus();
                          }}
                          blurOnSubmit={false}
                          style={[
                            appStyles.mt10,
                            appStyles.loginInputIcon,
                          ]}></TextInput>
                        {touched.Price && errors.Price && (
                          <View style={appStyles.mt10}>
                            <Text style={[loginStyle.text12smallAuth]}>
                              {errors.Price}
                            </Text>
                          </View>
                        )}
                        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>
                          Weight
                        </Text>
                        <TextInput
                          placeholder="Enter Weight in grams"
                          keyboardType={'number-pad'}
                          placeholderTextColor={colors.defaultBlack}
                          value={values.Weight}
                          onChangeText={handleChange('Weight')}
                          onBlur={() => setFieldTouched('Weight')}
                          returnKeyType="next"
                          ref={(input) => {
                            this.fourthTextInput = input;
                          }}
                          onSubmitEditing={() => {
                            this.fifthTextInput.focus();
                          }}
                          blurOnSubmit={false}
                          style={[
                            appStyles.mt10,
                            appStyles.loginInputIcon,
                          ]}></TextInput>
                        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>
                          Dine
                        </Text>
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
                            <Picker.Item
                              label="Select One"
                              value="Select One"
                            />

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
                          onPress={() =>
                            this.setState({
                              showTimeModal: true,
                            })
                          }>
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
                        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>
                          Description
                        </Text>
                        <TextInput
                          placeholder="Enter details about your service"
                          placeholderTextColor={colors.defaultBlack}
                          value={values.description}
                          onChangeText={handleChange('description')}
                          onBlur={() => setFieldTouched('description')}
                          returnKeyType="next"
                          blurOnSubmit={false}
                          ref={(input) => {
                            this.fifthTextInput = input;
                          }}
                          multiline={true}
                          style={[
                            appStyles.mt10,
                            appStyles.loginInputIcon,
                            appStyles.BigTextFieldHeight,
                          ]}></TextInput>
                        {touched.description && errors.description && (
                          <View style={appStyles.mt10}>
                            <Text style={[loginStyle.text12smallAuth]}>
                              {errors.description}
                            </Text>
                          </View>
                        )}

                        <Text style={[appStyles.mt20, appStyles.ItemLabel]}>
                          Add Portfolio
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert(
                              'Upload Image',
                              'Choose image upload option',
                              [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancelled'),
                                },
                                {
                                  text: 'Open Camera',
                                  onPress: () => this.uploadImage(1),
                                },
                                {
                                  text: 'Open Gallery',
                                  onPress: () => this.uploadImage(0),
                                },
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
                        <View
                          style={[
                            appStyles.mt40,
                            {flexWrap: 'wrap', flexDirection: 'row'},
                          ]}>
                          {this.renderImages()}
                        </View>
                        {!this.state.loading ? (
                          <TouchableOpacity
                            onPress={handleSubmit}
                            style={serviceStyles.purpleForwardButton}>
                            <Image
                              source={images.rightBlackArrow}
                              style={serviceStyles.forwardButtonArrow}
                            />
                          </TouchableOpacity>
                        ) : (
                          <Indicator></Indicator>
                        )}
                      </View>
                    </Fragment>
                  )}
                </Formik>
              </View>
              {/* render picked Images */}
            </View>
          </ScrollView>
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

export default connect(mapStateToProps, null)(spAddNewItemScreen);
