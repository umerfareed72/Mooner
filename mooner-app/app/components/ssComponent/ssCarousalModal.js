import React, {useState, useRef, useEffect} from 'react';
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
  TextInput,
  Platform,
  StyleSheet,
} from 'react-native';
import colors from '../../assets/colors';
import CarouselView, {Pagination} from 'react-native-snap-carousel';
import ActionSheet from 'react-native-actions-sheet';
import {imagesURL, baseURL, vh, wh} from '../../utilities/constant';
import modalStyles from '../../styles/modalStyles';
import appStyles from '../../styles/appStyles';
import {WP} from '../../utilities/responsive';
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';

const slides = [
  {
    key: 1,
    title: " Running scared won't help",
    title2: ' Precautions may!',
    text:
      'Clean your hands often.Use Soap and water, or an alcolhol-based hand sub.',
    image: images.covid,
  },
  {
    key: 2,
    title: " Running scared won't help",
    title2: ' Precautions may!',
    text:
      'Clean your hands often.Use Soap and water, or an alcolhol-based hand sub.',
    image: images.covid,
  },
];

const ssCarousalModal = ({show, onPress}) => {
  const [index, setIndex] = useState(0);
  const [initialSheet, setinitialSheet] = useState(null);
  const actionSheetRef = useRef();
  useEffect(() => {
    if (show) actionSheetRef?.current?.show();
  }, [show]);
  const showPopup = ({item}) => {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={[
            {
              paddingHorizontal: 30,
              backgroundColor: colors.defaultRed,
              borderRadius: 40,
            },
          ]}>
          <View
            style={[
              appStyles.aiCenter,
              appStyles.jcCenter,
              {marginVertical: WP('4')},
            ]}>
            <Image
              style={{height: WP('30'), resizeMode: 'contain'}}
              source={item.image}></Image>
          </View>
          <View style={[{marginTop: WP('2')}]}>
            <Text style={[homeStyles.modaltextheader]}>
              {item.title}
              <Text
                style={{
                  color: colors.white,
                }}>
                {item.title2}
                {/* Precautions may! */}
              </Text>
            </Text>
          </View>
          <View style={[{marginTop: WP('2')}]}>
            <Text
              style={[homeStyles.modaltextheading3, {marginVertical: WP('1')}]}>
              {item.text}
            </Text>
            <Text
              style={[homeStyles.modaltextheading3, {marginVertical: WP('1')}]}>
              {item.text}
            </Text>
            <Text
              style={[homeStyles.modaltextheading3, {marginVertical: WP('1')}]}>
              {item.text}
            </Text>
            <Text
              style={[homeStyles.modaltextheading3, {marginVertical: WP('1')}]}>
              {item.text}
            </Text>
          </View>
          <Pagination
            carouselRef={initialSheet}
            dotsLength={slides.length}
            activeDotIndex={index}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
            }}
            dotColor={colors.defaultYellow}
            inactiveDotColor={colors.white}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
            tappableDots={true}
          />
          <View
            style={[homeStyles.flexEndContainer, {paddingBottom: WP('20')}]}>
            <TouchableOpacity
              style={[appStyles.icon56Container]}
              onPress={onPress}>
              <Image
                style={[appStyles.icon15]}
                source={images.rightBlackArrow}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={[appStyles.containerStyle]}>
      <CarouselView
        layout="stack"
        ref={initialSheet}
        data={slides}
        renderItem={showPopup}
        sliderWidth={wh}
        itemWidth={wh}
        onSnapToItem={(i) => setIndex(i)}
        useScrollView={true}
      />
    </ActionSheet>
  );
};

export default ssCarousalModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    bottom: -25,
  },
});
