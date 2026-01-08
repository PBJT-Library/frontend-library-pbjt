export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export function paginate<T>(
    data: T[],
    params: PaginationParams
): PaginatedResponse<T> {
    const { page, limit } = params;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = data.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        pagination: {
            page,
            limit,
            total: data.length,
            totalPages: Math.ceil(data.length / limit),
        },
    };
}
