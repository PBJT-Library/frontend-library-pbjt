import React from 'react';
import { Badge } from '@/components/ui';

interface StatusBadgeProps {
    status: 'available' | 'loaned' | 'reserved' | 'maintenance' | 'lost';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getVariant = () => {
        switch (status) {
            case 'available':
                return 'success';
            case 'loaned':
                return 'warning';
            case 'reserved':
                return 'info';
            case 'maintenance':
                return 'warning';
            case 'lost':
                return 'error';
            default:
                return 'neutral';
        }
    };

    const getLabel = () => {
        switch (status) {
            case 'available':
                return 'Available';
            case 'loaned':
                return 'Loaned';
            case 'reserved':
                return 'Reserved';
            case 'maintenance':
                return 'Maintenance';
            case 'lost':
                return 'Lost';
            default:
                return status;
        }
    };

    return (
        <Badge variant={getVariant()} size="sm">
            {getLabel()}
        </Badge>
    );
};

// Keep StockBadge as alias for backward compatibility
export const StockBadge = StatusBadge;
