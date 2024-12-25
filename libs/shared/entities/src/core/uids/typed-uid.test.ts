import { describe } from 'vitest';
import { TypedUid } from './typed-uid';

describe('TypedUid', () => {
  it('success case', () => {
    const uid = TypedUid('entity-kind');
    expect(uid()).toMatch(/entity-kind:[0-9a-z]{15}/);
  });
});
