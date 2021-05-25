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
const spMakeOffer = ({
  onPress,
  onChangeText,
  show,
  onClose,
  value,
  onSubmitEditing,
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
      containerStyle={[
        {
          backgroundColor: 'transparent',
          bottom: Platform.OS == 'android' ? -25 : -10,
        },
      ]}>
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
          <View style={styles.alignRow}>
            <Image
              style={styles.modalwalletImage}
              source={images.wallet}></Image>
            <Text style={styles.h2}>Make offer</Text>
          </View>
        </View>

        <View style={styles.btnConatiner}>
          <TextInput
            value={value}
            onSubmitEditing={onSubmitEditing}
            placeholder="$300"
            multiline={true}
            returnKeyType={'done'}
            onChangeText={onChangeText}
            keyboardType={'number-pad'}
            placeholderTextColor={colors.defaultPurple}></TextInput>
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.modalbtncontainer} onPress={onPress}>
            <Text
              style={[
                appStyles.h3ServiceHeading,
                {color: colors.white, fontFamily: 'Gilroy-Medium'},
              ]}>
              Make Offer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
};

export default spMakeOffer;

const styles = StyleSheet.create({
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
  },
  modalbtncontainer: {
    marginTop: 20,
    backgroundColor: colors.lightPurple,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    borderBottomLeftRadius: 40,
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
