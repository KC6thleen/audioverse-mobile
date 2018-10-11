import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetAndPlayTrack, playlists } from 'src/actions'
import { getPlaylists } from 'src/reducers/selectors'

import Playlists from './Playlists'

const mapStateToProps = state => ({
  items: getPlaylists(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetAndPlayTrack,
    remove: playlists.remove
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlists)
