import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { setPuzzle, setStatus } from './store/puzzleSlice';
import { generateWordSearch } from './utils/wordSearch';
import { NameInput } from './components/NameInput';
import { Configuration } from './components/Configuration';
import { PuzzleGrid } from './components/PuzzleGrid';
import { useLanguage } from './i18n/LanguageContext';
import { Sparkles, Printer, ArrowRight, ArrowLeft } from 'lucide-react';

function App() {
  const dispatch = useDispatch();
  const { names, rows, cols, maintainSurnames } = useSelector((state: RootState) => state.puzzle);
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useLanguage();

  const handleGenerate = () => {
    dispatch(setStatus('generating'));
    setTimeout(() => {
      const result = generateWordSearch(names, rows, cols, maintainSurnames);
      dispatch(setPuzzle(result));
      setCurrentStep(3); // Move to result step
    }, 100);
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
          </div>
        );
      case 3: // Result
        return (
          <div className="step-container">
            <div className="result-header">
              <h2>{t.yourPuzzle}</h2>
              <p>{t.readyToPrint}</p>
            </div>
            <div className="puzzle-preview">
              <PuzzleGrid />
            </div>
            <div className="result-actions">
              <button
                onClick={handlePrint}
                className="btn-print"
              >
                <Printer size={18} /> {t.print}
              </button>
              <button
                onClick={() => setCurrentStep(0)}
                className="btn-secondary"
              >
                {t.startOver}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Logo - only on welcome screen */}
      {currentStep === 0 && (
        <div className="logo-container">
          <img src="logo.png" alt="Logo" />
        </div>
      )}

      <div className="app-card">

        {/* Progress Bar */}
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
          {currentStep > 0 && currentStep < 3 && (
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
