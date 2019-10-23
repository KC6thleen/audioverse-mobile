import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'

import { AppState } from '../../store'
import { loadBooks } from '../../actions'
import { getBooks, getBooksPagination } from '../../reducers/selectors'

import List from '../../components/list'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
  items: getBooks(state),
  pagination: getBooksPagination(state),
  avatarExtractor: (item: Item) => item.photo86,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'Book',
    params: {
      url: item.recordingsURI,
      title: item.title,
      id: item.id,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadBooks,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
