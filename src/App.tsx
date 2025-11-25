import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { setPuzzle, setStatus, resetPuzzle } from './store/puzzleSlice';
import { NameInput } from './components/NameInput';
import { Configuration } from './components/Configuration';
import { PuzzleGrid } from './components/PuzzleGrid';
import { UnplacedNames } from './components/UnplacedNames';
import { useLanguage } from './i18n/LanguageContext';
import { Sparkles, Printer, ArrowRight, ArrowLeft, RefreshCcw } from 'lucide-react';

function App() {
    const dispatch = useDispatch();
    const { names, rows, cols, maintainSurnames } = useSelector((state: RootState) => state.puzzle);
    const [currentStep, setCurrentStep] = useState(0);
    const { t } = useLanguage();
    const [validationError, setValidationError] = useState('');

    const handleGenerate = () => {
        dispatch(resetPuzzle());

        if (!rows || rows < 1 || !cols || cols < 1) {
            setValidationError('Please enter valid values for rows and columns');
            return;
        }
        setValidationError('');
        dispatch(setStatus('generating'));

        setCurrentStep(3);

        const worker = new Worker(new URL('./utils/wordSearch.worker.ts', import.meta.url), {
            type: 'module'
        });

        worker.onmessage = (e) => {
            if (e.data.success) {
                dispatch(setPuzzle(e.data.result));
            } else {
                console.error('Worker error:', e.data.error);
                dispatch(setStatus('idle'));
                setCurrentStep(2); // Go back to configuration on error
            }
            worker.terminate();
        };

        worker.onerror = (error) => {
            console.error('Worker error:', error);
            dispatch(setStatus('idle'));
            setCurrentStep(2); // Go back to configuration on error
            worker.terminate();
        };

        worker.postMessage({ names, rows, cols, maintainSurnames });
    };

    const handlePrint = () => {
        window.print();
    };

    const nextStep = () => setCurrentStep((p) => Math.min(3, p + 1));
    const prevStep = () => setCurrentStep((p) => Math.max(0, p - 1));

    const renderStep = () => {
        switch (currentStep) {
            case 0: // Welcome
                return (
                    <div className="step-welcome">
                        <div>
                            <h1>{t.appTitle}</h1>
                            <p>{t.appSubtitle}</p>
                        </div>
                        <button
                            onClick={nextStep}
                            className="btn-primary btn-lg"
                        >
                            {t.startCreating} <ArrowRight size={20} />
                        </button>
                    </div>
                );
            case 1: // Names
                return (
                    <div className="step-container">
                        <div className="step-header">
                            <h2>{t.addGuestNames}</h2>
                            <p>{t.whoInPuzzle}</p>
                        </div>
                        <NameInput />
                    </div>
                );
            case 2: // Configuration
                return (
                    <div className="step-container">
                        <div className="step-header">
                            <h2>{t.puzzleSettings}</h2>
                            <p>{t.customizeGrid}</p>
                        </div>
                        <Configuration />
                        {validationError && (
                            <div className="validation-error">
                                {validationError}
                            </div>
                        )}
                    </div>
                );
            case 3: // Result
                return (
                    <>
                        <div className="step-container">
                            <div className="result-header screen-only">
                                <h2>{t.yourPuzzle}</h2>
                                <p>{t.readyToPrint}</p>
                            </div>

                            {/* Screen version - with circles */}
                            <div className="screen-only">
                                <PuzzleGrid showCircles={true} />
                            </div>

                            {/* Print version - Page 2: Without circles */}
                            <div className="print-page-2 print-only">
                                <PuzzleGrid showCircles={false} />
                            </div>

                            <div className="result-actions">
                                <button
                                    onClick={handlePrint}
                                    className="btn-print"
                                >
                                    <Printer size={18} /> {t.print}
                                </button>
                                <button
                                    onClick={handleGenerate}
                                    className="btn-secondary"
                                >
                                    <RefreshCcw size={18} /> {t.tryAgain}
                                </button>
                            </div>
                        </div>

                        {/* Unplaced names outside the card */}
                        <UnplacedNames />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="app-container">
            {currentStep < 3 && (
                <div className="logo-container">
                    <img src="logo.png" alt="Logo" />
                </div>
            )}

            <div className="app-card">

                {currentStep > 0 && (
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>
                )}

                <div className="card-content">
                    {/* Back Button */}
                    {currentStep > 0 && (
                        <button
                            onClick={prevStep}
                            className="btn-back"
                        >
                            <ArrowLeft size={24} />
                        </button>
                    )}

                    {renderStep()}

                    {/* Navigation for Steps 1 & 2 */}
                    {(currentStep === 1 || currentStep === 2) && (
                        <div className="step-footer">
                            {currentStep === 1 ? (
                                <button
                                    onClick={nextStep}
                                    disabled={names.length === 0}
                                    className="btn-primary btn-md"
                                >
                                    {t.nextSettings} <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleGenerate}
                                    className="btn-primary btn-md"
                                >
                                    <Sparkles size={18} /> {t.generate}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
