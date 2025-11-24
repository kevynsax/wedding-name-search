import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const PuzzleGrid: React.FC = () => {
    const { grid, status, unplacedWords } = useSelector((state: RootState) => state.puzzle);
    const { t } = useLanguage();

    if (status === 'idle') {
        return (
            <div className="puzzle-idle-state">
                <div className="icon-container">
                    <span>🧩</span>
                </div>
                <p className="title">{t.readyToCreate}</p>
                <p className="subtitle">{t.addNamesAndGenerate}</p>
            </div>
        );
    }

    return (
        <div className="puzzle-container">
            {/* Decorative Header */}
            <div className="puzzle-header">
                <h3>{t.findTheGuests}</h3>
                <div className="divider" />
            </div>

            {status === 'impossible' && (
                <div className="error-message">
                    <AlertCircle size={20} />
                    <div className="error-content">
                        <p className="error-title">{t.someNamesCantFit}</p>
                        <ul>
                            {unplacedWords.map((w) => (
                                <li key={w}>{w}</li>
                            ))}
                        </ul>
                        <p className="error-hint">{t.tryIncreasingGrid}</p>
                    </div>
                </div>
            )}

            <div
                className="grid-wrapper"
                style={{
                    gridTemplateColumns: `repeat(${grid[0]?.length || 1}, minmax(0, 1fr))`
                }}
            >
                {grid.map((row, rIndex) =>
                    row.map((cell, cIndex) => (
                        <div
                            key={`${rIndex}-${cIndex}`}
                            className="grid-cell"
                        >
                            {cell}
                        </div>
                    ))
                )}
            </div>

            <div className="puzzle-footer">
                <p>{t.weddingOf}</p>
            </div>
        </div>
    );
};
