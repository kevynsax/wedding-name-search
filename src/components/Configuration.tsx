import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { updateConfig } from '../store/puzzleSlice';

export const Configuration: React.FC = () => {
    const dispatch = useDispatch();
    const { rows, cols, maintainSurnames } = useSelector((state: RootState) => state.puzzle);

    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-pink-200">
            <h2 className="text-2xl font-serif text-pink-800 mb-4">Puzzle Settings</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
                    <input
                        type="number"
                        value={rows}
                        onChange={(e) => dispatch(updateConfig({ rows: parseInt(e.target.value) || 10 }))}
                        className="w-full p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                        min="5"
                        max="30"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
                    <input
                        type="number"
                        value={cols}
                        onChange={(e) => dispatch(updateConfig({ cols: parseInt(e.target.value) || 10 }))}
                        className="w-full p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                        min="5"
                        max="30"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="maintainSurnames"
                    checked={maintainSurnames}
                    onChange={(e) => dispatch(updateConfig({ maintainSurnames: e.target.checked }))}
                    className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
                />
                <label htmlFor="maintainSurnames" className="text-gray-700">
                    Maintain Surnames (don't split)
                </label>
            </div>
        </div>
    );
};
