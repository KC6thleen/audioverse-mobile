import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, Picker, StyleSheet } from 'react-native'

import I18n from 'locales'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'

class Settings extends PureComponent {

  state = {
    modalVisible: false,
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible})
  }

  render() {
    const { language, actions } = this.props
    const languageOptions = Object.keys(I18n.translations).map((lang, i) => (
      <Picker.Item key={i} label={I18n.translations[lang].id} value={lang} />
    ))

    return (
      <View style={styles.container}>
        <View>
          <ListItem icon={{name: 'pocket'}} title={I18n.t('Login', {locale: language})} chevron />
          <ListItem icon={{name: 'map-pin'}} title={I18n.t('Language', {locale: language})} subtitle={I18n.t('id', {locale: language})} chevron onPress={() => this.setModalVisible(true)} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Picker
                selectedValue={language}
                style={{ width: 100, backgroundColor: '#CCCCCC' }}
                onValueChange={(itemValue, itemIndex) => actions.changeLanguage(itemValue)}>
                {languageOptions}
              </Picker>
              <Text onPress={() => this.setModalVisible(false)}>{I18n.t('Cancel', {locale: language})}</Text>
            </View>
          </Modal>
        </View>
        <MiniPlayer navigation={this.props.navigation} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    changeLanguage: PropTypes.func.isRequired
  })
}

export default Settings
