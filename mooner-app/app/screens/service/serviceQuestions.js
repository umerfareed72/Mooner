import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  ImageBackground,
  StatusBar,
  Alert,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import ActiveHeader from '../../components/activeHeader';
import BackButton from '../../components/backButton';
import appStyles from '../../styles/appStyles';
import serviceStyles from '../../styles/serviceStyles';
import {images} from '../../assets/images';
import colors from '../../assets/colors';
import {RadioButton} from 'react-native-paper';
import {Icon} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {connect} from 'react-redux';
import {baseURL, imagesURL} from '../../utilities/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetSuccess} from '../../redux/actions/index';
import moment from 'moment';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DatePicker from 'react-native-date-picker';
import GetLocation from 'react-native-get-location';
import {CommonActions} from '@react-navigation/native';
import {checkPermission, PERMISSION_TYPE} from '../../utilities/AppPermissions';
import SSSuccessModal from '../../components/ssComponent/ssSuccessModal';
import homeStyles from '../../styles/homeStyles';
import * as POSTJOB from '../../redux/actions/postjob.action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import {Formik} from 'formik';
import SSBudgetModal from '../../components/ssComponent/ssBudgetModal';
import SSDateTimePicker from '../../components/ssComponent/ssDateTimePicker';
import Indicator from '../../components/Indicator';
import {CheckBox} from 'react-native-elements';
import Toast from 'react-native-tiny-toast';
import loginStyle from '../../styles/loginStyle';
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
};

class serviceQuestionScreen extends Component {
  constructor(props) {
    super(props);

    this.months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    this.state = {
      check: true,
      photoData: '',
      photoUri: '',
      questions: [],
      ageValues: [1000],
      date: new Date(),
      showDatePicker: false,
      selectedMonth: moment(Date.now()).format('MM'),
      selectedDate: moment(Date.now()).format('DD'),
      selectedYear: moment(Date.now()).format('YYYY'),
      time: moment(Date.now()).format('hh:mm'),
      showtimePicker: false,
      timeMode: moment(Date.now()).format('A'),
      showBudgetModal: false,
      showDateTimeModal: false,
      answer: '',
      answersArr: [],
      answersObj: {},
      portfolioUri: [],
      moonersList: [],
      latitude: '',
      longitude: '',
      ImagesData: [],
      checkAnswer1: [],
      checkAnswer2: [],
      radioCounter: 0,
      uniqueValue: 0,
      description: '',
      error: '',
      timeType: true,
      loading: false,
      checked: false,
      showtimePicker: false,
      showDatePicker: false,
    };
  }
  forceRemount = () => {
    this.setState((preState) => ({uniqueValue: preState.uniqueValue + 1}));
  };

