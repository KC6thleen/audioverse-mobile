import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadBooks } from 'src/actions'
import { getBooks, getBooksPagination } from 'src/reducers/selectors'

import List from 'src/components/list'

const mapStateToProps = (state, props) => ({
  items: getBooks(state),
  pagination: getBooksPagination(state),
  avatarExtractor: item => item.photo86,
  subtitleExtractor: () => null,
  onPress: item => props.navigation.navigate({
    routeName: 'Book',
    params: {
      url: item.recordingsURI,
      title: item.title,
      id: item.id,
    },
  }),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    loadData: loadBooks,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
