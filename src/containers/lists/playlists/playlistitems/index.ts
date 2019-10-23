import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'

import { AppState } from '../../../../store'
import {
  resetAndPlayTrack,
  syncPlaylistItems,
  removePlaylistItem,
} from '../../../../actions'
import { getPlaylistItems } from '../../../../reducers/selectors'

import PlaylistItems from './PlaylistItems'

const mapStateToProps = (state: AppState, ownProps: NavigationInjectedProps) => ({
  items: getPlaylistItems(state, ownProps.navigation.state.params!.playlistId),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    resetAndPlayTrack,
    sync: syncPlaylistItems,
    remove: removePlaylistItem,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItems)
