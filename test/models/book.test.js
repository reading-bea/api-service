const { expect } = require('chai');
const Book = require('../../src/models/book');
const bookFixture = require('../fixtures/models/book.json');

describe('Book Model', () => {

  it('should return all the required fields', () => {
    const book = Book(bookFixture);

    expect(book).to.deep.equal({
      id: bookFixture.id,
      title: bookFixture.volumeInfo.title,
      authors: bookFixture.volumeInfo.authors,
      description: bookFixture.volumeInfo.description,
      categories: bookFixture.volumeInfo.categories,
      maturityRating: bookFixture.volumeInfo.maturityRating,
      imageLinks: bookFixture.volumeInfo.imageLinks,
      previewLink: bookFixture.volumeInfo.previewLink,
      infoLink: bookFixture.volumeInfo.infoLink
    });
  });

});
