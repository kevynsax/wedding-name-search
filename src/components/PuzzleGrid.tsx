import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useLanguage } from '../i18n/LanguageContext';

interface PuzzleGridProps {
    showCircles?: boolean;
}

export const PuzzleGrid: React.FC<PuzzleGridProps> = () => {
    const { grid, status, placedWords } = useSelector((state: RootState) => state.puzzle);
    const { t } = useLanguage();
    const gridRef = useRef<HTMLDivElement>(null);

    // Calculate SVG paths for each placed word
    const wordPaths = useMemo(() => {
        if (!placedWords || !grid.length) return [];

        return placedWords.map(({ word, startRow, startCol, direction }) => {
            const cleanWord = word.toUpperCase().replace(/\s+/g, '');
            const length = cleanWord.length;

            // Calculate start and end positions
            const dx = direction === 'horizontal' || direction === 'diagonal' ? 1 : 0;
            const dy = direction === 'vertical' || direction === 'diagonal' ? 1 : 0;

            const endRow = startRow + (length - 1) * dy;
            const endCol = startCol + (length - 1) * dx;

            // Calculate center points for start and end cells (in grid units)
            const x1 = startCol + 0.5;
            const y1 = startRow + 0.5;
            const x2 = endCol + 0.5;
            const y2 = endRow + 0.5;

            return {
                word,
                x1,
                y1,
                x2,
                y2,
                length,
                direction
            };
        });
    }, [placedWords, grid]);

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

    if (status === 'generating') {
        return (
            <div className="puzzle-idle-state">
                <div className="icon-container">
                    <div className="loading-spinner"></div>
                </div>
                <p className="title">Generating puzzle...</p>
                <p className="subtitle">Please wait while we place the names</p>
            </div>
        );
    }

    const cols = grid[0]?.length || 1;
    const rows = grid.length;

    return (
        <div className="puzzle-container">
            {/* Decorative Header */}
            <div className="puzzle-header print-hidden">
                <h3>{t.findTheGuests}</h3>
                <div className="divider" />
            </div>

            {/* Grid with Circles (default view) */}
            <div className="grid-container">
                <div
                    ref={gridRef}
                    className="grid-wrapper"
                    style={{
                        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
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

                <svg
                    className="word-highlights"
                    viewBox={`0 0 ${cols} ${rows}`}
                    preserveAspectRatio="none"
                >
                    {wordPaths.map(({ word, x1, y1, x2, y2 }, index) => {
                        // Calculate the angle and length in grid units
                        const angle = Math.atan2(y2 - y1, x2 - x1);
                        const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

                        // Width and height in grid units - increased to add more padding around letters
                        const rectWidth = dist + 0.5;  // increased from 0.3
                        const rectHeight = 1.0;       // increased from 0.9

                        return (
                            <g key={`${word}-${index}`}>
                                {/* Rounded rectangle around the word */}
                                <rect
                                    x={-0.25}
                                    y={-rectHeight / 2}
                                    width={rectWidth}
                                    height={rectHeight}
                                    rx={rectHeight / 2}
                                    ry={rectHeight / 2}
                                    transform={`translate(${x1}, ${y1}) rotate(${angle * 180 / Math.PI})`}
                                    fill="none"
                                    stroke="rgba(197, 160, 89, 0.8)"
                                    strokeWidth="0.06"
                                    strokeDasharray="0.12,0.06"
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Grid without Circles (only visible in print, separated into its own page) */}
            <div className="grid-container no-circles print-only" style={{ pageBreakBefore: 'always' }}>
                <div
                    className="grid-wrapper"
                    style={{
                        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
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
            </div>
        </div>
    );
};
