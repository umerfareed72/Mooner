import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import colors from '../../assets/colors';
import {WP} from '../../utilities/responsive';
import RenderImages from './renderImages';
const data = [0, 1, 2, 3, 4, 5];
const ssPortfolio = ({navigation, onPressImage}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Portfolio</Text>
      </View>
      <View style={styles.b_view3}>
        <View style={styles.b_bg_view}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: WP('25'),
              marginTop: WP('5'),
            }}
            data={[data]}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <RenderImages
                index={index}
                items={data}
                onPress={onPressImage}
                pic="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              />
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </View>
  );
};

export default ssPortfolio;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginTop: WP('5'),
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    color: colors.defaultOrange,
  },
  textContainer: {marginStart: 20},
  b_view3: {height: '100%', width: '100%', alignSelf: 'center', marginTop: 10},

  b_bg_view: {height: '100%', width: '100%'},
});
