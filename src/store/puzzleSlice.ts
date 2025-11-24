import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PuzzleState {
    names: string[];
    rows: number;
    cols: number;
    maintainSurnames: boolean;
    grid: string[][];
    placedWords: { word: string; startRow: number; startCol: number; direction: string }[];
    unplacedWords: string[];
    status: 'idle' | 'generating' | 'success' | 'impossible';
}

const initialState: PuzzleState = {
    names: [],
    rows: 15,
    cols: 15,
    maintainSurnames: false,
    grid: [],
    placedWords: [],
    unplacedWords: [],
    status: 'idle',
};

const puzzleSlice = createSlice({
    name: 'puzzle',
    initialState,
    reducers: {
        addName: (state, action: PayloadAction<string>) => {
            if (!state.names.includes(action.payload)) {
                state.names.push(action.payload);
            }
        },
        removeName: (state, action: PayloadAction<string>) => {
            state.names = state.names.filter((n) => n !== action.payload);
        },
        setNames: (state, action: PayloadAction<string[]>) => {
            state.names = action.payload;
        },
        updateConfig: (
            state,
            action: PayloadAction<{ rows?: number; cols?: number; maintainSurnames?: boolean }>
        ) => {
            if (action.payload.rows) state.rows = action.payload.rows;
            if (action.payload.cols) state.cols = action.payload.cols;
            if (action.payload.maintainSurnames !== undefined)
                state.maintainSurnames = action.payload.maintainSurnames;
        },
        setPuzzle: (
            state,
            action: PayloadAction<{
                grid: string[][];
                placedWords: { word: string; startRow: number; startCol: number; direction: string }[];
                unplacedWords: string[];
            }>
        ) => {
            state.grid = action.payload.grid;
            state.placedWords = action.payload.placedWords;
            state.unplacedWords = action.payload.unplacedWords;
            state.status = action.payload.unplacedWords.length > 0 ? 'impossible' : 'success';
        },
        setStatus: (state, action: PayloadAction<PuzzleState['status']>) => {
            state.status = action.payload;
        },
        resetPuzzle: (state) => {
            state.grid = [];
            state.placedWords = [];
            state.unplacedWords = [];
            state.status = 'idle';
        },
    },
});

export const {
    addName,
    removeName,
    setNames,
    updateConfig,
    setPuzzle,
    setStatus,
    resetPuzzle,
} = puzzleSlice.actions;
export default puzzleSlice.reducer;
