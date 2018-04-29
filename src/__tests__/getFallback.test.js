import postcss from 'postcss';

import { getFallback } from '../getFallback';

test('A correct fallback declaration is created.', () => {
    const decl = postcss.parse('background-color: var(--background-color);')
        .nodes[0];
    const customProps = {
        '--background-color': 'red',
        '--color': 'white',
        '--link-color': 'blue',
    };

    expect(getFallback({ decl, customProps })).toBe(
        '\n  background-color: red',
    );
});

test('An unfound custom prop returns no fallback.', () => {
    const decl = postcss.parse(
        'background-color: var(--alternative-background-color);',
    ).nodes[0];
    const customProps = {
        '--background-color': 'red',
        '--color': 'white',
        '--link-color': 'blue',
    };

    expect(getFallback({ decl, customProps })).toBe('');
});
