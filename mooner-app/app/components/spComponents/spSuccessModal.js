import React, {useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
  LogBox,
  StyleSheet,
  Platform,
} from 'react-native';
import {images} from '../../assets/images';
import homeStyles from '../../styles/homeStyles';
import serviceStyles from '../../styles/serviceStyles';
import appStyles from '../../styles/appStyles';
import colors from '../../assets/colors';
import ActionSheet from 'react-native-actions-sheet';
const spSuccessModal = ({name, onPress, show}) => {
  const actionSheetRef = useRef();

  useEffect(() => {
    if (show) actionSheetRef?.current?.show();
  }, [show]);

  return (
    <ActionSheet
      gestureEnabled={false}
      ref={actionSheetRef}
      closable={false}
      containerStyle={appStyles.containerStyle}>
      <View style={serviceStyles.popUpContainer}>
        <View style={serviceStyles.popUpInnerPaddings}>
          <View style={[appStyles.aiCenter, appStyles.mt40]}>
            <Image
              source={images.spSuccessGraphic}
              style={serviceStyles.popUpImage}></Image>
          </View>
          <View style={[appStyles.mt20]}>
            <Text
              style={[
                {
                  color: colors.white,
                  fontSize: 24,
                  fontFamily: 'Gilroy-SemiBold',
                  textAlign: 'center',
                },
              ]}>
              Congratulations!
            </Text>
            <Text
              style={[
                {
                  color: colors.white,
                  fontSize: 14,
                  fontFamily: 'Gilroy-SemiBold',
                  textAlign: 'center',
                },
                appStyles.mt20,
              ]}>
              Service Successfully added
            </Text>
            <Text
              style={[
                appStyles.mt20,
                {
                  fontSize: 16,
                  fontFamily: 'Gilroy-SemiBold',
                  color: 'white',
                  textAlign: 'center',
                  lineHeight: 20,
                },
              ]}>
              Welcome <Text style={{color: colors.defaultYellow}}>{name}</Text>{' '}
              Best of Luck{'\n'}Happy Mooning!
            </Text>
            <View
              style={[
                serviceStyles.servicesrightContainer,
                {marginBottom: 20},
              ]}>
              <TouchableOpacity
                onPress={onPress}
                style={{
                  backgroundColor: colors.defaultYellow,
                  height: 56,
                  width: 56,
                  borderRadius: 28,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={[serviceStyles.icon30]}
                  source={images.rightBlackArrow}
                  style={{width: 20, resizeMode: 'contain'}}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
};

export default spSuccessModal;

const styles = StyleSheet.create({});
