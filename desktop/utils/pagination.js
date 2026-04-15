exports.getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};

exports.getPagingData = (count, page, limit) => {
  const totalItems = count;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  
  return { totalItems, totalPages, currentPage };
};
