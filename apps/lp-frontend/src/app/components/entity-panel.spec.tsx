import { render } from '@testing-library/react';

import EntityPanel from './entity-panel';

describe('EntityPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EntityPanel />);
    expect(baseElement).toBeTruthy();
  });
});
