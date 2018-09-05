import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'

const CustomDrawerContent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View><Text></Text></View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default CustomDrawerContent
