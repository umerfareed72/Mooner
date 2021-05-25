import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '../../assets/colors';
import {images} from '../../assets/images';
import appStyles from '../../styles/appStyles';
import {WP} from '../../utilities/responsive';
import ActionSheet from 'react-native-actions-sheet';
const spChangeStaus = ({onPress, show}) => {
  const actionSheetRef = useRef();
  useEffect(() => {
    if (show) actionSheetRef?.current?.setModalVisible();
  }, [show]);

  return (
    <ActionSheet
      ref={actionSheetRef}
      closable={true}
      containerStyle={appStyles.containerStyle}>
      <View style={[styles.modalContainer]}>
        <View style={[styles.modalContainerMargin]}>
          <View style={[appStyles.aiCenter]}>
            <Image style={appStyles.modalLine} source={images.line}></Image>
          </View>
          <View style={[appStyles.aiCenter, appStyles.jcCenter]}>
            <View style={{marginVertical: WP('10')}}>
              <Image source={images.Guy} style={styles.modalImage}></Image>
            </View>
            <View style={{marginBottom: WP('10')}}>
              <Text style={styles.modalText}>
                Sorry you're currently in{' '}
                <Text style={{fontFamily: 'Gilroy-Bold'}}>Offline Mode </Text>
                {''}
                please change your status to continue meaning.
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onPress} style={[styles.modalBtn]}>
            <Text style={styles.modalbtnText}>Change Status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
};

export default spChangeStaus;

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
  modalText: {
    fontFamily: 'Gilroy-Medium',
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  modalImage: {
    height: WP('60'),
    width: WP('60'),
    resizeMode: 'contain',
  },
});
