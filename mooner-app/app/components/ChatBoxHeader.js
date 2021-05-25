import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import colors from '../assets/colors';
import {images} from '../assets/images';
import appStyles from '../styles/appStyles';

const ChatBoxHeader = ({name, onPress, category, pic}) => {
  return (
    <View style={styles.container}>
      <View style={[appStyles.rowAlign, appStyles.aiCenter]}>
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.icon20} source={images.backArrow}></Image>
        </TouchableOpacity>

        <ImageBackground
          imageStyle={{
            height: 80,
            width: 120,
            resizeMode: 'contain',
          }}
          style={[appStyles.row]}
          source={images.bgchat}>
          <Image source={{uri: pic}} style={styles.icon56} />
          <View style={styles.left}>
            <Text style={styles.h1}>{name}</Text>
            <Text style={{fontSize: 12}}>{category}</Text>
          </View>
        </ImageBackground>
        <View>
          <Image style={styles.icon20} source={images.call}></Image>
        </View>
      </View>
    </View>
  );
};

export default ChatBoxHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  icon56: {
    height: 56,
    width: 56,
    resizeMode: 'cover',
    borderRadius: 17,
  },
  icon20: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: colors.darkBlack,
  },
  left: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  h1: {
    fontSize: 16,
    color: colors.darkBlack,
    fontFamily: 'Gilroy-SemiBold',
    lineHeight: 20,
  },
});
