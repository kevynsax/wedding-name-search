import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { addName, removeName, setNames } from '../store/puzzleSlice';
import { Plus, Trash2 } from 'lucide-react';

export const NameInput: React.FC = () => {
    const dispatch = useDispatch();
    const names = useSelector((state: RootState) => state.puzzle.names);
    const [singleName, setSingleName] = useState('');
    const [bulkNames, setBulkNames] = useState('');

    const handleAddSingle = (e: React.FormEvent) => {
        e.preventDefault();
        if (singleName.trim()) {
            dispatch(addName(singleName.trim()));
            setSingleName('');
        }
    };

    const handleBulkAdd = () => {
        const newNames = bulkNames
            .split('\n')
            .map((n) => n.trim())
            .filter((n) => n.length > 0);

        // Merge with existing or replace? Let's append unique ones.
        const uniqueNames = Array.from(new Set([...names, ...newNames]));
        dispatch(setNames(uniqueNames));
        setBulkNames('');
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-pink-200">
            <h2 className="text-2xl font-serif text-pink-800 mb-4">Guest Names</h2>

            {/* Single Add */}
            <form onSubmit={handleAddSingle} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={singleName}
                    onChange={(e) => setSingleName(e.target.value)}
                    placeholder="Add a guest name..."
                    className="flex-1 p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                    type="submit"
                    className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition-colors"
                >
                    <Plus size={24} />
                </button>
            </form>

            {/* Bulk Add */}
            <div className="mb-4">
                <textarea
                    value={bulkNames}
                    onChange={(e) => setBulkNames(e.target.value)}
                    placeholder="Paste list of names here (one per line)..."
                    className="w-full p-2 border border-pink-300 rounded h-24 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                    onClick={handleBulkAdd}
                    className="mt-2 w-full bg-pink-100 text-pink-800 py-2 rounded hover:bg-pink-200 transition-colors font-medium"
                >
                    Add List
                </button>
            </div>

            {/* List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
                {names.map((name) => (
                    <div
                        key={name}
                        className="flex justify-between items-center bg-pink-50 p-2 rounded border border-pink-100"
                    >
                        <span className="text-gray-700 font-medium">{name}</span>
                        <button
                            onClick={() => dispatch(removeName(name))}
                            className="text-pink-400 hover:text-pink-600"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {names.length === 0 && (
                    <p className="text-center text-gray-400 italic">No names added yet.</p>
                )}
            </div>
        </div>
    );
};
