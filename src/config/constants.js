import { groupBy, keys } from 'lodash';

const pico8PaletteColors = [
    { index: 0, color: "#000000", row: 0 },
    { index: 1, color: "#1D2B53", row: 0 },
    { index: 2, color: "#7E2553", row: 0 },
    { index: 3, color: "#008751", row: 0 },
    { index: 4, color: "#AB5236", row: 1 },
    { index: 5, color: "#5F574F", row: 1 },
    { index: 6, color: "#C2C3C7", row: 1 },
    { index: 7, color: "#FFF1E8", row: 1, isLight: true },
    { index: 8, color: "#FF004D", row: 2 },
    { index: 9, color: "#FFA300", row: 2 },
    { index: 10, color: "#FFEC27", row: 2, isLight: true, clashesWithSelectedColor: true },
    { index: 11, color: "#00E436", row: 2 },
    { index: 12, color: "#29ADFF", row: 3 },
    { index: 13, color: "#83769C", row: 3 },
    { index: 14, color: "#FF77A8", row: 3 },
    { index: 15, color: "#FFCCAA", row: 3, isLight: true },
];

const colorMap = {};

pico8PaletteColors.forEach((color) => {
    colorMap[color.index] = color.color;
});

let colorRowGroups = groupBy(pico8PaletteColors, 'row');
// group into array of rows
const colorRows = keys(colorRowGroups).map((key) => colorRowGroups[key]);

export { pico8PaletteColors, colorRows, colorMap };