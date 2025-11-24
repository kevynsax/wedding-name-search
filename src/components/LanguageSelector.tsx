import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';
import { Languages } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'pt', label: 'Português', flag: '🇧🇷' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
    ];

    return (
        <div className="language-selector">
            <Languages size={18} className="language-icon" />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="language-select"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
