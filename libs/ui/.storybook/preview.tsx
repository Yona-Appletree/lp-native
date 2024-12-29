import '../src/styles.css';
// .storybook/preview.ts
import { StoryFn } from '@storybook/react';
import * as React from 'react'; // or your Storybook framework

export const decorators = [
  (Story: StoryFn) => {
    React.useEffect(() => {
      const htmlElement = document.documentElement; // Get the <html> element
      htmlElement.classList.add('dark');

      // Cleanup on unmount
      return () => {
        htmlElement.classList.remove('dark');
      };
    }, []);

    return <Story />;
  },
];
