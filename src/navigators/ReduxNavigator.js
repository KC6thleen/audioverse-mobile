import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { BackHandler } from "react-native"
import { connect } from 'react-redux'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'

import AppNavigator from './AppNavigator'
import { addListener } from 'src/utils/react-navigation-redux'
import { getNav } from 'src/reducers/selectors'

class ReduxNavigator extends PureComponent {

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this._onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._onBackPress)
  }

  _onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render() {
    const { dispatch, nav } = this.props
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    )
  }
}

ReduxNavigator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ nav: getNav(state) })

export default connect(mapStateToProps)(ReduxNavigator)
