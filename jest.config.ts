// jest.config.ts
import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    testEnvironment: 'node',
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/coverage/'
    ],
    roots: [
        'src/test/'
    ],
    collectCoverageFrom: [
        '**/*.ts'
    ]
};
export default config;
