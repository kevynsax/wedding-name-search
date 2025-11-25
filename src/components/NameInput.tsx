import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { addName, removeName, setNames } from '../store/puzzleSlice';
import { Plus, Trash2, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const NameInput: React.FC = () => {
    const dispatch = useDispatch();
    const names = useSelector((state: RootState) => state.puzzle.names);
    const [singleName, setSingleName] = useState('');
    const [bulkNames, setBulkNames] = useState('');
    const { t } = useLanguage();

    const handleAddSingle = (e: React.FormEvent) => {
        e.preventDefault();
        if (singleName.trim()) {
            dispatch(addName(capitalize(singleName.trim())));
            setSingleName('');
        }
    };

    const handleBulkAdd = () => {
        const newNames = bulkNames
            .split('\n')
            .map((n) => n.trim())
            .map((n) => capitalize(n))
            .filter((n) => n.length > 0);
        const uniqueNames = Array.from(new Set([...names, ...newNames]));
        dispatch(setNames(uniqueNames));
        setBulkNames('');
    };

    return (
        <div className="name-input-container">
            <div className="section-header">
                <Users size={20} className="icon" />
                <h2>{t.guestList}</h2>
            </div>

            {/* Single Add */}
            <form onSubmit={handleAddSingle} className="input-group">
                <input
                    type="text"
                    value={singleName}
                    onChange={(e) => setSingleName(e.target.value)}
                    placeholder={t.addGuestPlaceholder}
                />
                <button
                    type="submit"
                    className="btn-add"
                >
                    <Plus size={18} />
                </button>
            </form>

            {/* Bulk Add */}
            <div className="bulk-input-group">
                <textarea
                    value={bulkNames}
                    onChange={(e) => setBulkNames(e.target.value)}
                    placeholder={t.pasteListPlaceholder}
                />
                <button
                    onClick={handleBulkAdd}
                    disabled={!bulkNames.trim()}
                    className="btn-bulk-add"
                >
                    {t.addBulkList}
                </button>
            </div>

            {/* List */}
            <div className="guest-list">
                <div className="list-header">
                    <span>{t.addedGuests}</span>
                    <span>{names.length}</span>
                </div>

                <div className="list-content custom-scrollbar">
                    {names.map((name) => (
                        <div
                            key={name}
                            className="guest-item"
                        >
                            <span>{name}</span>
                            <button
                                onClick={() => dispatch(removeName(name))}
                                className="btn-delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {names.length === 0 && (
                        <div className="empty-state">
                            <p>{t.noGuestsYet}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
