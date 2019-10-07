import React from 'react'
import ProgressBar from './ProgressBar'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<ProgressBar rate={1} />).toJSON()
  expect(tree).toMatchSnapshot()
})
