import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const PuzzleGrid: React.FC = () => {
    const { grid, status, unplacedWords } = useSelector((state: RootState) => state.puzzle);

    if (status === 'idle') {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px] bg-white/50 rounded-lg border-2 border-dashed border-pink-200">
                <p className="text-pink-400 text-lg font-serif">Add names and generate puzzle to preview</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl border-4 border-double border-pink-200 relative overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-pink-300 rounded-tl-3xl -mt-2 -ml-2"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-pink-300 rounded-tr-3xl -mt-2 -mr-2"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-pink-300 rounded-bl-3xl -mb-2 -ml-2"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-pink-300 rounded-br-3xl -mb-2 -mr-2"></div>

            {status === 'impossible' && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
                    <p className="font-bold">Could not fit the following names:</p>
                    <ul className="list-disc list-inside">
                        {unplacedWords.map((w) => (
                            <li key={w}>{w}</li>
                        ))}
                    </ul>
                    <p className="text-sm mt-2">Try increasing the grid size.</p>
                </div>
            )}

            <div
                className="grid gap-1 mx-auto w-fit"
                style={{
                    gridTemplateColumns: `repeat(${grid[0]?.length || 1}, minmax(0, 1fr))`
                }}
            >
                {grid.map((row, rIndex) =>
                    row.map((cell, cIndex) => (
                        <div
                            key={`${rIndex}-${cIndex}`}
                            className="w-8 h-8 flex items-center justify-center text-lg font-serif text-gray-800 uppercase"
                        >
                            {cell}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
