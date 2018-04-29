import postcss from 'postcss';

import { collectCustomProps } from '../collectCustomProps';

test('Custom props are colllected.', done => {
    postcss
        .parse(
            `:root {
--background-color: red;
--color: white;
--link-color: blue;
}

main {
--background-color: yellow;
}
`,
        )
        .walkRules(':root', rule => {
            expect(collectCustomProps(rule)).toMatchObject({
                '--background-color': 'red',
                '--color': 'white',
                '--link-color': 'blue',
            });
            done();
        });
});
