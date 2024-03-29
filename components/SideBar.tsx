import {useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AppContext from '../contexts/AppContext';

import Icon from 'react-native-vector-icons/FontAwesome';

import {useAuth} from '../hooks/useAuth';

import SideBarContext from '../contexts/SideBarContext';

import {useNavigation} from '@react-navigation/native';

import {Colors} from '../types/colors';

export default function SideBar() {
  const {colors, TEXT} = useContext(AppContext);
  const {setSideBarOpen} = useContext(SideBarContext);
  const {user, logout} = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.Primary,
        justifyContent: 'flex-start',
        paddingHorizontal: 25,
        paddingVertical: 20,
      }}>
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '45%',
          paddingVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            marginBottom: 50,
            alignItems: 'center',
          }}>
          <View style={styles(colors).pfp}>
            {user?.photoURL ? (
              <Image
                source={{uri: user?.photoURL}}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  overflow: 'hidden',
                }}
              />
            ) : (
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  style={styles(colors).icon_style}
                  name="user-o"
                  color={colors.White}
                  size={70}
                />
              </View>
            )}
          </View>
          <Text allowFontScaling={false} style={styles(colors).username_style}>
            {user
              ? user.displayName
                ? user.displayName.toUpperCase()
                : user.email
                ? user.email.substring(0, user.email.indexOf('@')).toUpperCase()
                : TEXT.Guest
              : null}
          </Text>
        </View>
        <Pressable
          onPress={async () => {
            setLoading(true);
            await logout();
            navigation.navigate('Login' as never);
            setSideBarOpen(false);
            setLoading(false);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: colors.White,
            width: '100%',
            padding: 10,
          }}>
          {loading ? (
            <>
              <ActivityIndicator size={20} color={colors.Black} />
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  color: colors.Black,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                {TEXT.Loading}
              </Text>
            </>
          ) : (
            <>
              <Icon name="sign-out" color={colors.Black} size={25} />
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  color: colors.Black,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                {TEXT.Log_Out}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    icon_style: {
      color: colors.White,
      borderRadius: 100,
      padding: 10,
      width: 100,
      height: 100,
      textAlign: 'center',
    },
    username_style: {
      fontSize: 30,
      color: colors.White,
      fontWeight: 'bold',
    },
    pfp: {
      marginBottom: 20,
    },
  });
