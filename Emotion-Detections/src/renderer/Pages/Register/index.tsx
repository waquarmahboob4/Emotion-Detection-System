import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './register.css';
import axios from 'axios';
import emote1 from '../../../../assets/Home/circleHome.png';
import emote2 from '../../../../assets/Home/circleOutlineHome.png';
import Joi from 'joi';

const Register = () => {
  const [userData, setuserData] = useState({
    userName: '',
    userMobileNumber: 1234567890,
    userEmail: '',
    password: '',
  });
  const navigate = useNavigate();
  const dataFill = (e: Event) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e.target.name !== 'userMobileNumber'
      ? (userData[e.target.name] = e.target.value)
      : (userData[e.target.name] = parseInt(e.target.value, 10));
    setuserData(userData);
    console.log(userData);
  };
  const postData = () => {
    axios
      .post('http://localhost:3001/ers', userData)
      .then((response) =>
        alert(`${response.data.userName} has successfully registered`)
      )
      .then((data) => navigate('/Login'))
      .catch(function (error) {
        alert('error');
      });
  };

  return (
    <div className="container">
      <p id="emotionss">Emotion</p>
      <Link to="/Login">
        <p id="logins">LOG IN</p>
      </Link>
      <Link to="/Register">
        <button type="button" id="registers">
          Register
        </button>
      </Link>

      <Form className="registerModal">
        <h3 id="registerUser">Register User</h3>
        <Form.Group className="mb-3 formG" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <br />
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="email"
            name="userEmail"
            onChange={(e) => dataFill(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 formG">
          <Form.Label>Username</Form.Label>
          <br />
          <Form.Control
            type="name"
            id="name"
            placeholder="Enter Username"
            name="userName"
            onChange={(e) => dataFill(e)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 formG" controlId="formBasicNumber">
          <Form.Label>Mobile No.</Form.Label>
          <br />
          <Form.Control
            type="tel"
            id="phone"
            placeholder="Enter Mobile Number"
            name="userMobileNumber"
            pattern="[0-9]{10}"
            onChange={(e) => dataFill(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 formG" controlId="formBasicCheckbox">
          <Form.Label>Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => dataFill(e)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={postData}>
          Register
        </Button>
      </Form>
      {/* <div className="form">
          <label>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            name="userEmail"
            required
          ></input>
          <label>Username</label>
          <input
            type="name"
            id="name"
            placeholder="Enter Username"
            name="userName"
            required
          ></input>
          <label>Mobile No.</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter Mobile Number"
            name="userMobileNumber"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            required
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            name="password"
            required
          ></input>
        </div> */}

      <span id="ellipses3">ellipse</span>
      {/* <img id="emote3" src={emote3} alt="model" />

      <h1 id="text1">
        How are you <span id="feelings">feeling</span> today?
      </h1>
      <h2 id="text2">
        I’m an emotion detection AI and I can know how you feel. I use enhanced
        algorithms to try to analyze, interpret and classify human emotion
        through the analysis of facial features.
      </h2> */}
      <img id="emotes2" src={emote2} alt="model" />
      <img id="emotes1" src={emote1} alt="model" />

      <span id="ellipses4">ellipse</span>
      {/* <img id="emote4" src={emote4} alt="model" />
      <img id="emote6" src={emote6} alt="model" /> */}

      {/* <img id="emote1" src={emote1} alt="model" />
      <img id="emote2" src={emote2} alt="model" />
      <img id="emote4" src={emote4} alt="model" />
      <img id="emote5" src={emote5} alt="model" />
      <img id="emote6" src={emote6} alt="model" /> */}
    </div>
  );
};
export default Register;
