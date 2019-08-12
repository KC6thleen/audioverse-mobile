import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../store'
import { resetAndPlayTrack, removeDownload } from '../../../actions'
import { getDownloads } from '../../../reducers/selectors'

import Downloads from './Downloads'

const mapStateToProps = (state: AppState) => ({
  items: getDownloads(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    resetAndPlayTrack,
    remove: removeDownload,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Downloads)
