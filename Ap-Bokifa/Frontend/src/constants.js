/* d:/Projects/Ap-Bokifa-main/src/constants.js */
// src/constants.js

export const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "best-selling", label: "Best selling" },
    { value: "title-asc", label: "Alphabetically, A-Z" },
    { value: "title-desc", label: "Alphabetically, Z-A" },
    { value: "price-asc", label: "Price, low to high" },
    { value: "price-desc", label: "Price, high to low" },
    { value: "date-asc", label: "Date, old to new" },
    { value: "date-desc", label: "Date, new to old" },
];

export const FORMAT_MULTIPLIERS = {
    Hardcover: 1.15,
    Paperback: 1.0,
    Ebook: 0.6,
    "Audio cd": 1.1,
};