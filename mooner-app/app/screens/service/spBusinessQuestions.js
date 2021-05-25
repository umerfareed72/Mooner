import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
  LogBox,
} from 'react-native';
import Indicator from '../../components/Indicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {CheckBox} from 'react-native-elements';
import {checkPermission, PERMISSION_TYPE} from '../../utilities/AppPermissions';
const vw = Dimensions.get('window').width;
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';
import serviceStyles from '../../styles/serviceStyles';
import appStyles from '../../styles/appStyles';
import {RadioButton} from 'react-native-paper';
import colors from '../../assets/colors';
import ActiveHeader from '../../components/activeHeader';
import BackButton from '../../components/backButton';
import {connect} from 'react-redux';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import {imagesURL, baseURL, SP} from '../../utilities/constant';
import GetLocation from 'react-native-get-location';
import {CommonActions} from '@react-navigation/native';
import SPSuccessModal from '../../components/spComponents/spSuccessModal';
import * as yup from 'yup';
import {Formik} from 'formik';
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

class spBusinessQuestionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: '',
      photoUri: '',
      showSuccessPopUp: false,
      latitude: '',
      longitude: '',
      answer: '',
      answersArr: {},
      questions: [],
      loading: false,
      check: true,
      ImagesData: [],
      portfolioUri: [],
      checkAnswer1: [],
      checkAnswer2: [],
      radioCounter: 0,
      description: '',
      error: '',
    };
  }
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
  componentDidMount = () => {
    let temp = this.props?.auth?.getCurrentQuestion.business_questions?.map(
      (data) => {
        if (data?.question_type == 'radio') return data;
      },
    );
    let filtered = temp?.filter((data) => data !== undefined);
    this.setState({
      radioCounter: filtered?.length,
    });

    this.setState({
      answersArr: this.props.route.params.answers,
      ImagesData: this.props.route.params.files,
    });
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
  };
  radioBtnHandler = (id, n) => {
    const findAnswer = this.props?.auth?.getCurrentQuestion?.business_questions?.find(
      (data) => data?.id == id,
    );

    console.log(this.props?.route?.params?.answers);
    this.setState({
      answersArr: {
        ...this.state.answersArr,
        // ...this.props?.route?.params?.answers,
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
  pushAnswer = (id, ans) => {
    let key = id.toString();
    let value = ans;
    this.setState({
      answersArr: {
        ...this.state.answersArr,
        [key]: value,
      },
    });
  };

  uploadImage = async (ques_id) => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const source = {uri: response.uri};
        let size = response.fileSize / 1048576;
        if (response.fileSize / 1048576 < 10) {
          this.state.portfolioUri.push({uri: response.uri});

          var Base64 = 'data:' + response.type + ';base64,' + response.base64;
          var joined = this.state.ImagesData.concat(Base64);

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

  showPopUp = () => {
    return (
      <SPSuccessModal
        onPress={() =>
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          )
        }
        show={this.state.showSuccessPopUp}
        name={this.props.auth.userInfo.user.first_name}></SPSuccessModal>
    );
  };
  validateInputs = (values) => {
    let temp = this.props?.auth?.getCurrentQuestion.business_questions?.map(
      (data) => {
        if (data?.question_type == 'radio') return data;
      },
    );
    let filtered = temp?.filter((data) => data !== undefined);

    let radioCounter = filtered?.length;

    if (
      radioCounter ==
        this.state.checkAnswer1.length + this.state.checkAnswer2.length &&
      values.description != ''
    ) {
      this.requestPermission();
      this.setState({description: values.description});
    } else {
      Toast.show('Please select all options', {
        position: Toast.position.TOP,
      });
    }
  };

  requestPermission = async () => {
    // if (Object.keys(this.state.answersArr).length != 0) {
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

            this.registerSP();
          })
          .catch((error) => {
            const {code, message} = error;
            if (code == 'UNAVAILABLE') {
              Toast.show('Please turn on your Location', {
                position: Toast.position.TOP,
              });
            }
          });
      } else {
        Toast.show('Please turn on your Location', {
          position: Toast.position.TOP,
        });
      }
    });
    // } else {
    //   Alert.alert(
    //     'Failed',
    //     'Answer is required.',
    //     [{text: 'OK', onPress: () => console.log('Cancelled')}],
    //     {cancelable: false},
    //   );
    // }
  };

  registerSP = async () => {
    this.setState({loading: true});

    let body = {
      s_cat_parent: this.props.route.params.parent_id,
      category_id: this.props.auth.getCurrentChild.id,
      budget: 200,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      s_answers: this.state.answersArr,
      files: this.state.ImagesData,
    };
    console.log(body);

    axios({
      url: baseURL + SP + 'get_sp_service_register/',
      method: 'post',
      data: body,
      headers: {Authorization: `Bearer ${this.props.auth.userInfo.access}`},
    })
      .then(async (res) => {
        if (res.data.status == true) {
          this.setState({
            showSuccessPopUp: true,
            loading: false,
          });
        } else {
          this.setState({loading: false});
          Alert.alert(
            'Service Registration Failure',
            res.data.message,
            [{text: 'Ok', onPress: () => console.log('Cancelled')}],
            {cancelable: false},
          );
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        Alert.alert(
          'Service Registration Failed',
          'Our Team is trying to identify the problem. Please try again later',
          [{text: 'Ok', onPress: () => console.log('Cancelled')}],
          {cancelable: false},
        );
        console.error('SP Register Result Error: ', error);
      });
  };

  render = () => {
    // console.log(this.props?.navigation?.route?.params?.answers);
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
            <View style={[appStyles.spHeadingRow, appStyles.mt30]}>
              <Text style={[appStyles.fontBold, appStyles.font24]}>
                Add New Service
              </Text>
              <Text style={[appStyles.fontBold, appStyles.font24]}>
                <Text style={{color: colors.defaultPurple}}>4</Text>/4
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
              Enter Business Details
            </Text>
            <Text style={[appStyles.font13, {color: colors.defaultPurple}]}>
              This will help service seeker when they find your services.
            </Text>

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
                  {/* Questions Section */}
                  <View
                    style={[
                      homeStyles.mt10,
                      {
                        width: '100%',
                      },
                    ]}>
                    <View
                      style={[
                        serviceStyles.childContainerRow,
                        {flexWrap: 'wrap'},
                      ]}>
                      {this.props.auth.getCurrentQuestion.business_questions.map(
                        (item) =>
                          item.question_for == 'business' ? (
                            // {
                            // return
                            <View
                              style={{width: '100%'}}
                              key={item.id.toString()}>
                              {item.question_type == 'radio' ? (
                                <View style={{marginVertical: 15}}>
                                  <Text
                                    style={
                                      (serviceStyles.questionText,
                                      {marginTop: 10})
                                    }>
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
                                        this.state.checkAnswer1.includes(
                                          item?.id,
                                        )
                                          ? true
                                          : false
                                      }
                                      onPress={() =>
                                        this.radioBtnHandler(item?.id, 1)
                                      }
                                    />
                                    <Text
                                      style={[
                                        serviceStyles.radioText,
                                        appStyles.rightSpace,
                                      ]}>
                                      {item.r_text_one}
                                    </Text>
                                    <CheckBox
                                      checkedIcon="dot-circle-o"
                                      uncheckedIcon="circle-o"
                                      size={20}
                                      checkedColor={colors.defaultYellow}
                                      uncheckedColor={colors.defaultYellow}
                                      checked={
                                        this.state.checkAnswer2.includes(
                                          item?.id,
                                        )
                                          ? true
                                          : false
                                      }
                                      onPress={() =>
                                        this.radioBtnHandler(item?.id, 2)
                                      }
                                    />

                                    <Text style={serviceStyles.radioText}>
                                      {item.r_text_two}
                                    </Text>
                                  </View>
                                </View>
                              ) : (
                                false
                              )}

                              {item.question_type == 'text' ? (
                                <ScrollView>
                                  <Text style={serviceStyles.questionText}>
                                    {item.question_text}
                                  </Text>
                                  <TextInput
                                    style={[
                                      appStyles.answerInputField,
                                      appStyles.mt10,
                                    ]}
                                    onChangeText={(text) =>
                                      this.setState({answer: text})
                                    }
                                    multiline={true}
                                    onEndEditing={() =>
                                      this.pushAnswer(
                                        item.id,
                                        this.state.answer,
                                      )
                                    }
                                  />
                                </ScrollView>
                              ) : (
                                false
                              )}
                              {/* <Text
                          style={[serviceStyles.questionText, appStyles.mt10]}>
                          Upload Image/Video{' '}
                          <Text
                            style={{color: colors.defaultRed, fontSize: 12}}>
                            Max size 2mb
                          </Text>
                        </Text> */}
                              {/* <TouchableOpacity
                          onPress={() => this.uploadImage()}
                          style={[
                            appStyles.answerInputField,
                            appStyles.mt10,
                            {justifyContent: 'center', alignItems: 'center'},
                          ]}>
                          <Image
                            source={images.uploadIcon}
                            style={{width: 24, resizeMode: 'contain'}}
                          />
                        </TouchableOpacity> */}
                            </View>
                          ) : (
                            false
                          ),
                      )}
                    </View>
                  </View>
                  <Text style={[serviceStyles.questionText, appStyles.mt10]}>
                    Description
                  </Text>
                  <TextInput
                    style={[appStyles.answerInputField, appStyles.mt10]}
                    multiline={true}
                    placeholder="Describe your answer"
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={() => setFieldTouched('description')}></TextInput>

                  {touched.description && errors.description && (
                    <View style={appStyles.mt10}>
                      <Text style={[loginStyle.text12smallAuth]}>
                        {errors.description}
                      </Text>
                    </View>
                  )}

                  {this.state.loading == false ? (
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={[
                        serviceStyles.purpleForwardButton,
                        appStyles.mt30,
                      ]}>
                      <Image
                        source={images.rightBlackArrow}
                        style={serviceStyles.forwardButtonArrow}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Indicator></Indicator>
                  )}
                </Fragment>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>

        {this.state.showSuccessPopUp && this.showPopUp()}
      </SafeAreaView>
    );
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(spBusinessQuestionsScreen);
