import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import colors from '../../assets/colors';
import {images} from '../../assets/images';

const renderImages = ({onPress, conunt, pic, index, items}) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'space-between',
        pdding: 5,
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: '45%',
          paddingRight: 5,
          minHeight: 300,
          flexGrow: 1,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{uri: pic}}
            style={{
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 15,
            }}></Image>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '45%',
          paddingRight: 5,
          minHeight: 300,
          flexGrow: 1,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{uri: pic}}
            style={{
              height: 150,
              marginBottom: 5,
              resizeMode: 'cover',
              borderRadius: 15,
            }}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <ImageBackground
            source={{uri: pic}}
            imageStyle={{borderRadius: 15}}
            style={{
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              resizeMode: 'cover',
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: 24,
                fontFamily: 'Gilroy-Bold',
              }}>
              +{items.length - 3}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default renderImages;

const styles = StyleSheet.create({});
