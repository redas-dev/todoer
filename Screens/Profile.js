import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

import { Switch } from 'react-native'

import { useAuth } from '../hooks/useAuth'

import Icon from 'react-native-vector-icons/FontAwesome'

import AppContext from '../contexts/AppContext'

export default function Profile() {
  const { TEXT, switchTheme, theme, colors } = useContext(AppContext)

  const { user, logout } = useAuth()

  return (
    <View style={styles(colors).profile_container}>
      <View style={styles(colors).pfp}>
        {user ? (
          user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={{
                height: 140,
                width: 140,
                borderRadius: 100,
                overflow: 'hidden'
              }}
            />
          ) : (
            <>
              <View style={styles(colors).profile_circle} />
              <Icon
                style={styles(colors).icon_style}
                name="user-o"
                color="white"
                size={100}
              />
            </>
          )
        ) : null}
      </View>
      <Text style={styles(colors).username_style}>
        {user
          ? user.displayName
            ? user.displayName.toUpperCase()
            : user.email.substring(0, user.email.indexOf('@')).toUpperCase()
          : null}
      </Text>
      <Pressable style={styles(colors).logout_btn} onPress={logout}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
          <Text style={styles(colors).logout_btn_text}>{TEXT.Log_Out}</Text>
          <Icon name="sign-out" color={'white'} size={20} />
        </View>
      </Pressable>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Switch
          trackColor={{
            false: colors.Grey_Text,
            true: colors.Grey_Text
          }}
          thumbColor={colors.Primary}
          onValueChange={switchTheme}
          value={theme === 'Light' ? false : true}
        />
        <Text style={{ color: colors.Text, marginLeft: 15, fontSize: 15 }}>
          Dark Mode
        </Text>
      </View>
    </View>
  )
}

const styles = colors =>
  StyleSheet.create({
    profile_container: {
      alignItems: 'center',
      backgroundColor: colors.Background,
      display: 'flex',
      flex: 1,
      justifyContent: 'center'
    },
    profile_circle: {
      backgroundColor: 'grey',
      width: 140,
      height: 140,
      borderRadius: 100,
      position: 'absolute',
      elevation: 5
    },
    icon_style: {
      position: 'relative',
      elevation: 6
    },
    username_style: {
      fontSize: 30,
      color: colors.Text
    },
    pfp: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30
    },
    logout_btn: {
      backgroundColor: colors.Primary,
      padding: 10,
      borderRadius: 5,
      width: 200,
      margin: 25
    },
    logout_btn_text: {
      color: colors.Text_Btn_Blue,
      textAlign: 'center',
      fontSize: 20
    }
  })
