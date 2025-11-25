import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { updateConfig } from '../store/puzzleSlice';
import { Settings, Grid3X3, Type } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Configuration: React.FC = () => {
    const dispatch = useDispatch();
    const { rows, cols, maintainSurnames } = useSelector((state: RootState) => state.puzzle);
    const { t } = useLanguage();
    // Local state for inputs to allow empty values
    const [rowsInput, setRowsInput] = useState(rows.toString());
    const [colsInput, setColsInput] = useState(cols.toString());


    return (
        <div className="configuration-container">
            <div className="section-header">
                <Settings size={20} className="icon" />
                <h2>{t.configuration}</h2>
            </div>

            <div className="config-grid">
                <div className="config-item">
                    <label>
                        <Grid3X3 size={14} /> {t.rows}
                    </label>
                    <input
                        type="number"
                        value={rowsInput}
                        onChange={(e) => setRowsInput(e.target.value)}
                        onBlur={() => {
                            const val = rowsInput.trim();
                            if (val) {
                                const newRows = parseInt(val);
                                dispatch(updateConfig({ rows: newRows }));
                                setRowsInput(newRows.toString());
                            } else {
                                // Keep empty without resetting to default
                                setRowsInput('');
                            }
                        }}
                        min="5"
                        max="30"
                    />
                </div>
                <div className="config-item">
                    <label>
                        <Grid3X3 size={14} /> {t.columns}
                    </label>
                    <input
                        type="number"
                        value={colsInput}
                        onChange={(e) => setColsInput(e.target.value)}
                        onBlur={() => {
                            const val = colsInput.trim();
                            const newCols = val ? parseInt(val) : 10;
                            dispatch(updateConfig({ cols: newCols }));
                            setColsInput(newCols.toString());
                        }}
                        min="5"
                        max="30"
                    />
                </div>
            </div>

            <div className="toggle-container" onClick={() => dispatch(updateConfig({ maintainSurnames: !maintainSurnames }))}>
                <div className="toggle-label">
                    <div className="icon-wrapper">
                        <Type size={18} />
                    </div>
                    <div className="text-wrapper">
                        <span className="main-text">{t.keepSurnames}</span>
                        <span className="sub-text">{t.dontSplitLastNames}</span>
                    </div>
                </div>
                <div className={`toggle-switch ${maintainSurnames ? 'active' : 'inactive'}`}>
                    <div className={`toggle-knob ${maintainSurnames ? 'active' : 'inactive'}`} />
                </div>
            </div>
        </div>
    );
};
