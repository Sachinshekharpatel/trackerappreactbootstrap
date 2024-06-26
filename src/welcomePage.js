import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import exportFromJSON from "export-from-json"; // this file is the reason  how i can download csv file from my app.
import { useSelector } from "react-redux";
import "./welcomepage.css";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import { authActions } from "./authreducerredux";
import { useDispatch } from "react-redux";
import { expenseActions } from "./authreducerredux";
import { themeActions } from "./authreducerredux";
function WelcomePage() {
  const darkTheme = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const loginStatus = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const [isPrice, setIsPrice] = useState(0);
  const [itemToEdit, setItemToEdit] = useState("");
  const priceRef = useRef(0);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const editPriceRef = useRef(null);
  const editDescriptionRef = useRef(null);
  const editCategoryRef = useRef(null);
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  let email = localStorage.getItem("emailSachinSteps");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const themeClass = darkTheme ? "bg-dark text-light" : "light-theme";

  //above themeclass this is the reason why after button click page goto dark mode and light mode
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("tokenSachinSteps");

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD05UV-fq-o76VjeAcMGXYaG9RJDvESYyo",
        { idToken: token }
      )
      .then((response) => {
        console.log(response.user);
        const user = response.data.users[0]; // only one user is returned there is some reason i had put this

        setName(user.displayName || "");
        setImageUrl(user.photoUrl || "");
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);
  useEffect(() => {
    console.log(isPrice);
    console.log(darkTheme);
  }, [isPrice, isButtonDisabled, darkTheme]);

  const handleThemeButtonClick = () => {
    setIsButtonDisabled(!isButtonDisabled); // i had write logic  for button will be disabled after click than ... i change it to dark mode to light mode
    dispatch(themeActions.toggleTheme());
  };

  const token = localStorage.getItem("tokenSachinSteps");

  useEffect(() => {
    if (!token) {
      navigate("/loginpage");
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sachinstepsdatabase-default-rtdb.firebaseio.com/items.json"
        );
        const dataObj = response.data;
        console.log(dataObj);
        const itemsArray = [];

        for (let key in dataObj) {
          if (dataObj[key].email === email) {
            itemsArray.push({ ...dataObj[key], id: key });
            dispatch(expenseActions.addExpense({ ...dataObj[key], id: key }));
          }
        }

        setItems(itemsArray);
        console.log(itemsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loginStatus, email]);
  const verifyEmail = () => {
    const token = localStorage.getItem("tokenSachinSteps");

    if (!token) {
      console.error("No token found");
      alert("No token found");
      return;
    }
    const data = {
      requestType: "VERIFY_EMAIL",
      idToken: token,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD05UV-fq-o76VjeAcMGXYaG9RJDvESYyo",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(`Verification email sent successfully to your ${email}`);
        // console.log("Verification email sent:", response.data);
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
      });
  };

  const logoutUser = () => {
    console.log("logout button clicked");
    dispatch(authActions.logout());
    if (loginStatus || token) {
      localStorage.removeItem("tokenSachinSteps");
      localStorage.removeItem("emailSachinSteps");
      navigate("/loginpage");
      email = "";
    }
  };

  const submitBtnHandler = (e) => {
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    if (price.length > 0 && description.length > 0 && category.length > 0) {
      const data = {
        price: price,
        description: description,
        category: category,
        email: email,
        key: Date.now(),
      };
      setItems((prevItems) => [...prevItems, data]);

      console.log("submit button clicked", data);
      const token = localStorage.getItem("tokenSachinSteps");
      axios
        .post(
          "https://sachinstepsdatabase-default-rtdb.firebaseio.com/items.json",
          data
        )
        .then((response) => {
          console.log(response);
          dispatch(expenseActions.addExpense(data));
        })
        .catch((error) => {
          console.error(error);
        });
      setIsPrice(0); // this is used to enable  premium button i think
      priceRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
    } else {
      alert("Please fill all the required field to Submit ");
    }
  };
  const deleteBtnHandler = (id) => {
    axios
      .delete(
        `https://sachinstepsdatabase-default-rtdb.firebaseio.com/items/${id}.json`
      )
      .then((response) => {
        console.log("Expense deleted successfully:", response.data);
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        dispatch(expenseActions.deleteExpense(id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveChangesHandler = (item) => {
    setModal(false);
    console.log(item);
    const updatedItem = {
      price: editPriceRef.current.value,
      description: editDescriptionRef.current.value,
      category: editCategoryRef.current.value,
      id: item.id,
      key: Date.now(),
    };

    axios
      .put(
        `https://sachinstepsdatabase-default-rtdb.firebaseio.com/items/${item.id}.json`,
        updatedItem
      )
      .then((response) => {
        console.log("Expense updated successfully:", response.data);
        setItems((prevItems) =>
          prevItems.map((iTemOfMap) =>
            iTemOfMap.id === item.id ? updatedItem : iTemOfMap
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const editBtnhandler = (item, id) => {
    setModal(true);
    console.log(item);
    setEditDescription(item.description);
    setEditPrice(item.price);
    setEditCategory(item.category);
    setItemToEdit(item);
  };

  const downloadBtnHandler = () => {
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    if (price.length > 0 && description.length > 0 && category.length > 0) {
      const data = [
        {
          price: price,
          description: description,
          category: category,
          key: Date.now(),
        },
      ];
      const filename = "items.csv";
      const exportType = exportFromJSON.types.csv; // in the place of csv we can use anytype of file i think
      exportFromJSON({ data, fileName: filename, exportType }); //this is the structure format to export our file to download
      submitBtnHandler();
    } else {
      alert("Please fill all the required field to download invoice");
    }
  };

  return (
    <div>
      {!darkTheme && (
        <div
          style={{
            backgroundImage: `
          linear-gradient(112.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%, rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%, rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%, rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%, rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%, rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%, rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),
          linear-gradient(157.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%, rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%, rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%, rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%, rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%, rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%, rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),
          linear-gradient(135deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%, rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%, rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%, rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%, rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%, rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%, rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),
          linear-gradient(90deg, rgb(195, 195, 195), rgb(228, 228, 228))
        `,
            backgroundBlendMode: "overlay, overlay, overlay, normal",
          }}
          className={themeClass}
        >
          <div
            className='
                d-flex
                justify-content-center
                align-items-center
                text-center
                variant"
                text-success
                badge
              '
          >
            SachinSteps
          </div>
          <div className="container text-center d-flex flex-column align-items-center">
            <div>
              <div className="mt-2 d-flex">
                {name == "" && imageUrl == "" ? (
                  <div
                    className='
                d-flex
                justify-content-center
                align-items-center
                text-center
                variant"
                text-success
                badge
              '
                  >
                    Profile Is Incomplete
                    <Link to="/profilepage" className="ms-2">
                      Complete Now
                    </Link>
                  </div>
                ) : (
                  <div className="badge-container">
                    <div
                      className='
                    d-flex
                    justify-content-center
                    align-items-center
                    text-center
                    variant"
                    text-success
                    badge
                  '
                    >
                      Profile Is Completed
                    </div>
                    <div
                      className='
                    d-flex
                    justify-content-center
                    align-items-center
                    text-center
                    variant"
                    text-success
                    badge
                  '
                    >
                      Edit your profile
                      <Link to="/profilepage" className="ms-2">
                        Edit
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 mb-4">
                <button onClick={verifyEmail} className="btn btn-primary">
                  Verify Your Email
                </button>
              </div>
              {/* below button theme works because at the first div  i had use themeclass as a class name and that is the reason it is showing light mode and dark mode */}
              <button
                className="btn btn-success"
                onClick={handleThemeButtonClick}
              >
                {isButtonDisabled ? "Enable Dark Mode" : "Enable Light Mode"}
              </button>
              <button onClick={logoutUser} className="btn btn-danger mt-3 mb-3">
                Logout
              </button>
            </div>

            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price </Form.Label>
                  <Form.Control
                    required
                    ref={priceRef}
                    onChange={() => setIsPrice(priceRef.current.value)}
                    type="number"
                    placeholder="Enter Price"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    ref={descriptionRef}
                    type="text"
                    placeholder="Description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    required
                    ref={categoryRef}
                    as="select"
                    defaultValue=""
                  >
                    <option value="">Choose Category</option>
                    <option value="Food">Food</option>
                    <option value="Movie">Movie</option>
                    <option value="Travel">Travel</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <Button
                className="mb-3"
                variant="primary"
                onClick={submitBtnHandler}
              >
                Submit
              </Button>
              <Button
                className="mb-3 btn btn-btn btn-success"
                onClick={downloadBtnHandler}
              >
                Download Invoice
              </Button>
              {isPrice > 9999 && (
                <Button className="mb-3" variant="success" type="submit">
                  Activate Premium
                </Button>
              )}
              <div>
                {modal && (
                  <div
                    className="modal show"
                    style={{ display: "block", position: "initial" }}
                  >
                    <Modal.Dialog>
                      <Modal.Header onClick={() => setModal(false)} closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            value={editPrice}
                            ref={editPriceRef}
                            onChange={(e) => setEditPrice(e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={editDescription}
                            placeholder="Enter Description"
                            ref={editDescriptionRef}
                            onChange={(e) => setEditDescription(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Category</Form.Label>
                          <Form.Select
                            required
                            ref={editCategoryRef}
                            onChange={(e) => setEditCategory(e.target.value)}
                          >
                            <option value={editCategory} disabled>
                              Select a category
                            </option>
                            <option value="Food">Food</option>
                            <option value="Movie">Movie</option>
                            <option value="Travel">Travel</option>
                          </Form.Select>
                        </Form.Group>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button
                          onClick={() => setModal(false)}
                          variant="secondary"
                        >
                          Close
                        </Button>
                        <Button
                          onClick={() => saveChangesHandler(itemToEdit)}
                          variant="primary"
                        >
                          Save changes
                        </Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </div>
                )}
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>.</th>
                    <th>Description</th>
                    <th>Price Name</th>
                    <th>category</th>
                    <th>Delete</th>
                    <th>Edit </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item.key}>
                      <td>{i + 1}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>
                        <Button
                          onClick={() => deleteBtnHandler(item.id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => editBtnhandler(item, item.id)}
                          variant="primary"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="mt-3 text-center">
            <small className="text-muted">
              Developed by : Sachin shekhar patel
              <Link to="https://github.com/Sachinshekharpatel/trackerappreactbootstrap">
                {" "}
                GitHub
              </Link>
            </small>
          </div>
        </div>
      )}
      {darkTheme && (
        <div className={themeClass}>
          <div
            className='
                d-flex
                justify-content-center
                align-items-center
                text-center
                variant"
                text-success
                badge
              '
          >
            SachinSteps
          </div>
          <div className="container text-center d-flex flex-column align-items-center">
            <div>
              <div className="mt-2 d-flex">
                {name == "" && imageUrl == "" ? (
                  <div
                    className='
                d-flex
                justify-content-center
                align-items-center
                text-center
                variant"
                text-success
                badge
              '
                  >
                    Profile Is Incomplete
                    <Link to="/profilepage" className="ms-2">
                      Complete Now
                    </Link>
                  </div>
                ) : (
                  <div className="badge-container">
                    <div
                      className='
                    d-flex
                    justify-content-center
                    align-items-center
                    text-center
                    variant"
                    text-success
                    badge
                  '
                    >
                      Profile Is Completed
                    </div>
                    <div
                      className='
                    d-flex
                    justify-content-center
                    align-items-center
                    text-center
                    variant"
                    text-success
                    badge
                  '
                    >
                      Edit your profile
                      <Link to="/profilepage" className="ms-2">
                        Edit
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 mb-4">
                <button onClick={verifyEmail} className="btn btn-primary">
                  Verify Your Email
                </button>
              </div>
              {/* below button theme works because at the first div  i had use themeclass as a class name and that is the reason it is showing light mode and dark mode */}
              <button
                className="btn btn-success"
                onClick={handleThemeButtonClick}
              >
                {isButtonDisabled ? "Enable Dark Mode" : "Enable Light Mode"}
              </button>
              <button onClick={logoutUser} className="btn btn-danger mt-3 mb-3">
                Logout
              </button>
            </div>

            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price </Form.Label>
                  <Form.Control
                    required
                    ref={priceRef}
                    onChange={() => setIsPrice(priceRef.current.value)}
                    type="number"
                    placeholder="Enter Price"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    ref={descriptionRef}
                    type="text"
                    placeholder="Description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    required
                    ref={categoryRef}
                    as="select"
                    defaultValue=""
                  >
                    <option value="">Choose Category</option>
                    <option value="Food">Food</option>
                    <option value="Movie">Movie</option>
                    <option value="Travel">Travel</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <Button
                className="mb-3"
                variant="primary"
                onClick={submitBtnHandler}
              >
                Submit
              </Button>
              <Button
                className="mb-3 btn btn-btn btn-success"
                onClick={downloadBtnHandler}
              >
                Download Invoice
              </Button>
              {isPrice > 9999 && (
                <Button className="mb-3" variant="success" type="submit">
                  Activate Premium
                </Button>
              )}
              <div>
                {modal && (
                  <div
                    className="modal show"
                    style={{ display: "block", position: "initial" }}
                  >
                    <Modal.Dialog>
                      <Modal.Header onClick={() => setModal(false)} closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            value={editPrice}
                            ref={editPriceRef}
                            onChange={(e) => setEditPrice(e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={editDescription}
                            placeholder="Enter Description"
                            ref={editDescriptionRef}
                            onChange={(e) => setEditDescription(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Category</Form.Label>
                          <Form.Select
                            required
                            ref={editCategoryRef}
                            onChange={(e) => setEditCategory(e.target.value)}
                          >
                            <option value={editCategory} disabled>
                              Select a category
                            </option>
                            <option value="Food">Food</option>
                            <option value="Movie">Movie</option>
                            <option value="Travel">Travel</option>
                          </Form.Select>
                        </Form.Group>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button
                          onClick={() => setModal(false)}
                          variant="secondary"
                        >
                          Close
                        </Button>
                        <Button
                          onClick={() => saveChangesHandler(itemToEdit)}
                          variant="primary"
                        >
                          Save changes
                        </Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </div>
                )}
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>.</th>
                    <th>Description</th>
                    <th>Price Name</th>
                    <th>category</th>
                    <th>Delete</th>
                    <th>Edit </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item.key}>
                      <td>{i + 1}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>
                        <Button
                          onClick={() => deleteBtnHandler(item.id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => editBtnhandler(item, item.id)}
                          variant="primary"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="mt-3 text-center">
            <small className="text-muted">
              Developed by : Sachin shekhar patel
              <Link to="https://github.com/Sachinshekharpatel/trackerappreactbootstrap">
                {" "}
                GitHub
              </Link>
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;
