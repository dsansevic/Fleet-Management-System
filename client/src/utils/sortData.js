export const sortData = (data, key, ascending) => {
    if (!key) return data;

    return [...data].sort((a, b) => {
        const aValue = typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
        const bValue = typeof b[key] === "string" ? b[key].toLowerCase() : b[key];

        if (aValue < bValue) return ascending ? -1 : 1;
        if (aValue > bValue) return ascending ? 1 : -1;
        return 0;
    });
};