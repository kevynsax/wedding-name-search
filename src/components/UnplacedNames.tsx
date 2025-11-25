import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { AlertCircle } from 'lucide-react';

export const UnplacedNames: React.FC = () => {
    const { unplacedWords } = useSelector((state: RootState) => state.puzzle);

    if (!unplacedWords || unplacedWords.length === 0) {
        return null;
    }

    return (
        <div className="unplaced-names-container print-hidden-always">
            <div className="unplaced-header">
                <AlertCircle size={18} />
                <h3>Names that couldn't fit ({unplacedWords.length})</h3>
            </div>
            <p className="unplaced-hint">Try increasing the grid size to include these names</p>
            <div className="unplaced-tags">
                {unplacedWords.map((name, index) => (
                    <span key={index} className="unplaced-tag">
                        {name}
                    </span>
                ))}
            </div>
        </div>
    );
};
