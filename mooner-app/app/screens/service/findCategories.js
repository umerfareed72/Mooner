import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
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
  const [showModal, setshowModal] = useState(false);
  const [showfilterModal, setshowfilterModal] = useState(false);
  const [list, setlist] = useState([]);
  const [filterOption, setfilterOption] = useState(3);
  const dispatch = useDispatch();

  const renderChildServices = () => {
    if (filterOption == 3) {
      return (
        <FlatList
          numColumns={2}
          data={props?.route?.params?.result}
          renderItem={({item}) => (
            <SSChildService
              name={item?.name}
              categoryImage={item?.category_image}
              id={item?.id}
              onPress={() => getChild(item)}
              price={'Starting from $999'}
            />
          )}
          keyExtractor={(item) => item?.id?.toString()}
        />
      );
    } else if (filterOption == 1) {
      return (
        <FlatList
          numColumns={2}
          data={props?.route?.params?.result}
          renderItem={({item}) => (
            <SSChildService
              name={item?.name}
              categoryImage={item?.category_image}
              id={item?.id}
              onPress={() => getChild(item)}
              price={'Starting from $999'}
            />
          )}
          keyExtractor={(item) => item?.id?.toString()}
        />
      );
    } else {
      return (
        <FlatList
          numColumns={2}
          data={props?.route?.params?.result}
          renderItem={({item}) => (
            <SSChildService
              name={item?.name}
              categoryImage={item?.category_image}
              id={item?.id}
              onPress={() => getChild(item)}
              price={'Starting from $999'}
            />
          )}
          keyExtractor={(item) => item?.id?.toString()}
        />
      );
    }
  };
  useEffect(() => {
    setlist(props?.route?.params?.result);
  }, []);
  filterResult = (option) => {
    setshowfilterModal(false);
    setfilterOption(option);
  };
  const getChild = (item) => {
    var body = new FormData();
    body.append('tn_parent', item.id);
    axios
      .post(baseURL + 'category_management/get_childs/', body)
      .then(async (res) => {
        if (res.data.status) {
          if (res.data.data.length > 0) {
            console.log(item);
            props.navigation.navigate('ChildCategory', {
              parentCategory: item,
              childCategories: res.data.data,
            });
          } else {
            getQuestions(item);
          }
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.error('Get Child Result Error: ', error);
      });
  };

  const getQuestions = (item) => {
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
              parentCategory: item?.id,
              parentCategoryId: item?.tn_parent,
            });
          } else {
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
      <SafeAreaView style={appStyles.body}>
        {/* header */}
        <ActiveHeader navigation={props.navigation} />
        <BackButton navigation={props.navigation} />
        <View style={[serviceStyles.serachbarContainer]}>
          <Text style={[appStyles.h1ServiceHeading, {width: '80%'}]}>
            Search Results
          </Text>
          <TouchableOpacity
            onPress={() => {
              setshowfilterModal(!showfilterModal);
            }}>
            <Image
              source={images.search}
              style={{height: 42, width: 42, resizeMode: 'contain'}}></Image>
          </TouchableOpacity>
          {showfilterModal ? (
            <View style={{position: 'relative'}}>
              <View style={appStyles.staticDropDownContainer}>
                <TouchableNativeFeedback
                  onPress={() => filterResult(1)}
                  style={{}}>
                  <Text style={appStyles.dropDownItem}>Categories</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => filterResult(2)}
                  style={{}}>
                  <Text style={[appStyles.mt10, appStyles.dropDownItem]}>
                    Sub Categories
                  </Text>
                </TouchableNativeFeedback>
              </View>
            </View>
          ) : (
            false
          )}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[serviceStyles.signupbodyContainer]}>
            {/* Child Services List */}
            {props.route.params.result != undefined &&
            props.route.params.result.length > 0 ? (
              <>
                <View style={[appStyles.mt20, serviceStyles.childContainerRow]}>
                  {renderChildServices()}
                </View>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Text
                    style={[
                      appStyles.mt30,
                      appStyles.linkText,
                      appStyles.left,
                    ]}>
                    Explore more categories
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={serviceStyles.notFoundText}>No Result Found :(</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default childCategoryScreen;
