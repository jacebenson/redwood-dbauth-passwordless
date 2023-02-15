import { render } from '@redwoodjs/testing/web'

import LoginPasswordlessPage from './LoginPasswordlessPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LoginPasswordlessPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPasswordlessPage />)
    }).not.toThrow()
  })
})
