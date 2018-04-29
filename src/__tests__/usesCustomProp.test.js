import postcss from 'postcss';

import { usesCustomProp } from '../usesCustomProp';

test('A decl that uses a custom prop is correctly identified.', () => {
    expect(
        usesCustomProp(
            postcss.parse('background-color: var(--blue);').nodes[0],
        ),
    ).toBe(true);
});
