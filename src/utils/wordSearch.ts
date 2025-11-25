export interface WordPosition {
    word: string;
    startRow: number;
    startCol: number;
    direction: 'horizontal' | 'vertical' | 'diagonal';
}

export interface GenerationResult {
    grid: string[][];
    placedWords: WordPosition[];
    unplacedWords: string[];
}

// Only left-to-right directions: horizontal and diagonal-down-right
const DIRECTIONS = [
    { x: 1, y: 0, name: 'horizontal' as const },
    { x: 0, y: 1, name: 'vertical' as const },
    { x: 1, y: 1, name: 'diagonal' as const },
];

export const generateWordSearch = (
    words: string[],
    rows: number,
    cols: number,
    maintainSurnames: boolean,
    maxGridAttempts: number = 2_000,
    maxPlacementAttempts: number = 5_000
): GenerationResult => {
    // Process words: remove spaces if not maintaining surnames, uppercase everything
    const processedWords = words.map((w) => ({
        original: w,
        clean: maintainSurnames ? w.toUpperCase().replace(/\s+/g, '') : w.toUpperCase().split(' ')[0],
    }));

    // Filter out words that are too long to ever fit
    const maxDimension = Math.max(rows, cols);
    const fittableWords = processedWords.filter(w => w.clean.length <= maxDimension);
    const tooLongWords = processedWords
        .filter(w => w.clean.length > maxDimension)
        .map(w => w.original);

    // Sort by length descending to place longer words first
    fittableWords.sort((a, b) => b.clean.length - a.clean.length);

    let bestResult: GenerationResult | null = null;
    let bestPlacedCount = -1;

    // Try multiple grid configurations
    for (let gridAttempt = 0; gridAttempt < maxGridAttempts; gridAttempt++) {
        const result = tryGenerateGrid(fittableWords, rows, cols, maxPlacementAttempts);

        // Add words that were too long to ever fit
        result.unplacedWords.push(...tooLongWords);

        // Check if this is the best result so far
        if (result.placedWords.length > bestPlacedCount) {
            bestPlacedCount = result.placedWords.length;
            bestResult = result;

            // Early exit if we placed all words
            if (result.unplacedWords.length === 0) {
                break;
            }
        }
    }

    // Fill empty spaces with random letters in the best grid
    if (bestResult) {
        fillGrid(bestResult.grid);
    }

    return bestResult!;
};

const tryGenerateGrid = (
    processedWords: { original: string; clean: string }[],
    rows: number,
    cols: number,
    maxPlacementAttempts: number
): GenerationResult => {
    // Initialize empty grid
    const grid: string[][] = Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(''));

    const placedWords: WordPosition[] = [];
    const unplacedWords: string[] = [];

    // Shuffle words slightly to get different orderings (but keep general length priority)
    const shuffledWords = shuffleWithLengthPriority([...processedWords]);

    for (const { original, clean } of shuffledWords) {
        let placed = false;

        // Try random placements first
        for (let attempt = 0; attempt < maxPlacementAttempts; attempt++) {
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

        // If random didn't work, try systematic placement
        if (!placed) {
            placed = trySystematicPlacement(grid, original, clean, rows, cols, placedWords);
        }

        if (!placed) {
            unplacedWords.push(original);
        }
    }

    return { grid, placedWords, unplacedWords };
};

const trySystematicPlacement = (
    grid: string[][],
    original: string,
    clean: string,
    rows: number,
    cols: number,
    placedWords: WordPosition[]
): boolean => {
    // Try every position and direction systematically
    for (const direction of DIRECTIONS) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (canPlaceWord(grid, clean, row, col, direction.x, direction.y, rows, cols)) {
                    placeWord(grid, clean, row, col, direction.x, direction.y);
                    placedWords.push({
                        word: original,
                        startRow: row,
                        startCol: col,
                        direction: direction.name,
                    });
                    return true;
                }
            }
        }
    }
    return false;
};

const shuffleWithLengthPriority = (
    words: { original: string; clean: string }[]
): { original: string; clean: string }[] => {
    // Group words by length buckets and shuffle within buckets
    const buckets = new Map<number, { original: string; clean: string }[]>();

    for (const word of words) {
        const len = word.clean.length;
        if (!buckets.has(len)) {
            buckets.set(len, []);
        }
        buckets.get(len)!.push(word);
    }

    // Shuffle each bucket
    for (const bucket of buckets.values()) {
        for (let i = bucket.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bucket[i], bucket[j]] = [bucket[j], bucket[i]];
        }
    }

    // Reconstruct array with longest words first
    const sortedLengths = Array.from(buckets.keys()).sort((a, b) => b - a);
    const result: { original: string; clean: string }[] = [];

    for (const len of sortedLengths) {
        result.push(...buckets.get(len)!);
    }

    return result;
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
