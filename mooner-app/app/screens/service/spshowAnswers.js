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

import {CommonActions} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
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
import {imagesURL, baseURL, SP, spImagesURL} from '../../utilities/constant';
import Indicator from '../../components/Indicator';
import Toast from 'react-native-tiny-toast';
import SPSuccessModal from '../../components/spComponents/spSuccessModal';
import * as yup from 'yup';
import {Formik} from 'formik';

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
import {CheckBox} from 'react-native-elements';
import loginStyle from '../../styles/loginStyle';
class spshowAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: '',
      photoUri: '',
      questions: [],
      answer: '',
      check: true,
      answersArr: {},
      portfolioUri: [],
      ImagesData: [],
      showSuccessPopUp: false,
      loading: false,
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
      answersArr: {
        ...this.state.answersArr,
        [key]: value,
      },
    });
  };
  componentDidMount() {
    // alert('here');
    let temp = this.props?.auth?.getAnswer?.map((data) => {
      if (data?.question_type == 'radio') return data;
    });
    let filtered = temp?.filter((data) => data !== undefined);
    this.setState({
      radioCounter: filtered?.length,
    });
  }
  updateQuestions = () => {
    let body = {
      s_answers: this.state.answersArr,
      files: this.state.ImagesData,
    };
    this.setState({loading: true});

    axios({
      url:
        baseURL +
        SP +
        'edit_sp_service_register/' +
        this.props.route.params.service_id +
        '/',
      method: 'PUT',
      data: body,
      headers: {
        Authorization: `Bearer  ${this.props.auth.userInfo.access}`,
      },
    })
      .then((res) => {
        this.setState({showSuccessPopUp: true, loading: false});
      })
      .catch((error) => {
        this.setState({loading: false});

        Alert.alert(
          'Failed',
          'Data Not Updated',
          [{text: 'Ok', onPress: () => console.log('ok')}],
          {cancelable: false},
        );
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
        show={true}
        name={this.props.auth.userInfo.user.first_name}></SPSuccessModal>
    );
  };

  mapAnswers = () => {
    const checkArr1 = this.props?.auth?.getAnswer?.map((data) => {
      if (data?.r_text_one == data?.answer) return data?.question_id;
    });
    const checkArr2 = this.props?.auth?.getAnswer?.map((data) => {
      if (data?.r_text_two == data?.answer) return data?.question_id;
    });
    this.setState({
      checkAnswer1: checkArr1,
      checkAnswer2: checkArr2,
    });
    let obj = {};
    for (let i = 0; i < this.state.checkAnswer1.length; i++) {
      const findAnswer = this.props?.auth?.getAnswer?.find(
        (data) => data?.question_id == this.state.checkAnswer1[i],
      );

      obj = {
        ...obj,
        [findAnswer.question_id]: findAnswer?.r_text_one,
      };
    }
    for (let i = 0; i < this.state.checkAnswer2.length; i++) {
      const findAnswer = this.props?.auth?.getAnswer?.find(
        (data) => data?.question_id == this.state.checkAnswer2[i],
      );
      obj = {
        ...obj,
        [findAnswer.question_id]: findAnswer?.r_text_two,
      };
    }
    this.setState({
      answersArr: obj,
    });
  };

  radioBtnHandler = (id, n) => {
    const findAnswer = this.props?.auth?.getAnswer?.find(
      (data) => data?.question_id == id,
    );
    this.setState({
      answersArr: {
        ...this.state.answersArr,
        [findAnswer.question_id]:
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

  renderImages = () => (
    <>
      {this.state.portfolioUri?.map((item) => (
        <ImageBackground
          source={{
            uri: item.uri,
          }}
          style={{height: 50, width: 90, margin: 5}}
          imageStyle={{
            height: 50,
            width: 90,
            borderRadius: 12,
          }}></ImageBackground>
      ))}

      {this?.props?.auth?.getFiles?.map((item) => (
        <ImageBackground
          source={{
            uri: spImagesURL + '/' + item.sp_service_image,
          }}
          style={{height: 50, width: 90, margin: 5}}
          imageStyle={{
            height: 50,
            width: 90,
            borderRadius: 12,
          }}></ImageBackground>
      ))}
    </>
  );
  renderQuestions = () =>
    this.props.auth.getAnswer.map((item, key) => (
      <KeyboardAvoidingView style={{width: '100%'}} key={item.id}>
        <View style={{width: '100%'}} key={JSON.stringify(item.question_id)}>
          {item.question_type == 'text' || item.question_type == 'input' ? (
            <ScrollView>
              <Text style={[serviceStyles.questionText, appStyles.mt10]}>
                {item.question_text}
              </Text>
              <TextInput
                placeholder={
                  item.answer != '' ? item.answer : this.state.answer
                }
                style={[appStyles.answerInputField, appStyles.mt10]}
                onChangeText={(text) => this.setState({answer: text})}
                multiline={true}
                onEndEditing={() =>
                  this.pushAnswer(item.question_id, this.state.answer)
                }
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
                {/* <RadioButton
                value={item.r_text_one}
                status={
                  this.state.checkAnswer1.includes(item?.question_id)
                    ? 'checked'
                    : 'unchecked'
                }
                color={colors.defaultYellow}
                uncheckedColor={colors.defaultYellow}
                onPress={() => {
                  this.radioBtnHandler(item?.question_id, 1);
                  // this.setState({check: !this.state.check}),
                  //   this.pushAnswer(item.id, item.r_text_one);
                }}
              /> */}
                <CheckBox
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={20}
                  checkedColor={colors.defaultYellow}
                  uncheckedColor={colors.defaultYellow}
                  checked={
                    this.state.checkAnswer1.includes(item?.question_id)
                      ? true
                      : false
                  }
                  onPress={() => this.radioBtnHandler(item?.question_id, 1)}
                />
                <Text style={[serviceStyles.radioText, appStyles.rightSpace]}>
                  {item.r_text_one}
                </Text>
                <CheckBox
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  size={20}
                  checkedColor={colors.defaultYellow}
                  uncheckedColor={colors.defaultYellow}
                  checked={
                    this.state.checkAnswer2.includes(item?.question_id)
                      ? true
                      : false
                  }
                  onPress={() => {
                    this.radioBtnHandler(item?.question_id, 2);
                  }}
                />
                {/* <RadioButton
                value={item.r_text_two}
                status={
                  this.state.checkAnswer2.includes(item?.question_id)
                    ? 'checked'
                    : 'unchecked'
                }
                color={colors.defaultYellow}
                onPress={() => {
                  this.radioBtnHandler(item?.question_id, 2);
                  // this.setState({check: !this.state.check}),
                  //   this.pushAnswer(item.id, item.r_text_two);
                }}
                uncheckedColor={colors.defaultYellow}
              /> */}
                <Text style={serviceStyles.radioText}> {item.r_text_two}</Text>
              </View>
            </ScrollView>
          ) : (
            false
          )}
        </View>
      </KeyboardAvoidingView>
    ));

  uploadImage = async () => {
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('image picked');
        var Base64 = 'data:' + response.type + ';base64,' + response.base64;
        var joined = this.state.ImagesData.concat(Base64);

        const source = {uri: response.uri};
        let size = response.fileSize / 1048576;
        if (response.fileSize / 1048576 < 10) {
          this.state.portfolioUri.push({uri: response.uri});

          this.setState({
            photoData: response.data,
            photoUri: response.uri,
            ImagesData: joined,
          });
        } else {
          alert('Select another image its size is to large');
        }

        console.log('image size', response.fileSize / 1048576);
      }
    });
  };
  validateInputs = (values) => {
    let temp = this.props?.auth?.getAnswer?.map((data) => {
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
      this.updateQuestions();
    } else if (this.state.description == '') {
      this.setState({error: 'description is a required field'});
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
                  Edit Service
                </Text>
                <Text style={[appStyles.fontBold, appStyles.font24]}>
                  <Text style={{color: colors.defaultPurple}}>1</Text>/1
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
                        {this.renderQuestions()}
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
            </TouchableOpacity> */}
                    {/* <View
              style={[
                appStyles.mt40,
                {flexWrap: 'wrap', flexDirection: 'row'},
              ]}>
              {this.renderImages()}
            </View> */}
                    {!this.state.loading ? (
                      <TouchableOpacity
                        onPress={handleSubmit}
                        // onPress={() => this.updateQuestions()}
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
          </ScrollView>
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

export default connect(mapStateToProps, null)(spshowAnswers);
