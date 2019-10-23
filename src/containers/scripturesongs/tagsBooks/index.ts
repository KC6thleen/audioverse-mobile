import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'

import { AppState } from '../../../store'
import { loadTagsBooks } from '../../../actions'
import { getTagsBooks, getTagsBooksPagination } from '../../../reducers/selectors'

import List from '../../../components/list'

interface Item {
  [key: string]: any
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
  items: getTagsBooks(state),
  pagination: getTagsBooksPagination(state),
  titleExtractor: (item: Item) => item.name,
  subtitleExtractor: () => '',
  onPress: (item: Item) => props.navigation.navigate({
    routeName: 'TagBook',
    params: {
      url: item.recordingsURI,
      title: item.name,
    },
  }),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    loadData: loadTagsBooks,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
