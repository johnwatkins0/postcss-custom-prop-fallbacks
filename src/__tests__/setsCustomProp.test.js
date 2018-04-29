import { setsCustomProp } from '../setsCustomProp';
import postcss from 'postcss';

test('A decl setting a custom prop is correctly idenfied.', () => {
    expect(
        setsCustomProp(postcss.parse('--background-color: violet;').nodes[0]),
    ).toBe(true);
});
