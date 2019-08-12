import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AppState } from '../../../../store'
import { loadTagAlbum } from '../../../../actions'
import { getTagAlbum, getTagAlbumPagination } from '../../../../reducers/selectors'

import List from '../../../../components/list'

const mapStateToProps = (state: AppState) => ({
  items: getTagAlbum(state),
  pagination: getTagAlbumPagination(state),
  playlist: true,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagAlbum,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
