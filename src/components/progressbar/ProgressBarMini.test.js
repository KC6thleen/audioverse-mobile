import React from 'react'
import ProgressBarMini from './ProgressBarMini'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<ProgressBarMini />).toJSON()
  expect(tree).toMatchSnapshot()
})
