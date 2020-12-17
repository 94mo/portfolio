import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: 'https://mosesl.co/icon.svg',
    brandTitle: 'Moses Lee Components',
    brandUrl: 'https://mosesl.co',
  },
});
