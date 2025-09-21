
import React from 'react';

interface ControlsProps {
    rows: number;
    cols: number;
    isRunning: boolean;
    animationSpeed: number;
    onRowsChange: (value: number) => void;
    onColsChange: (value: number) => void;
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onAnimationSpeedChange: (value: number) => void;
}

const InputField: React.FC<{ label: string; value: number; onChange: (val: number) => void; min: number }> = ({ label, value, onChange, min }) => (
    <div className="flex flex-col">
        <label htmlFor={label} className="mb-1 text-sm font-medium text-gray-400">{label}</label>
        <input
            id={label}
            type="number"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            min={min}
            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none w-28"
        />
    </div>
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string; disabled?: boolean }> = ({ onClick, children, className = '', disabled = false }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {children}
    </button>
);


const Controls: React.FC<ControlsProps> = ({
    rows,
    cols,
    isRunning,
    onRowsChange,
    onColsChange,
    onStart,
    onStop,
    onReset,
    animationSpeed,
    onAnimationSpeedChange,
}) => {
    return (
        <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-700">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-4">
                    <InputField label="Rows" value={rows} onChange={onRowsChange} min={5} />
                    <InputField label="Columns" value={cols} onChange={onColsChange} min={5} />
                </div>
                
                <div className="h-10 border-l border-gray-600 hidden sm:block"></div>

                <div className="flex items-center gap-2">
                    {!isRunning ? (
                        <Button onClick={onStart} className="bg-green-600 hover:bg-green-500 text-white focus:ring-green-400">
                            Start
                        </Button>
                    ) : (
                        <Button onClick={onStop} className="bg-yellow-600 hover:bg-yellow-500 text-white focus:ring-yellow-400">
                            Stop
                        </Button>
                    )}
                    <Button onClick={onReset} disabled={isRunning} className="bg-red-600 hover:bg-red-500 text-white focus:ring-red-400">
                        Reset
                    </Button>
                </div>

                <div className="h-10 border-l border-gray-600 hidden sm:block"></div>

                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="speed" className="mb-1 text-sm font-medium text-gray-400">
                        Speed (ms/step): {animationSpeed}
                    </label>
                    <input
                        id="speed"
                        type="range"
                        min="25"
                        max="500"
                        step="25"
                        value={animationSpeed}
                        onChange={(e) => onAnimationSpeedChange(parseInt(e.target.value, 10))}
                        className="w-full sm:w-40 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default Controls;
