import fs from 'fs';
import path from 'path';
import postcss from 'postcss';

import { addCustomPropFallbacks } from '../addCustomPropFallbacks';

const getPreprocessedFile = () =>
    new Promise(resolve => {
        fs.readFile(
            path.resolve(__dirname, 'example/style.css'),
            'utf8',
            (err, data) => {
                if (err) {
                    throw err;
                }

                resolve(data);
            },
        );
    });

const getProcessedFile = () =>
    new Promise(resolve => {
        fs.readFile(
            path.resolve(__dirname, 'example/post-style.css'),
            'utf8',
            (err, data) => {
                if (err) {
                    throw err;
                }

                resolve(data);
            },
        );
    });

test('The test file is generated correctly.', async done => {
    const preprocessed = await getPreprocessedFile();
    const processed = await getProcessedFile();

    const root = postcss.parse(preprocessed);
    addCustomPropFallbacks(root);
    expect(root.toString()).toBe(processed);

    done();
});
