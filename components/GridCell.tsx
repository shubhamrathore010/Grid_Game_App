import React from 'react';
import { CellState } from '../types';

interface GridCellProps {
    state: CellState;
    cellId: number;
}

const GridCell: React.FC<GridCellProps> = ({ state, cellId }) => {
    const getColor = () => {
        switch (state) {
            case CellState.Header:
            case CellState.Footer:
                return 'bg-green-600';
            case CellState.Blue:
                return 'bg-blue-500';
            case CellState.Red:
                return 'bg-red-500 shadow-lg shadow-red-500/50';
            case CellState.Default:
            default:
                return 'bg-gray-700';
        }
    };

    return (
        <div className={`rounded-sm transition-colors duration-200 ease-in-out flex items-center justify-center ${getColor()}`}>
            <span className="text-xs text-white/50 font-mono select-none">{cellId}</span>
        </div>
    );
};

export default React.memo(GridCell);