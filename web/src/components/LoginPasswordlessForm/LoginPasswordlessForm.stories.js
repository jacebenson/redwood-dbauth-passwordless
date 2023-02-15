// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <LoginPasswordlessForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import LoginPasswordlessForm from './LoginPasswordlessForm'

export const generated = () => {
  return <LoginPasswordlessForm />
}

export default {
  title: 'Components/LoginPasswordlessForm',
  component: LoginPasswordlessForm,
}
