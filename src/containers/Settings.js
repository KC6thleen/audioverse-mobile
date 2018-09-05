import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, Picker, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import I18n from '../../locales'
import ListItem from '../components/list/ListItem'
import MiniPlayer from '../components/miniplayer'
import { changeLanguage } from '../actions'
import { getLanguage } from '../reducers/selectors'

class Settings extends PureComponent {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  handlePressMetaData() {
    this.props.navigation.navigate({ routeName: 'NowPlaying' })
  }
  
  render() {
    const { language, changeLanguage } = this.props
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
                onValueChange={(itemValue, itemIndex) => changeLanguage(itemValue)}>
                {languageOptions}
              </Picker>
              <Text onPress={() => this.setModalVisible(false)}>{I18n.t('Cancel', {locale: language})}</Text>
            </View>
          </Modal>
        </View>
        <MiniPlayer onPressMetaData={this.handlePressMetaData.bind(this)} />
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
  changeLanguage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  language: getLanguage(state)
})

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (language) => dispatch(changeLanguage(language))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
