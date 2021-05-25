import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ActiveHeader from '../../components/activeHeader';
import BackButton from '../../components/backButton';
import appStyles from '../../styles/appStyles';
import serviceStyles from '../../styles/serviceStyles';
import {images} from '../../assets/images';
import colors from '../../assets/colors';
import {connect} from 'react-redux';
import axios from 'axios';
import {getChildCategories, updateQuestions} from '../../redux/actions/index';
import {baseURL, imagesURL, spImagesURL} from '../../utilities/constant';
import {useDispatch} from 'react-redux';
import SSChildService from '../../components/ssComponent/ssChildService';
import Toast from 'react-native-tiny-toast';
const childCategoryScreen = (props) => {
  const [isError, setError] = useState(null);

  const dispatch = useDispatch();

  const renderChildServices = () => (
    <FlatList
      numColumns={2}
      data={props.route?.params?.childCategories}
      renderItem={({item}) => (
        <SSChildService
          name={item.name}
          categoryImage={item.category_image}
          id={item.id}
          onPress={() => getQuestions(item)}
          price={'Starting from $999'}
        />
      )}
      keyExtractor={(item) => item?.id?.toString()}
    />
  );

  const getQuestions = (item) => {
    // alert(item.id);
    var body = new FormData();
    body.append('sub_category', item.id);
    axios
      .post(baseURL + 'category_management/get_questions/', body)
      .then(async (res) => {
        if (res.data.status) {
          if (res.data.data.length > 0) {
            dispatch(updateQuestions(res.data.data));
            props.navigation.navigate('ServiceQuestion', {
              questions: res.data.data,
              category: item,
              parentCategory: props?.route?.params?.parentCategory,
              parentCategoryId: item?.tn_parent,
            });
          } else {
            // this.props.navigation.navigate('MoonerList', {
            //   category: item,
            //   parentCategoryId: item.tn_parent,
            // });
            Toast.show('Coming Soon', {
              position: Toast.position.TOP,
            });
          }
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.error('Get Questions Result Error: ', error);
      });
  };

  return (
    <>
      <StatusBar sbarStyle="dark-content" />
      <SafeAreaView style={[appStyles.body, {position: 'relative'}]}>
        {/* header */}
        <ActiveHeader navigation={props.navigation} />
        <BackButton navigation={props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[serviceStyles.signupbodyContainer]}>
            {props?.route?.params?.parentCategory?.category_image == '' ? (
              false
            ) : (
              <View>
                <Image
                  style={[serviceStyles.signupImageAuth]}
                  source={{
                    uri:
                      imagesURL +
                      props.route?.params?.parentCategory?.category_image,
                  }}></Image>
              </View>
            )}

            <View style={[appStyles.mt30]}>
              <Text style={[appStyles.h1ServiceHeading]}>
                {/* Get your Haircut by */}
                {
                  props?.route?.params?.parentCategory?.category_heading_text
                }{' '}
                {props?.route?.params?.parentCategory?.category_heading_text2}
              </Text>

              <Text
                style={[
                  appStyles.h3ServiceHeading,
                  appStyles.mt10,
                  {color: colors.defaultPurple},
                ]}>
                Select a service
              </Text>
            </View>
            {/* Child Services List */}
            <View style={[appStyles.mt20]}>{renderChildServices()}</View>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text
                style={[appStyles.mt30, appStyles.linkText, appStyles.left]}>
                Explore more categories
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default childCategoryScreen;
