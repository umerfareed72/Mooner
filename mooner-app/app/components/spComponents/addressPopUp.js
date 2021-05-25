import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import colors from '../../assets/colors';
import modalStyles from '../../styles/modalStyles';
import appStyles from '../../styles/appStyles';
import {WP} from '../../utilities/responsive';
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';
import {Item} from 'native-base';
import ActionSheet from 'react-native-actions-sheet';

const addressPopUp = ({onPress, show}) => {
  const actionSheetRef = useRef();
  useEffect(() => {
    if (show) actionSheetRef?.current?.setModalVisible();
  }, [show]);
  return (
    <ActionSheet ref={actionSheetRef} containerStyle={appStyles.containerStyle}>
      <View style={[styles.modalContainer]}>
        <ScrollView>
          <View style={[styles.modalContainerMargins]}>
            <View style={[appStyles.aiCenter]}>
              <Image style={styles.modalLine} source={images.line}></Image>
            </View>
            <View style={{marginVertical: WP('4')}}>
              <Text style={[homeStyles.header1Bold]}>Add Address</Text>
            </View>
            <View style={[homeStyles.textInputContainer]}>
              <View style={[homeStyles.leftView]}>
                <Image style={[appStyles.icon11]} source={images.dot}></Image>
              </View>
              <View style={{width: '80%'}}>
                <Text style={homeStyles.heading4}>Location Name</Text>
                <TextInput
                  placeholderTextColor={colors.white}
                  style={styles.modalTextInput}
                  placeholder="Enter Location Name"></TextInput>
              </View>
            </View>
            <View style={[styles.modalSeparator]}></View>

            <View style={[homeStyles.textInputContainer]}>
              <View style={[homeStyles.leftView]}>
                <Image
                  style={[appStyles.icon13]}
                  source={images.locationsm}></Image>
              </View>
              <View style={{width: '80%'}}>
                <Text style={homeStyles.heading4}>Location</Text>
                <Item style={{borderBottomWidth: 0}}>
                  <TextInput
                    placeholderTextColor={colors.white}
                    style={[styles.modalTextInput2]}
                    placeholder="Enter Location Name"></TextInput>
                  <TouchableOpacity>
                    <Image
                      style={[appStyles.icon13]}
                      source={images.locationsm}></Image>
                  </TouchableOpacity>
                </Item>
              </View>
            </View>
            <TouchableOpacity onPress={onPress} style={[styles.modalBtn]}>
              <Text style={styles.modalbtnText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ActionSheet>
  );
};

export default addressPopUp;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    bottom: -25,
  },
  modalContainer: {
    height: Platform.OS == 'ios' ? WP('100') : WP('120'),
    backgroundColor: colors.defaultRed,
    borderRadius: 40,
  },
  modalContainerMargins: {
    paddingHorizontal: WP('5'),
    marginTop: WP('5'),
  },
  modalLine: {
    width: '30%',
    resizeMode: 'contain',
  },
  modalTextInput: {
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    color: colors.white,
  },
  modalTextInput2: {
    fontSize: 16,
    width: '95%',
    fontFamily: 'Gilroy-SemiBold',
    color: colors.white,
  },
  modalSeparator: {
    borderBottomWidth: 1,
    marginLeft: 40,
    borderBottomColor: colors.white,
  },
  modalBtn: {
    marginVertical: WP('4'),
    backgroundColor: colors.defaultYellow,
    paddingVertical: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalbtnText: {
    color: colors.darkBlack,
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
  },
});
