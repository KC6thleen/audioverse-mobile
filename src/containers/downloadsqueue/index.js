import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { removeFromDownloadsQueue } from 'src/actions'
import { getDownloadsQueueItems } from 'src/reducers/selectors'

import DownloadsQueue from './DownloadsQueue'

const mapStateToProps = (state) => ({
  items: getDownloadsQueueItems(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    removeFromDownloadsQueue
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadsQueue)
