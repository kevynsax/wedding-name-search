export interface WordPosition {
    word: string;
    startRow: number;
    startCol: number;
    direction: 'horizontal' | 'vertical' | 'diagonal' | 'diagonalBack' | 'verticalUp' | 'horizontalBack';
}

export interface GenerationResult {
    grid: string[][];
    placedWords: WordPosition[];
    unplacedWords: string[];
}

const DIRECTIONS = [
    { x: 1, y: 0, name: 'horizontal' },
    { x: 0, y: 1, name: 'vertical' },
    { x: 1, y: 1, name: 'diagonal' },
    { x: 1, y: -1, name: 'diagonalBack' },
    { x: 0, y: -1, name: 'verticalUp' },
    { x: -1, y: 0, name: 'horizontalBack' },
] as const;

export const generateWordSearch = (
    words: string[],
    rows: number,
    cols: number,
    maintainSurnames: boolean
): GenerationResult => {
    // Initialize empty grid
    const grid: string[][] = Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(''));

    const placedWords: WordPosition[] = [];
    const unplacedWords: string[] = [];

    // Sort words by length (longest first) to improve placement success
    // Process words: remove spaces if not maintaining surnames, uppercase everything
    const processedWords = words.map((w) => ({
        original: w,
        clean: maintainSurnames ? w.toUpperCase().replace(/\s+/g, '') : w.toUpperCase().split(' ')[0],
    }));

    // Sort by length descending
    processedWords.sort((a, b) => b.clean.length - a.clean.length);

    for (const { original, clean } of processedWords) {
        if (clean.length > Math.max(rows, cols)) {
            unplacedWords.push(original);
            continue;
        }

        let placed = false;
        // Try to place the word multiple times
        for (let attempt = 0; attempt < 100; attempt++) {
            const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
            const startRow = Math.floor(Math.random() * rows);
            const startCol = Math.floor(Math.random() * cols);

            if (canPlaceWord(grid, clean, startRow, startCol, direction.x, direction.y, rows, cols)) {
                placeWord(grid, clean, startRow, startCol, direction.x, direction.y);
                placedWords.push({
                    word: original,
                    startRow,
                    startCol,
                    direction: direction.name,
                });
                placed = true;
                break;
            }
        }

        if (!placed) {
            unplacedWords.push(original);
        }
    }

    // Fill empty spaces with random letters
    fillGrid(grid);

    return { grid, placedWords, unplacedWords };
};

const canPlaceWord = (
    grid: string[][],
    word: string,
    row: number,
    col: number,
    dx: number,
    dy: number,
    rows: number,
    cols: number
): boolean => {
    for (let i = 0; i < word.length; i++) {
        const r = row + i * dy;
        const c = col + i * dx;

        if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) return false;
    }
    return true;
};

const placeWord = (
    grid: string[][],
    word: string,
    row: number,
    col: number,
    dx: number,
    dy: number
) => {
    for (let i = 0; i < word.length; i++) {
        const r = row + i * dy;
        const c = col + i * dx;
        grid[r][c] = word[i];
    }
};

const fillGrid = (grid: string[][]) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }
};
