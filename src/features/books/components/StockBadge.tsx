import React from 'react';
import { Badge } from '@/components/ui';

interface StockBadgeProps {
    stock: number;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ stock }) => {
    const getVariant = () => {
        if (stock === 0) return 'error';
        if (stock <= 2) return 'warning';
        return 'success';
    };

    const getLabel = () => {
        if (stock === 0) return 'Out of Stock';
        if (stock <= 2) return `Low Stock (${stock})`;
        return `${stock} books`;
    };

    return (
        <Badge variant={getVariant()} size="sm">
            {getLabel()}
        </Badge>
    );
};
