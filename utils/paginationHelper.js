/**
 * Pagination Helper Utility
 * Provides reusable functions for server-side pagination, filtering, and sorting
 */

/**
 * Calculate pagination metadata
 * @param {number} page - Current page number (1-indexed)
 * @param {number} pageSize - Number of items per page
 * @param {number} totalCount - Total number of records
 * @returns {object} Pagination metadata
 */
function getPaginationMeta(page, pageSize, totalCount) {
    const currentPage = Math.max(1, parseInt(page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(pageSize) || 10));
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (currentPage - 1) * limit;

    return {
        currentPage,
        pageSize: limit,
        totalPages,
        totalCount,
        offset,
        limit,
        hasNext: currentPage < totalPages,
        hasPrevious: currentPage > 1,
        startRecord: totalCount > 0 ? offset + 1 : 0,
        endRecord: Math.min(offset + limit, totalCount)
    };
}

/**
 * Build Sequelize order clause from query parameters
 * @param {string} sortBy - Column name to sort by
 * @param {string} sortOrder - Sort direction ('asc' or 'desc')
 * @param {string} defaultSort - Default column to sort by
 * @returns {array} Sequelize order clause
 */
function buildSortClause(sortBy, sortOrder = 'asc', defaultSort = 'id') {
    const column = sortBy || defaultSort;
    const direction = (sortOrder || 'asc').toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    return [[column, direction]];
}

/**
 * Build Sequelize where clause from filters
 * @param {object} filters - Filter object with key-value pairs
 * @param {object} Op - Sequelize operators
 * @returns {object} Sequelize where clause
 */
function buildFilterClause(filters, Op) {
    const where = {};

    Object.keys(filters).forEach(key => {
        const value = filters[key];

        if (value === null || value === undefined || value === '') {
            return;
        }

        // Handle different filter types
        if (key.endsWith('_like')) {
            // Partial match (e.g., name_like)
            const field = key.replace('_like', '');
            where[field] = { [Op.like]: `%${value}%` };
        } else if (key.endsWith('_min')) {
            // Minimum value (e.g., price_min)
            const field = key.replace('_min', '');
            where[field] = where[field] || {};
            where[field][Op.gte] = value;
        } else if (key.endsWith('_max')) {
            // Maximum value (e.g., price_max)
            const field = key.replace('_max', '');
            where[field] = where[field] || {};
            where[field][Op.lte] = value;
        } else if (key.endsWith('_from')) {
            // Date from (e.g., createdAt_from)
            const field = key.replace('_from', '');
            where[field] = where[field] || {};
            where[field][Op.gte] = value;
        } else if (key.endsWith('_to')) {
            // Date to (e.g., createdAt_to)
            const field = key.replace('_to', '');
            where[field] = where[field] || {};
            where[field][Op.lte] = value;
        } else if (Array.isArray(value)) {
            // IN clause for arrays
            where[key] = { [Op.in]: value };
        } else {
            // Exact match
            where[key] = value;
        }
    });

    return where;
}

/**
 * Sanitize query parameters
 * @param {object} query - Request query object
 * @param {array} allowedFilters - Array of allowed filter keys
 * @returns {object} Sanitized filters
 */
function sanitizeFilters(query, allowedFilters) {
    const filters = {};

    allowedFilters.forEach(key => {
        if (query[key] !== undefined && query[key] !== '') {
            filters[key] = query[key];
        }
    });

    return filters;
}

/**
 * Generate pagination URLs for templates
 * @param {string} baseUrl - Base URL without query parameters
 * @param {object} query - Current query parameters
 * @param {object} pagination - Pagination metadata
 * @returns {object} URL object with navigation links
 */
function getPaginationUrls(baseUrl, query, pagination) {
    const buildUrl = (page) => {
        const params = new URLSearchParams({ ...query, page });
        return `${baseUrl}?${params.toString()}`;
    };

    return {
        first: buildUrl(1),
        previous: pagination.hasPrevious ? buildUrl(pagination.currentPage - 1) : null,
        next: pagination.hasNext ? buildUrl(pagination.currentPage + 1) : null,
        last: buildUrl(pagination.totalPages)
    };
}

module.exports = {
    getPaginationMeta,
    buildSortClause,
    buildFilterClause,
    sanitizeFilters,
    getPaginationUrls
};
