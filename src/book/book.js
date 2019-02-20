module.exports = book => {
  const { id, volumeInfo } = book;
  const { title, authors, description, categories, maturityRating, imageLinks, previewLink, infoLink } = volumeInfo;
  return {
    id,
    title,
    authors,
    description,
    categories,
    maturityRating,
    imageLinks,
    previewLink,
    infoLink
  };
};
