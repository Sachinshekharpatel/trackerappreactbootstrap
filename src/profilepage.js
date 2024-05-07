import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const ProfilePage = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD05UV-fq-o76VjeAcMGXYaG9RJDvESYyo', { idToken: token })  .then((response) => {
        console.log(response)
      const user = response.data.users[0]; // only one user is returned there is some reason i had put this
      setName(user.displayName || "");
      setImageUrl(user.photoUrl || "");
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
// below is update url for updating profile 
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD05UV-fq-o76VjeAcMGXYaG9RJDvESYyo`;

    const body = {
      idToken: token,
      displayName: name,
      photoUrl: imageUrl,
      returnSecureToken: true
    };

    fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to update profile");
        }
      })
      .then((data) => {
        console.log("Profile updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="container">
      <Link to="/welcomepage">Go to Welcome page</Link>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Profile</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
