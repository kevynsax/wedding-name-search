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
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-pink-200/50 relative overflow-hidden">
            {/* Decorative corners - Softer */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-[6px] border-l-[6px] border-pink-200 rounded-tl-[2.5rem] m-6 opacity-50"></div>
            <div className="absolute top-0 right-0 w-24 h-24 border-t-[6px] border-r-[6px] border-pink-200 rounded-tr-[2.5rem] m-6 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[6px] border-l-[6px] border-pink-200 rounded-bl-[2.5rem] m-6 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[6px] border-r-[6px] border-pink-200 rounded-br-[2.5rem] m-6 opacity-50"></div>

            {status === 'impossible' && (
                <div className="mb-8 p-6 bg-red-50 border-none rounded-2xl text-red-700 shadow-inner">
                    <p className="font-bold text-lg mb-2">Could not fit the following names:</p>
                    <ul className="list-disc list-inside space-y-1">
                        {unplacedWords.map((w) => (
                            <li key={w}>{w}</li>
                        ))}
                    </ul>
                    <p className="text-sm mt-4 font-medium">Try increasing the grid size.</p>
                </div>
            )}

            <div
                className="grid gap-2 mx-auto w-fit p-4"
                style={{
                    gridTemplateColumns: `repeat(${grid[0]?.length || 1}, minmax(0, 1fr))`
                }}
            >
                {grid.map((row, rIndex) =>
                    row.map((cell, cIndex) => (
                        <div
                            key={`${rIndex}-${cIndex}`}
                            className="w-10 h-10 flex items-center justify-center text-xl font-serif text-gray-700 uppercase bg-pink-50/30 rounded-lg hover:bg-pink-100 transition-colors cursor-default select-none"
                        >
                            {cell}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
