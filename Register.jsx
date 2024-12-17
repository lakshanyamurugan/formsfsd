import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Components/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "Select your department",
    doj: "",
    role: "",
    password: "",
    confirmPassword: "",
    remarks:""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      alert("Error registering user.");
    }
  };

  return (
    
    <div class = "formsforms">
      <h1><center>Register Here!!!</center></h1>
      <form onSubmit={handleSubmit}>
      <label for="name"><b>Name</b></label>

        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        <label for="name"><b>Employee ID</b></label>
        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Employee ID" maxLength="10" required />
        <label for="name"><b>Email ID</b></label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <label for="name"><b>Phone Number</b></label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" pattern="\d{10}" required />
        <label for="name"><b>Department</b></label><br></br>
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Interns">Interns</option>
          <option value="Trainners">Trainners</option>
          </select>
          <br></br>









          
        <label for="date"><b>Date Of Join</b></label>
        
        <input type="date" name="doj" value={formData.doj} onChange={handleChange} max={new Date().toISOString().split("T")[0]} required />
        <label for="name"><b>Current Role</b></label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" required />
        <label for="password"><b>Enter Your Password </b></label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <label for="password"><b>Re enter Your Password</b></label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate("/login")}>Already have an account? Login</button>
    </div>
  );
};

export default Register;