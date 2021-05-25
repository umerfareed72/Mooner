import React, {useState} from 'react';
import {StyleSheet, Text, View, Switch, ScrollView} from 'react-native';
import SafeWrapper from '../../../components/safeWrapper';
import ActiveHeader from '../../../components/activeHeader';
import BackBtn from '../../../components/backButton';
import colors from '../../../assets/colors';

const NotificationSetting = ({navigation}) => {
  const [jobComplete, setJobComplete] = useState(false);
  const [msg, setMsg] = useState(false);
  const [userCancel, setUserCancel] = useState(false);
  const [disputeReceived, setDisputeReceived] = useState(false);
  const [disputeUpdate, setDisputeUpdate] = useState(false);
  const [walletEarning, setWalletEarning] = useState(false);
  const [userArrival, setUserArrival] = useState(false);
  return (
    <SafeWrapper>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ActiveHeader navigation={navigation} />
        <BackBtn navigation={navigation} styles={{marginTop: -20}} />
        <View style={{marginTop: 60}}>
          <Text style={styles.privacyTxt}>Notification Settings</Text>
          <View style={{padding: 20}}>
            <Text style={styles.heading}>General Notification</Text>
            <View style={styles.row}>
              <Text style={styles.subHeading}>Job Completed & Invoice</Text>
              <Switch
                value={jobComplete}
                onValueChange={() => setJobComplete((pre) => !pre)}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.subHeading}>Message</Text>
              <Switch value={msg} onValueChange={() => setMsg((pre) => !pre)} />
            </View>
            <View style={styles.row}>
              <Text style={styles.subHeading}>
                User Cancellation Of Booking
              </Text>
              <Switch
                value={userCancel}
                onValueChange={() => setUserCancel((pre) => !pre)}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.subHeading}>Dispute Received</Text>
              <Switch
                value={disputeReceived}
                onValueChange={() => setDisputeReceived((pre) => !pre)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.subHeading}>Dispute Update</Text>
              <Switch
                value={disputeUpdate}
                onValueChange={() => setDisputeUpdate((pre) => !pre)}
              />
            </View>
            <Text style={[styles.heading, {marginTop: 30}]}>
              Down Line Activity notification
            </Text>

            <View style={styles.row}>
              <Text style={styles.subHeading}>Wallet Earnings</Text>
              <Switch
                value={walletEarning}
                onValueChange={() => setWalletEarning((pre) => !pre)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.subHeading}>User Arrival</Text>
              <Switch
                value={userArrival}
                onValueChange={() => setUserArrival((pre) => !pre)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeWrapper>
  );
};

export default NotificationSetting;

const styles = StyleSheet.create({
  privacyTxt: {
    fontSize: 25,
    fontFamily: 'Gilroy-Bold',
    color: colors.defaultBlack,
    paddingStart: 20,
    marginTop: 10,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Gilroy-SemiBold',
    color: colors.defaultBlack,
  },
  subHeading: {
    color: 'grey',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
});
