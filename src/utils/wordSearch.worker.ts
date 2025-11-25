// Web Worker for word search generation
import { generateWordSearch } from './wordSearch';

self.onmessage = (e: MessageEvent) => {
    const { names, rows, cols, maintainSurnames } = e.data;

    try {
        const result = generateWordSearch(names, rows, cols, maintainSurnames);
        self.postMessage({ success: true, result });
    } catch (error) {
        self.postMessage({ success: false, error: String(error) });
    }
};
