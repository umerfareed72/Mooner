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
  KeyboardAvoidingView,
} from 'react-native';

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
import Indicator from '../../components/Indicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {CheckBox} from 'react-native-elements';
import Toast from 'react-native-tiny-toast';
import * as yup from 'yup';
import {Formik} from 'formik';
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

class spServiceQuestionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: '',
      photoUri: '',
      questions: [],
      answer: '',
      answersObj: {},
      check: null,
      ImagesData: [],
      portfolioUri: [],
      checkAnswer1: [],
      checkAnswer2: [],
      radioCounter: 0,
      description: '',
      error: '',
    };
  }

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
  componentDidMount() {
    console.log(this.props?.auth?.getCurrentQuestion.sp_questions);
    let temp = this.props?.auth?.getCurrentQuestion.sp_questions?.map(
      (data) => {
        if (data?.question_type == 'radio') return data;
      },
    );
    let filtered = temp?.filter((data) => data !== undefined);
    this.setState({
      radioCounter: filtered?.length,
    });
  }
  move = () => {
    this.props.navigation.navigate('spBusinessQuestions', {
      answers: this.state.answersObj,
      files: this.state.ImagesData,
      parent_id: this.props.route.params.parent_id,
    });
  };

  radioBtnHandler = (id, n) => {
    const findAnswer = this.props?.auth?.getCurrentQuestion.sp_questions?.find(
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
  validateInputs = (values) => {
    let temp = this.props?.auth?.getCurrentQuestion.sp_questions?.map(
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
      this.setState({description: values.description});
      this.move();
    } else {
      Toast.show('Please select all options', {
        position: Toast.position.TOP,
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
                <Text style={{color: colors.defaultPurple}}>3</Text>/4
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
              Upload Your Documents
            </Text>
            <Text style={[appStyles.font13, {color: colors.defaultPurple}]}>
              The document will be required for your verification
            </Text>

            {/* Questions Section */}
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
                      {!this.props.auth.loading ? (
                        this.props?.auth?.getCurrentQuestion.sp_questions?.map(
                          (item, index) => (
                            <KeyboardAvoidingView
                              style={{width: '100%'}}
                              key={item.id}>
                              {item.question_type == 'text' &&
                              item.question_for == 'provider' ? (
                                <ScrollView>
                                  <Text
                                    style={[
                                      serviceStyles.questionText,
                                      appStyles.mt10,
                                    ]}>
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
                                  {/* <Text style={[serviceStyles.questionText, appStyles.mt10]}>
          Upload Image/Video{' '}
          <Text style={{color: colors.defaultRed, fontSize: 12}}>
            Max size 2mb
          </Text>
        </Text>
        {this.state.photoData != '' ? (
          <TouchableOpacity onPress={() => this.uploadImage()}>
            <ImageBackground
              source={{uri: this.state.photoUri}}
              imageStyle={{borderRadius: 16, resizeMode: 'contain'}}
              style={[
                appStyles.answerInputField,
                appStyles.mt10,
              ]}></ImageBackground>
          </TouchableOpacity>
        ) : (
        )} */}
                                </ScrollView>
                              ) : (
                                false
                              )}
                              {item.question_type == 'radio' &&
                              item.question_for == 'provider' ? (
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
                                      {' '}
                                      {item.r_text_two}
                                    </Text>
                                  </View>
                                </ScrollView>
                              ) : (
                                false
                              )}
                            </KeyboardAvoidingView>
                          ),
                        )
                      ) : (
                        <Indicator></Indicator>
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
                  {/* <Text style={[serviceStyles.questionText, appStyles.mt10]}>
              Upload Image/Video{' '}
              <Text style={{color: colors.defaultRed, fontSize: 12}}>
                Max size 2mb
              </Text>
            </Text>
            <TouchableOpacity
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
            </TouchableOpacity>
            <View
              style={[
                appStyles.mt40,
                {flexWrap: 'wrap', flexDirection: 'row'},
              ]}>
              {this.renderImages()}
            </View> */}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[serviceStyles.purpleForwardButton, appStyles.mt30]}>
                    <Image
                      source={images.rightBlackArrow}
                      style={serviceStyles.forwardButtonArrow}
                    />
                  </TouchableOpacity>
                </Fragment>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(spServiceQuestionsScreen);
