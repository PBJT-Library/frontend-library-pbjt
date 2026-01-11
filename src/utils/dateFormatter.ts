export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';

/**
 * Format date string according to user preference
 */
export const formatDate = (dateString: string, format: DateFormat = 'DD/MM/YYYY'): string => {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return dateString;
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    switch (format) {
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'YYYY/MM/DD':
            return `${year}/${month}/${day}`;
        default:
            return `${day}/${month}/${year}`;
    }
};

/**
 * Format date with month name (for display)
 */
export const formatDateWithMonth = (dateString: string, format: DateFormat = 'DD/MM/YYYY'): string => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return dateString;
    }

    const day = date.getDate();
    const month = date.toLocaleDateString('id-ID', { month: 'short' });
    const year = date.getFullYear();

    switch (format) {
        case 'DD/MM/YYYY':
            return `${day} ${month} ${year}`;
        case 'MM/DD/YYYY':
            return `${month} ${day}, ${year}`;
        case 'YYYY/MM/DD':
            return `${year} ${month} ${day}`;
        default:
            return `${day} ${month} ${year}`;
    }
};
