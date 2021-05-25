import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import colors from '../../assets/colors';
import {images} from '../../assets/images';
import appStyles from '../../styles/appStyles';
import {WP} from '../../utilities/responsive';
import ActionSheet from 'react-native-actions-sheet';

const AceeptRejectJob = ({
  onClose,
  onPressAccept,
  onPressReject,
  show,
  amount,
}) => {
  const actionSheetRef = useRef();

  useEffect(() => {
    if (show) actionSheetRef?.current?.setModalVisible();
  }, [show]);
  return (
    <ActionSheet
      // closable={false}
      onClose={onClose}
      ref={actionSheetRef}
      containerStyle={appStyles.containerStyle}>
      <View style={[styles.modalContainer]}>
        <View style={[styles.modalContainerMargin]}>
          <View style={[appStyles.aiCenter]}>
            <Image style={appStyles.modalLine} source={images.line}></Image>
          </View>
          <View style={{marginVertical: WP('10')}}>
            <Text style={styles.h1}>
              Set <Text style={{fontFamily: 'Gilroy-Medium'}}>a deal</Text>
            </Text>
          </View>
          <Text
            style={{
              color: colors.white,
              fontFamily: 'Gilroy-SemiBold',
              fontSize: WP('4.2'),
            }}>
            Service Seeker is offering you ${amount}
          </Text>
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity
            onPress={onPressReject}
            style={[
              styles.modalbtncontainer,
              {
                backgroundColor: '#941BFF',
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 40,
              },
            ]}>
            <Text
              style={[
                appStyles.h3ServiceHeading,
                {color: colors.white, fontFamily: 'Gilroy-Medium'},
              ]}>
              Reject
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressAccept}
            style={[styles.modalbtncontainer]}>
            <Text
              style={[
                appStyles.h3ServiceHeading,
                {color: colors.white, fontFamily: 'Gilroy-Medium'},
              ]}>
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
};

export default AceeptRejectJob;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    bottom: -25,
  },
  modalContainer: {
    backgroundColor: colors.defaultPurple,
    borderRadius: 40,
    width: '100%',
    bottom: 0,
  },
  modalContainerMargin: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  bottomContent: {
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
  },
  modalbtncontainer: {
    marginTop: 20,
    backgroundColor: colors.lightPurple,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    padding: 20,
    // borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  modalwalletImage: {
    height: 20,
    width: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 24,
    color: colors.white,
  },
  h2: {
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    color: colors.white,
  },
  btnConatiner: {
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingVertical: Platform.OS == 'ios' ? WP('2') : 0,
    width: WP('20'),
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: WP('1'),
    marginLeft: WP('15'),
    marginBottom: WP('20'),
  },
});
