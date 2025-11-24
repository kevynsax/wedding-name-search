import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { setPuzzle, setStatus } from './store/puzzleSlice';
import { generateWordSearch } from './utils/wordSearch';
import { NameInput } from './components/NameInput';
import { Configuration } from './components/Configuration';
import { PuzzleGrid } from './components/PuzzleGrid';
import { Heart } from 'lucide-react';

function App() {
  const dispatch = useDispatch();
  const { names, rows, cols, maintainSurnames } = useSelector((state: RootState) => state.puzzle);

  const handleGenerate = () => {
    if (names.length === 0) return;

    dispatch(setStatus('generating'));

    // Small timeout to allow UI to update
    setTimeout(() => {
      const result = generateWordSearch(names, rows, cols, maintainSurnames);
      dispatch(setPuzzle(result));
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 20% 20%, #fbcfe8 0%, transparent 50%), radial-gradient(circle at 80% 80%, #fbcfe8 0%, transparent 50%)'
      }}></div>

      {/* Floral Corners */}
      <img
        src="/floral-corner.png"
        alt="Floral Decoration"
        className="fixed top-0 left-0 w-64 h-64 -translate-x-16 -translate-y-16 pointer-events-none opacity-80 z-0 rotate-180"
      />
      <img
        src="/floral-corner.png"
        alt="Floral Decoration"
        className="fixed top-0 right-0 w-64 h-64 translate-x-16 -translate-y-16 pointer-events-none opacity-80 z-0 -rotate-90"
      />
      <img
        src="/floral-corner.png"
        alt="Floral Decoration"
        className="fixed bottom-0 left-0 w-64 h-64 -translate-x-16 translate-y-16 pointer-events-none opacity-80 z-0 rotate-90"
      />
      <img
        src="/floral-corner.png"
        alt="Floral Decoration"
        className="fixed bottom-0 right-0 w-64 h-64 translate-x-16 translate-y-16 pointer-events-none opacity-80 z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2 text-pink-600">
            <Heart className="fill-current animate-pulse" size={32} />
            <Heart className="fill-current animate-bounce" size={24} style={{ animationDelay: '0.1s' }} />
            <Heart className="fill-current animate-pulse" size={32} style={{ animationDelay: '0.2s' }} />
          </div>
          <h1 className="text-6xl font-serif text-pink-900 mb-2 drop-shadow-sm">Wedding Word Search</h1>
          <p className="text-2xl text-pink-700 font-script">Create a beautiful puzzle for your guests</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar: Controls */}
          <div className="lg:col-span-4 space-y-6 print:hidden">
            <NameInput />
            <Configuration />

            <button
              onClick={handleGenerate}
              disabled={names.length === 0}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xl font-serif py-4 rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              Generate Puzzle
            </button>

            <button
              onClick={handlePrint}
              className="w-full bg-white text-pink-600 border-2 border-pink-100 text-xl font-serif py-4 rounded-2xl shadow-sm hover:bg-pink-50 hover:border-pink-200 transition-all"
            >
              Print Puzzle
            </button>
          </div>

          {/* Right Area: Preview */}
          <div className="lg:col-span-8">
            <PuzzleGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
