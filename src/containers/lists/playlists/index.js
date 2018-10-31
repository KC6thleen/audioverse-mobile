import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { syncPlaylists, removePlaylist } from 'src/actions'
import { getPlaylists } from 'src/reducers/selectors'

import Playlists from './Playlists'

const mapStateToProps = state => ({
  items: getPlaylists(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    sync: syncPlaylists,
    remove: removePlaylist
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlists)
