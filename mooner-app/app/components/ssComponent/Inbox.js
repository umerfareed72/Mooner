import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';
import {images} from '../../assets/images';
import appStyles from '../../styles/appStyles';

const Inbox = ({onPress, msg, pic, time, name, count}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.inboxContainer]}>
      <View style={[styles.leftItemContainer]}>
        <Image style={[styles.icon56]} source={{uri: pic}}></Image>
      </View>
      <View style={[styles.rightItemContainer]}>
        <View style={appStyles.rowAlign}>
          <Text style={styles.h1}>{name}</Text>
          <Text style={styles.smtext}>{time}</Text>
        </View>
        <View style={[appStyles.rowAlign, appStyles.mt5]}>
          <View style={{width: '90%'}}>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={styles.description}>
              {msg}
            </Text>
          </View>

          <View style={styles.messageText}>
            <Text style={styles.counterText}>{count}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  inboxContainer: {
    width: '100%',
    backgroundColor: colors.white,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F8',
    flexDirection: 'row',
  },
  leftItemContainer: {
    width: '20%',
  },
  rightItemContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  icon56: {
    height: 56,
    width: 56,
    resizeMode: 'cover',
    borderRadius: 17,
  },
  messageText: {
    borderRadius: 100,
    backgroundColor: colors.defaultYellow,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  h1: {
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    color: colors.darkBlack,
    width: '70%',
  },
  description: {
    fontSize: 14,
    color: colors.darkBlack,
    fontFamily: 'Gilroy-SemiBold',
  },
  counterText: {
    fontSize: 10,
    color: colors.darkBlack,
    fontFamily: 'Gilroy-SemiBold',
  },
});
