import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function WelcomePage() {
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('https://trackerappauthentication-default-rtdb.firebaseio.com/items.json');
          const data = response.data;
          const itemsArray = [];
    
          for (let key in data) {
            itemsArray.push({ ...data[key], id: key });
          }
    
          setItems(itemsArray);
          console.log(itemsArray)   
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
  },[])
  const verifyEmail = () => {
    const token = localStorage.getItem("token");

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
        console.log("Verification email sent:", response.data);
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
      });
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/loginpage");
  };

  const submitBtnHandler = (e) => {
    e.preventDefault();
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    const data = {
      price: price,
      description: description,
      category: category,
      key: Date.now(),
    };

    setItems((prevItems) => [...prevItems, data]);

    console.log("submit button clicked", data);
    
    axios.post('https://trackerappauthentication-default-rtdb.firebaseio.com/items.json', data).then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    })

    priceRef.current.value='';
    descriptionRef.current.value='';
    categoryRef.current.value='';

  };
  const deleteBtnHandler = (id) => {
    axios.delete(`https://trackerappauthentication-default-rtdb.firebaseio.com/items/${id}.json`).then((response) => {
        console.log('Expense deleted successfully:', response.data);
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    })
    .catch((error) => {
        console.error(error);
    })
  }

  const editBtnhandler = (item) => {
    priceRef.current.value=item.price;
    descriptionRef.current.value=item.description;
    categoryRef.current.value=item.category;

    axios.put(`https://trackerappauthentication-default-rtdb.firebaseio.com/items/${item.id}.json`, item).then((response) => {
        console.log('Expense updated successfully:', response.data);
        setItems((prevItems) => prevItems.filter((each) => each.id !== item.id));
    })
  }

  return (
    <div className="container text-center d-flex flex-column align-items-center">
      <div className="mt-2 d-flex">
        <div className="mb-4">
          Your Profile is Incomplete
          <Link to="/profilepage" className="ms-2">
            Complete Now
          </Link>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <button onClick={verifyEmail} className="btn btn-primary">
          Verify Your Email
        </button>
      </div>

      <button onClick={logoutUser} className="btn btn-danger mt-3 mb-3">
        Logout
      </button>
      <div>
        <Form onSubmit={submitBtnHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price </Form.Label>
            <Form.Control
              required
              ref={priceRef}
              type="text"
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
              <option value=""></option>
              <option value="Food">Food</option>
              <option value="Movie">Movie</option>
              <option value="Travel">Travel</option>
            </Form.Control>
          </Form.Group>
          <Button className="mb-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>.</th>
              <th>Description</th>
              <th>Price Name</th>
              <th>category</th>
              <th>Delete</th>
              <th>Edit  </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.key}>
                <td>{i + 1}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td><Button onClick={() => deleteBtnHandler(item.id)} variant="danger">Delete</Button></td>
                <td><Button onClick={() => editBtnhandler(item)} variant="primary">Edit</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default WelcomePage;
