import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

// import { getMe, deleteBook } from "../utils/API";
import { GET_USER } from "../utils/queries";
import {
  DELETE_BOOK,
} from "../utils/mutations";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";


const SavedBooks = () => {
  const userId = Auth.getProfile().data._id;
  console.log(userId);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: userId },
  });
  
  const [deleteBook] = useMutation(DELETE_BOOK);

  if (loading) return <h2>Loading... </h2>;
  
  if (error) return <h2>`Error! ${error.message}`</h2>;
  
  let books = data.getUser.savedBooks;
  

  const handleDeleteBook = async (bookId) => {
  try {
    const { data } = await deleteBook({
      variables: { bookId: bookId, userId: userId },
    });
    console.log(data);
    removeBookId(bookId);
  } catch (err) {
    console.error(err);
  }
};





  // const handleDeleteBook = async (bookId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const { data } = await deleteBook({
  //       variables: { userId: userData._id, bookId: bookId },
  //     });

  //     setUserData(data.deleteBook);
  //     removeBookId(bookId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  
  if (!loading && data) {

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {books.length
            ? `Viewing ${books.length} saved ${
                books.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {books.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                     <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
}
export default SavedBooks;
