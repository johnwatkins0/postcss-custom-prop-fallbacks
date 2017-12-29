import { getVariableFrom } from '../src/getVariableFrom';

test('CSS custom prop value is successfully extracted.', () => {
    expect(getVariableFrom('var(--blue)')).toBe('--blue');
});
