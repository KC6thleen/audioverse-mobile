import { NavigationActions } from 'react-navigation'

let navigator: {[key: string]: any}

function setTopLevelNavigator(navigatorRef: {}) {
  navigator = navigatorRef
}

function navigate(routeName: string, params?: {}) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

export default {
  setTopLevelNavigator,
  navigate,
}
