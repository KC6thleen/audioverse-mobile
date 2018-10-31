import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack, syncPlaylistItems, removePlaylistItem } from 'src/actions'
import { getPlaylistItems } from 'src/reducers/selectors'

import PlaylistItems from './PlaylistItems'

const mapStateToProps = (state, ownProps) => ({
  items: getPlaylistItems(state, ownProps.navigation.state.params.playlistId)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetAndPlayTrack,
    sync: syncPlaylistItems,
    remove: removePlaylistItem
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItems)
