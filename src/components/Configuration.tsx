import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { updateConfig } from '../store/puzzleSlice';

export const Configuration: React.FC = () => {
    const dispatch = useDispatch();
    const { rows, cols, maintainSurnames } = useSelector((state: RootState) => state.puzzle);

    return (
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl shadow-pink-100/50 border border-white/50">
            <h2 className="text-3xl font-serif text-pink-900 mb-6">Puzzle Settings</h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-bold text-pink-800 mb-2 uppercase tracking-wider">Rows</label>
                    <input
                        type="number"
                        value={rows}
                        onChange={(e) => dispatch(updateConfig({ rows: parseInt(e.target.value) || 10 }))}
                        className="w-full p-4 bg-pink-50/50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-pink-900 font-medium"
                        min="5"
                        max="30"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-pink-800 mb-2 uppercase tracking-wider">Columns</label>
                    <input
                        type="number"
                        value={cols}
                        onChange={(e) => dispatch(updateConfig({ cols: parseInt(e.target.value) || 10 }))}
                        className="w-full p-4 bg-pink-50/50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-pink-900 font-medium"
                        min="5"
                        max="30"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-pink-50/30 rounded-2xl">
                <input
                    type="checkbox"
                    id="maintainSurnames"
                    checked={maintainSurnames}
                    onChange={(e) => dispatch(updateConfig({ maintainSurnames: e.target.checked }))}
                    className="w-5 h-5 text-pink-500 border-none rounded focus:ring-pink-400 bg-white shadow-sm"
                />
                <label htmlFor="maintainSurnames" className="text-gray-700 font-medium cursor-pointer select-none">
                    Maintain Surnames (don't split)
                </label>
            </div>
        </div>
    );
};