  onRemoveImages = (index) => {
    const temp = [...this.state.portfolioUri].filter(
      (data, i) => data?.uri !== index,
    );
    this.setState({
      portfolioUri: temp,
    });
  };
  renderImages = () =>
    this.state.portfolioUri.map((item, i) => (
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
        }}>
        <TouchableOpacity
          onPress={() => this.onRemoveImages(item?.uri)}
          style={{
            backgroundColor: colors.defaultRed,
            borderRadius: 100,
            alignSelf: 'flex-end',
            marginEnd: -8,
            marginTop: -8,
          }}>
          <Icon
            style={{
              fontSize: 15,
              color: colors.white,
              padding: 3,
            }}
            name="cross"
            type="Entypo"
          />
        </TouchableOpacity>
      </ImageBackground>
    ));
  componentDidMount = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch((error) => {
        const {code, message} = error;
        if (code == 'UNAVAILABLE') {
          Toast.show('Please turn on your Location', {
            position: Toast.position.TOP,
          });
        }
      });

    this.setState({answersArr: this.props?.auth?.getallQuestion});
  };

  uploadImage = async () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const source = {uri: response.uri};
        let size = response.fileSize / 1048576;
        if (response.fileSize / 1048576 < 10) {
          var Base64 = 'data:' + response.type + ';base64,' + response.base64;
          var joined = this.state.ImagesData.concat(Base64);
          this.state.portfolioUri.push({uri: response.uri});

          this.setState({
            photoData: response.data,
            photoUri: response.uri,
            ImagesData: joined,
          });
        } else {
          alert('Select another image its size is to large');
        }
      }
    });
  };

  pushAnswer = (id, ans) => {
    let key = id.toString();
    let value = ans;
    this.setState({
      answersObj: {
        ...this.state.answersObj,
        [key]: value,
      },
    });
  };

  radioBtnHandler = (id, n) => {
    const findAnswer = this.props?.auth?.getallQuestion?.find(
      (data) => data?.id == id,
    );
    this.setState({
      answersObj: {
        ...this.state.answersObj,
        [findAnswer.id]:
          n == 1 ? findAnswer?.r_text_one : findAnswer?.r_text_two,
      },
    });

    if (n == 1) {
      const check = this.state.checkAnswer2.includes(id);
      if (check) {
        const filtered = this.state.checkAnswer2.filter((data) => data !== id);
        this.setState({
          checkAnswer2: filtered,
          checkAnswer1: [...this.state.checkAnswer1, id],
        });
      } else this.setState({checkAnswer1: [...this.state.checkAnswer1, id]});
    } else {
      const check = this.state.checkAnswer1.includes(id);
      if (check) {
        const filtered = this.state.checkAnswer1.filter((data) => data !== id);
        this.setState({
          checkAnswer1: filtered,
          checkAnswer2: [...this.state.checkAnswer2, id],
        });
      } else this.setState({checkAnswer2: [...this.state.checkAnswer2, id]});
    }
  };

  renderQuestions = () => {
    return (
      <View
        style={[
          {
            width: '100%',
          },
        ]}>
        <View style={[serviceStyles.childContainerRow, {flexWrap: 'wrap'}]}>
          {this.props?.auth?.getallQuestion?.map((item, index) => (
            <KeyboardAvoidingView style={{width: '100%'}} key={item.id}>
              {item.question_type == 'text' ? (
                <ScrollView>
                  <Text style={[serviceStyles.questionText]}>
                    {item.question_text}
                  </Text>
                  <TextInput
                    key={this.state.uniqueValue}
                    style={[appStyles.answerInputField, appStyles.mt10]}
                    onChangeText={(text) => this.setState({answer: text})}
                    multiline={true}
                    onEndEditing={() =>
                      this.pushAnswer(item.id, this.state.answer)
                    }
                    // value={
                    //   this.state.answer.length > 0 ? this.state.answer : null
                    // }
                  />
                </ScrollView>
              ) : (
                false
              )}
              {item.question_type == 'radio' ? (
                <ScrollView style={{marginVertical: 15}}>
                  <Text style={serviceStyles.questionText}>
                    {item.question_text}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <CheckBox
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      size={20}
                      checkedColor={colors.defaultYellow}
                      uncheckedColor={colors.defaultYellow}
                      checked={
                        this.state.checkAnswer1.includes(item?.id)
                          ? true
                          : false
                      }
                      onPress={() => this.radioBtnHandler(item?.id, 1)}
                    />
                    {/* <RadioButton
                      value={item.r_text_one}
                      status={
                        this.state.checkAnswer1.includes(item?.id)
                          ? 'checked'
                          : 'unchecked'
                      }
                      color={colors.defaultYellow}
                      uncheckedColor={colors.defaultYellow}
                      onPress={() => {
                        this.radioBtnHandler(item?.id, 1);
                        // this.setState({check: !this.state.check}),
                        //   this.pushAnswer(item.id, item.r_text_one);
                      }}
                    /> */}
                    <Text
                      style={[serviceStyles.radioText, appStyles.rightSpace]}>
                      {item.r_text_one}
                    </Text>
                    <CheckBox
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      size={20}
                      checkedColor={colors.defaultYellow}
                      uncheckedColor={colors.defaultYellow}
                      checked={
                        this.state.checkAnswer2.includes(item?.id)
                          ? true
                          : false
                      }
                      onPress={() => this.radioBtnHandler(item?.id, 2)}
                    />
                    {/* <RadioButton
                      value={item.r_text_two}
                      status={
                        this.state.checkAnswer2.includes(item?.id)
                          ? 'checked'
                          : 'unchecked'
                      }
                      color={colors.defaultYellow}
                      onPress={() => {
                        this.radioBtnHandler(item?.id, 2);
                        // this.setState({check: !this.state.check}),
                        //   this.pushAnswer(item.id, item.r_text_two);
                      }}
                      uncheckedColor={colors.defaultYellow}
                    /> */}
                    <Text style={serviceStyles.radioText}>
                      {' '}
                      {item.r_text_two}
                    </Text>
                  </View>
                </ScrollView>
              ) : (
                false
              )}
            </KeyboardAvoidingView>
          ))}
        </View>
      </View>
    );
  };

  postRequest = () => {
    this.setState({
      showBudgetModal: false,
    });
    this.forceRemount();
    this.props.setJobAnswer(this.state.answersObj);
    this.props.setJobSubCat(this.props.route?.params?.category?.id);
    this.props.setJobCat(this.props.route?.params?.parentCategoryId);
    this.props.setSSID(this.props?.auth?.userInfo?.user?.id);
    this.props.setJobDesc(this.state.description);
    this.props.setBudegt(this.state.ageValues[0]);
    this.props.setDateTime(
      new moment(
        this.state.selectedYear +
          '-' +
          this.state.selectedMonth +
          '-' +
          this.state.selectedDate,
        'YYYY-MM-DD',
      ).utc(),
    );

    this.props.getMoonerList(
      this.props.route?.params?.category?.id,
      this.state.ageValues[0],
    );
    this.props.navigation.navigate('MoonerList', {
      parentCategoryId: this.props.route.params.parentCategoryId,
      parentCategory: this.props.route.params.parentCategory,
      category: this.props.route.params.category,
      ss_id: this.props.auth.userInfo.user.id,
      auth_token: this.props.auth.userInfo.access,
      moonersList: this.state.moonersList,
    });
  };

  renderBudgetModal = () => {
    return (
      <SSBudgetModal
        showBudget={this.state.showBudgetModal}
        value={this.state.ageValues}
        onValuesChange={(val) => {
          this.setState({ageValues: val});
        }}
        onPress={() => {
          this.showFinalStep();
        }}
        onPressDateModal={() => {
          this.setState({
            showDateTimeModal: true,
            showBudgetModal: false,
            timeType: false,
          });
        }}
        bgColor={this.state.timeType}
        onPressDate={() => {
          this.setState({timeType: true});
        }}></SSBudgetModal>
    );
  };

  showFinalStep = async () => {
    if (this.props.auth.userInfo == '') {
      Alert.alert(
        'Booking Error',
        'Login to continue Booking',
        [
          {text: 'Login', onPress: () => this.logout()},
          {text: 'Cancel', onPress: () => console.log('Cancelled')},
        ],
        {cancelable: true},
      );
    } else {
      this.setState({
        showBudgetModal: false,
      });
      this.postRequest();
    }
  };
  requestPermission = async () => {
    this.setState({loading: true});
    checkPermission(PERMISSION_TYPE.location).then((res) => {
      if (res == true) {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
          .then((location) => {
            this.setState({
              latitude: location.latitude,
              longitude: location.longitude,
            });

            this.setState({showBudgetModal: true});
            this.setState({loading: false});
          })
          .catch((error) => {
            const {code, message} = error;
            if (code == 'UNAVAILABLE') {
              this.setState({loading: false});
              Toast.show('Please turn on your Location', {
                position: Toast.position.TOP,
              });
            }
          });
      } else {
        this.setState({loading: false});
        Toast.show('Please turn on your Location', {
          position: Toast.position.TOP,
        });
      }
    });
  };
  validateInputs = (values) => {
    let temp = this.props?.auth?.getallQuestion?.map((data) => {
      if (data?.question_type == 'radio') return data;
    });
    let filtered = temp?.filter((data) => data !== undefined);

    let radioCounter = filtered?.length;

    if (
      radioCounter ==
        this.state.checkAnswer1.length + this.state.checkAnswer2.length &&
      values.description != ''
    ) {
      this.setState({description: values.description});
      this.requestPermission();
    } else {
      Toast.show('Please select all options', {
        position: Toast.position.TOP,
      });
    }
  };
  render() {
    return (
      <>
        <StatusBar sbarStyle="dark-content" />
        <SafeAreaView style={appStyles.body}>
          {/* header */}
          <ActiveHeader navigation={this.props.navigation} />
          <BackButton navigation={this.props.navigation} />
          <KeyboardAwareScrollView>
            <TouchableWithoutFeedback
              onPress={() =>
                this.setState({
                  showBudgetModal: false,
                  showDatePicker: false,
                  showDateTimeModal: false,
                })
              }>
              <Formik
                initialValues={{
                  description: '',
                }}
                onSubmit={(values, formikActions) => {
                  this.validateInputs(values);
                  formikActions.resetForm();
                }}
                validationSchema={yup.object().shape({
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
                    <View style={[serviceStyles.signupbodyContainer]}>
                      <View>
                        <Image
                          style={[serviceStyles.signupImageAuth]}
                          source={{
                            uri:
                              imagesURL +
                              this.props.route.params.parentCategory
                                .category_image,
                          }}></Image>
                      </View>
                      <View style={[appStyles.mt30]}>
                        <Text style={[appStyles.h1ServiceHeading]}>
                          <Text style={{color: colors.defaultRed}}>Mooner</Text>{' '}
                          require some details from you.
                        </Text>
                        <Text
                          style={[
                            appStyles.h3ServiceHeading,
                            appStyles.mt20,
                            {color: colors.defaultPurple},
                          ]}>
                          Select!
                        </Text>
                      </View>
                      {/* questions */}
                      {/* {this.props.route.params.questions != undefined &&
              this.props.route.params.questions.length ? ( */}
                      <View style={[appStyles.mt10]}>
                        {this.renderQuestions()}
                        <Text
                          style={[serviceStyles.questionText, appStyles.mt10]}>
                          Description
                        </Text>

                        <TextInput
                          style={[appStyles.answerInputField, appStyles.mt10]}
                          multiline={true}
                          placeholder="Describe your answer"
                          value={values.description}
                          onChangeText={handleChange('description')}
                          onBlur={() => setFieldTouched('description')}
                        />
                        {touched.description && errors.description && (
                          <View style={appStyles.mt10}>
                            <Text style={[loginStyle.text12smallAuth]}>
                              {errors.description}
                            </Text>
                          </View>
                        )}
                      </View>
                      {!this.state.loading ? (
                        <TouchableOpacity
                          onPress={handleSubmit}
                          style={[serviceStyles.servicesrightContainer]}>
                          <Image
                            style={[serviceStyles.icon30]}
                            source={images.rightArrow}></Image>
                        </TouchableOpacity>
                      ) : (
                        <Indicator></Indicator>
                      )}
                    </View>
                  </Fragment>
                )}
              </Formik>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
          {this.state.showBudgetModal && this.renderBudgetModal()}
          {this.state.showDateTimeModal && (
            <SSDateTimePicker
              showModal={this.state.showDateTimeModal}
              timeValue={this.state.time}
              timeMode={this.state.timeMode}
              showtimePicker={this.state.showtimePicker}
              onPressTime={() => {
                this.setState({
                  showtimePicker: !this.state.showtimePicker,
                  showDatePicker: false,
                });
              }}
              showDatePicker={this.state.showDatePicker}
              onPressDate={() => {
                this.setState({
                  showDatePicker: !this.state.showDatePicker,
                  showtimePicker: false,
                });
              }}
              cdate={this.state.date}
              onPressDone={() => {
                this.setState({
                  showDateTimeModal: false,
                  showBudgetModal: true,
                });
              }}
              selectedDate={this.state.selectedDate}
              selectedMonth={this.months[this.state.selectedMonth - 1]}
              selectedYear={this.state.selectedYear}
              onDateChange={(d) => {
                this.setState({
                  selectedDate: moment(d).format('DD'),
                  selectedMonth: moment(d).format('MM'),
                  selectedYear: moment(d).format('YYYY'),
                  date: d,
                });
              }}
              onTimeChange={(d) => {
                this.setState({time: moment(d).format('hh:mm')});
                this.setState({timeMode: moment(d).format('A'), date: d});
              }}></SSDateTimePicker>
          )}
        </SafeAreaView>
      </>
    );
  }

  logout = () => {
    if (this.removeToken('Access_Token') && this.removeToken('User_Info')) {
      this.props.resetSuccess();
      this.props.navigation.replace('logout');
    }
  };

  removeToken = async (key) => {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (exception) {
      return false;
    }
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetSuccess: (data) => dispatch(resetSuccess(data)),
    setJobAnswer: (data) => dispatch(POSTJOB.setJobAnswer(data)),
    setJobSubCat: (data) => dispatch(POSTJOB.setJobSubCat(data)),
    setJobCat: (data) => dispatch(POSTJOB.setJobCat(data)),
    setSSID: (data) => dispatch(POSTJOB.setSSID(data)),
    setJobDesc: (data) => dispatch(POSTJOB.setJobDesc(data)),
    setBudegt: (data) => dispatch(POSTJOB.setBudegt(data)),
    setDateTime: (data) => dispatch(POSTJOB.setDateTime(data)),
    getMoonerList: (child_id, max_budget) =>
      dispatch(POSTJOB.moonerFilter(child_id, 0, max_budget, 'budget')),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(serviceQuestionScreen);
