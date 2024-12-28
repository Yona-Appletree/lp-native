import type { Meta, StoryObj } from '@storybook/react';
import { EntityPanel } from './entity-panel';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof EntityPanel> = {
  component: EntityPanel,
  title: 'EntityPanel',
};
export default meta;
type Story = StoryObj<typeof EntityPanel>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to EntityPanel!/gi)).toBeTruthy();
  },
};
