import { HomeLayoutProps } from 'fumadocs-ui/home-layout';
 
export const baseOptions: HomeLayoutProps = {
  nav: {
    title: 'My App',
  },
  links: [
    {
      // icon: <BookIcon />,
      text: 'Blog',
      url: '/blog',
      active: 'nested-url'
    },
  ],
};