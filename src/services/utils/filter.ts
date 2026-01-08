export function filterData<T>(
    data: T[],
    filters: Record<string, any>
): T[] {
    return data.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (value === undefined || value === null || value === '') return true;

            const itemValue = (item as any)[key];

            // String search (case-insensitive)
            if (typeof value === 'string' && typeof itemValue === 'string') {
                return itemValue.toLowerCase().includes(value.toLowerCase());
            }

            // Exact match for other types
            return itemValue === value;
        });
    });
}

export function sortData<T>(
    data: T[],
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'asc'
): T[] {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
        const aValue = (a as any)[sortBy];
        const bValue = (b as any)[sortBy];

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });
}
