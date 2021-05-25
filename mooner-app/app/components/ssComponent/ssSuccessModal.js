import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';
import appStyles from '../../styles/appStyles';
import serviceStyles from '../../styles/serviceStyles';
import {images} from '../../assets/images';
import ActionSheet from 'react-native-actions-sheet';
const ssSuccessModal = ({show, onPress}) => {
  const actionSheetRef = useRef();
  useEffect(() => {
    if (show) actionSheetRef?.current?.setModalVisible();
  }, [show]);

  return (
    <ActionSheet
      closable={false}
      ref={actionSheetRef}
      containerStyle={appStyles.containerStyle}>
      <View style={[styles.modalContainer]}>
        <View style={styles.modalContainerMargin}>
          <View style={[appStyles.aiCenter, appStyles.mt40]}>
            <Image
              style={[appStyles.modalLine]}
              source={images.bookingSuccessPNG}
              style={styles.modalbgImage}></Image>
          </View>
          <View style={[appStyles.mt20]}>
            <Text style={[styles.modalbgText]}>Congratulations!</Text>
            <Text style={[appStyles.mt20, styles.modalText]}>
              Your order has been placed{'\n'}
              <Text style={{color: colors.defaultYellow}}>
                Service Provider
              </Text>{' '}
              will being notified.{'\n'}Your quote has been sent,{'\n'}
              <Text style={{color: colors.defaultYellow}}>Good Luck!</Text>
            </Text>
            <View
              style={[
                serviceStyles.servicesrightContainer,
                {marginBottom: 20},
              ]}>
              <TouchableOpacity
                onPress={onPress}
                style={[styles.modalBtnContainer]}>
                <Image
                  style={[serviceStyles.icon30]}
                  source={images.rightBlackArrow}
                  style={styles.modalImage}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
};

export default ssSuccessModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.defaultRed,
    borderRadius: 40,
    width: '100%',
    bottom: 0,
  },
  modalContainerMargin: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  modalbgImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  modalbgText: {
    color: colors.white,
    fontSize: 24,
    fontFamily: 'Gilroy-SemiBold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalBtnContainer: {
    backgroundColor: colors.defaultYellow,
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 20,
    resizeMode: 'contain',
  },
});
