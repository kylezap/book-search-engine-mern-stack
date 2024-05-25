import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { getMe, deleteBook } from "../utils/API";
import { GET_USER } from "../utils/queries";
import {
  CREATE_USER,
  LOGIN_USER,
  SAVE_BOOK,
  DELETE_BOOK,
} from "../utils/mutations";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

// const SavedBooks = () => {
//

//   // use this to determine if `useEffect()` hook needs to run again
//

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//           return false;
//         }
//         const { GetUser } = GET_USER();
//         const response = await GetUser(token);

//         if (!response.ok) {
//           throw new Error('something went wrong!');
//         }

//         const user = await response.json();
//         setUserData(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserData();
//   }, [userDataLength]);

const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const { loading, data, error } = useQuery(GET_USER, {variables: { userId: userData._id }});
  // const [deleteBook] = useMutation(DELETE_BOOK);
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    if (!loading && data) {
      console.log(data); // remove or comment out after testing
      const userBooks =  setUserData(data.GetUser(userData)); // argument should be the user's data from the GET_USER query in the `useQuery()` Hook on line 19 (i.e., `data.GetUser`) 
    }
  }, [loading, data]);
  
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  
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
  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
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
                    {/* <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    > */}
                      {/* Delete this Book!
                    </Button> */}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
