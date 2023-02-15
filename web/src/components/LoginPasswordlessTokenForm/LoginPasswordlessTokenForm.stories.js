// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <LoginPasswordlessTokenForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import LoginPasswordlessTokenForm from './LoginPasswordlessTokenForm'

export const generated = () => {
  return <LoginPasswordlessTokenForm />
}

export default {
  title: 'Components/LoginPasswordlessTokenForm',
  component: LoginPasswordlessTokenForm,
}
