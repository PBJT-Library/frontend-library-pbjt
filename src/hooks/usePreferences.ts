import { useState, useEffect } from 'react';
import type { DateFormat } from '@/utils/dateFormatter';

interface Preferences {
    itemsPerPage: number;
    dateFormat: DateFormat;
}

const DEFAULT_PREFERENCES: Preferences = {
    itemsPerPage: 10,
    dateFormat: 'DD/MM/YYYY',
};

/**
 * Hook to access user preferences from localStorage
 */
export const usePreferences = (): Preferences => {
    const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);

    useEffect(() => {
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
            try {
                const loaded = JSON.parse(saved);
                setPreferences({
                    itemsPerPage: loaded.itemsPerPage || DEFAULT_PREFERENCES.itemsPerPage,
                    dateFormat: loaded.dateFormat || DEFAULT_PREFERENCES.dateFormat,
                });
            } catch (error) {
                console.error('Failed to load preferences:', error);
                setPreferences(DEFAULT_PREFERENCES);
            }
        }
    }, []);

    return preferences;
};
