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
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl shadow-pink-100/50 border border-white/50">
            <h2 className="text-3xl font-serif text-pink-900 mb-6">Guest Names</h2>

            {/* Single Add */}
            <form onSubmit={handleAddSingle} className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={singleName}
                    onChange={(e) => setSingleName(e.target.value)}
                    placeholder="Add a guest name..."
                    className="flex-1 p-4 bg-pink-50/50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all placeholder-pink-300 text-pink-900"
                />
                <button
                    type="submit"
                    className="bg-pink-500 text-white p-4 rounded-2xl hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/40 hover:-translate-y-0.5"
                >
                    <Plus size={24} />
                </button>
            </form>

            {/* Bulk Add */}
            <div className="mb-6">
                <textarea
                    value={bulkNames}
                    onChange={(e) => setBulkNames(e.target.value)}
                    placeholder="Paste list of names here (one per line)..."
                    className="w-full p-4 bg-pink-50/50 border-none rounded-2xl h-32 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all placeholder-pink-300 text-pink-900 resize-none"
                />
                <button
                    onClick={handleBulkAdd}
                    className="mt-3 w-full bg-pink-100 text-pink-700 py-3 rounded-2xl hover:bg-pink-200 transition-all font-medium"
                >
                    Add List
                </button>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {names.map((name) => (
                    <div
                        key={name}
                        className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-pink-50 group hover:shadow-md transition-all"
                    >
                        <span className="text-gray-700 font-medium">{name}</span>
                        <button
                            onClick={() => dispatch(removeName(name))}
                            className="text-pink-300 hover:text-pink-500 transition-colors p-1 rounded-full hover:bg-pink-50"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {names.length === 0 && (
                    <div className="text-center py-8 text-pink-300 italic bg-pink-50/30 rounded-2xl border border-dashed border-pink-200">
                        No names added yet
                    </div>
                )}
            </div>
        </div>
    );
};
