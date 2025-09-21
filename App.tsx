import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { buildColorGrid, COLORS } from './logic/pattern';
import GridCell from './components/GridCell';
import Controls from './components/Controls';

const App: React.FC = () => {
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [animationSpeed, setAnimationSpeed] = useState(100);

    const handleRowsChange = (newRows: number) => {
        setRows(Math.max(5, newRows));
        setCurrentStep(-1);
    };

    const handleColsChange = (newCols: number) => {
        setCols(Math.max(5, newCols));
        setCurrentStep(-1);
    };

    useEffect(() => {
        if (!isRunning) return;
        const timer = setInterval(() => {
            setCurrentStep(prev => prev + 1);
        }, animationSpeed);
        return () => clearInterval(timer);
    }, [isRunning, animationSpeed]);

    const handleStart = useCallback(() => setIsRunning(true), []);
    const handleStop = useCallback(() => setIsRunning(false), []);
    const handleReset = useCallback(() => {
        setIsRunning(false);
        setCurrentStep(0);
    }, []);

    // Build the color grid for the current frame
    const colorGrid = useMemo(() => buildColorGrid(rows, cols, currentStep), [rows, cols, currentStep]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
            <header className="w-full max-w-7xl mb-6 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">Pattern Grid Animator</h1>
                <p className="text-gray-400 mt-2">An interactive grid demonstrating a sweeping anti-diagonal pattern.</p>
            </header>
            
            <Controls
                rows={rows}
                cols={cols}
                isRunning={isRunning}
                onRowsChange={handleRowsChange}
                onColsChange={handleColsChange}
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleReset}
                animationSpeed={animationSpeed}
                onAnimationSpeedChange={setAnimationSpeed}
            />

            <main className="w-full flex-grow flex items-center justify-center mt-6">
                <div 
                    className="grid h-full gap-1 p-2 bg-gray-800 rounded-lg shadow-2xl"
                    style={{ 
                        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, 
                        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                        aspectRatio: `${cols / rows}` 
                    }}
                >
                    {colorGrid.map((rowArr, rIdx) =>
                        rowArr.map((color, cIdx) => (
                            <div
                                key={`${rIdx}-${cIdx}`}
                                className="rounded-sm transition-colors duration-200 ease-in-out flex items-center justify-center"
                                style={{ backgroundColor: color, width: '100%', height: '100%' }}
                            >
                                <span className="text-xs text-white/50 font-mono select-none">
                                    {rIdx * cols + cIdx + 1}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;