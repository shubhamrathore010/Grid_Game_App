

export const BASE_ROWS = 20;
export const BASE_COLS = 10;
export const BASE_TOTAL = BASE_ROWS * BASE_COLS;

export const COLORS = {
    black: '#000000',
    green: '#00C853',
    blue: '#1E90FF',
    red: '#FF3B30'
};

// Blue indices you provided
export const BASE_BLUE_INDICES = [
    12,23,34,45,46,55,56,64,73,82,93,104,115,125,
    134,143,152,163,174,185,186,177,168,159,148,
    137,126,116,107,98,89,78,67,37,28,19
];

// 🔴 Red pattern loop (each array = indices lit at that frame)
export const RED_PATTERNS = [
    [15,24,33,42,51,52,73,84,95,106,117,128,139,150,159,168,177,186],
    [17,26,35,44,53,62,71,82,93,104,115,126,137,148,159,170,179,188],
    [18,27,36,45,54,53,72,81,92,103,114,125,136,147,158,169,180,189],
    [20,29,38,47,55,65,74,83,92,101,112,123,134,145,156,167,178,189],
    [19,30,39,48,57,66,75,84,93,102,111,122,133,144,155,166,177,188],
    [18,29,40,49,58,67,75,85,94,103,112,121,132,143,154,165,175,187],
    [17,28,39,50,59,68,77,86,95,104,113,122,131,142,153,164,175,186],
    [15,27,38,49,60,69,78,87,96,105,114,123,132,141,152,163,174,185],
    [15,26,37,48,59,70,79,88,97,106,115,124,133,142,151,162,173,184],
    [13,24,35,46,57,68,79,90,99,108,117,126,135,144,153,162,171,182],
    [12,23,34,45,56,67,78,89,100,109,118,127,136,145,154,163,172,181],
    [12,21,32,43,54,65,75,87,98,109,120,129,138,147,155,165,174,183],
    [13,22,31,42,53,54,75,86,97,108,119,130,139,148,157,166,175,184],
    [14,23,32,41,52,53,74,85,96,107,118,129,140,149,158,167,176,]
];

// --- utils (same as before) ---
export function indexToRC(index, rows, cols) {
    const zero = index - 1;
    const r = Math.floor(zero / cols) + 1;
    const c = (zero % cols) + 1;
    return { r, c };
}
export function rcToIndex(r, c, rows, cols) {
    return (r - 1) * cols + c;
}

// Green row indices
export function getGreenIndices(rows, cols) {
    const green = new Set();
    for (let c = 1; c <= cols; c++) green.add(rcToIndex(1, c, rows, cols));
    for (let c = 1; c <= cols; c++) green.add(rcToIndex(rows, c, rows, cols));
    return green;
}

// Main builder
export function buildColorGrid(rows = 20, cols = 10, tick = 0) {
    const total = rows * cols;
    const greenSet = getGreenIndices(rows, cols);

    // Helper to scale a 1-based index from base grid to current grid
    function scaleIndex(baseIndex, baseRows, baseCols, rows, cols) {
        const { r, c } = indexToRC(baseIndex, baseRows, baseCols);
        // Use Math.floor for better distribution in odd-sized grids
        const scaledR = Math.floor((r - 1) * (rows - 1) / (baseRows - 1)) + 1;
        const scaledC = Math.floor((c - 1) * (cols - 1) / (baseCols - 1)) + 1;
        return rcToIndex(scaledR, scaledC, rows, cols);
    }

    // Scale blue indices
    const blueSet = new Set(
        BASE_BLUE_INDICES.map(idx => scaleIndex(idx, BASE_ROWS, BASE_COLS, rows, cols))
    );

    // Scale red pattern indices for current tick
    const redPattern = RED_PATTERNS[tick % RED_PATTERNS.length] || [];
    const redSet = new Set(
        redPattern.map(idx => scaleIndex(idx, BASE_ROWS, BASE_COLS, rows, cols))
    );

    // Build grid
    const grid = Array.from({ length: rows }, () => Array(cols).fill(COLORS.black));
    for (let idx = 1; idx <= total; idx++) {
        const { r, c } = indexToRC(idx, rows, cols);

        let color = COLORS.black;
        if (greenSet.has(idx)) {
            color = COLORS.green; // top/bottom always green
        } else if (redSet.has(idx)) {
            color = COLORS.red;
        } else if (blueSet.has(idx)) {
            color = COLORS.blue;
        }
        grid[r - 1][c - 1] = color;
    }
    return grid;
}
