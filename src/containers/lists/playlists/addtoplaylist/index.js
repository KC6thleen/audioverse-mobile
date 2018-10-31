import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { syncPlaylists, addPlaylistItem, removePlaylistItem } from 'src/actions'
import { getCurrentTrack, getPlaylistsForCurrentTrack } from 'src/reducers/selectors'

import AddToPlaylist from './AddToPlaylist'

const mapStateToProps = state => ({
  track: getCurrentTrack(state),
  playlists: getPlaylistsForCurrentTrack(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addPlaylistItem,
    removePlaylistItem
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylist)
