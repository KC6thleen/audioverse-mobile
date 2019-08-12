import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { syncPlaylists, removePlaylist } from '../../../actions'
import { getPlaylists } from '../../../reducers/selectors'

import Playlists from './Playlists'

const mapStateToProps = (state: AppState) => ({
  items: getPlaylists(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    sync: syncPlaylists,
    remove: removePlaylist,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlists)
