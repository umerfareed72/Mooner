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
import Modal from 'react-native-modal';

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
  {
    key: 2,
    title: " Running scared won't help",
    title2: ' Precautions may!',
    text:
      'Clean your hands often.Use Soap and water, or an alcolhol-based hand sub.',
    image: images.covid,
  },
];

const ssShowImages = ({show, onPress, onPressClose}) => {
  const [index, setIndex] = useState(0);
  const [initialSheet, setinitialSheet] = useState(null);

  const showPopup = ({item}) => {
    return (
      <View style={[styles.modalContainer]}>
        <ImageBackground
          source={{
            uri:
              'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
          }}
          imageStyle={{borderRadius: 15}}
          style={[styles.imageBg]}>
          <TouchableOpacity
            hitSlop={{top: 30, left: 30, right: 30, bottom: 0}}
            onPress={onPressClose}>
            <Image source={images.cross} style={[styles.imageStyle]}></Image>
          </TouchableOpacity>

          <View style={[styles.pageContainer]}>
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
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View>
      <Modal isVisible={show} animationInTiming={500} animationOutTiming={500}>
        <CarouselView
          layout={'tinder'}
          ref={initialSheet}
          data={slides}
          renderItem={showPopup}
          sliderWidth={wh}
          itemWidth={wh}
          onSnapToItem={(i) => setIndex(i)}
          useScrollView={true}
        />
      </Modal>
    </View>
  );
};

export default ssShowImages;

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    flex: 1,
  },
  imageStyle: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    left: 20,
    top: 20,
    tintColor: colors.white,
  },
  imageBg: {
    height: WP('100'),
    width: WP('80'),
  },
  pageContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
