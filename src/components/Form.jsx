import './form.css';
import React, { useState } from 'react';
import Popup from './Popup';

export default function Form() {
  let infos = {
    name: '',
    phone: '',
    age: '',
    employee: false,
    salary: '',
  };
  const [informations, setInformations] = useState(infos);
  //const [wasValidated, setWasValidated] = useState(false);
  const [allValided, setAllValided] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const updatedInformations = {
      ...informations,
      [e.target.name]: e.target.value,
    };

    setInformations(updatedInformations);

    // Dynamically calculate validation state
    const isInvalid =
      updatedInformations.name.length < 2 ||
      updatedInformations.phone.length !== 10 ||
      updatedInformations.age < 18 ||
      updatedInformations.age > 100 ||
      updatedInformations.salary === '';

    setAllValided(isInvalid);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //setWasValidated(true);
    setShowPopup(true);
    console.log('showPopup after submit:', showPopup); // Debugging
    setAllValided(true);
  };
  return (
    <>
      <div className="form1">
        <h1>Requesting a Loan</h1>
        <hr />
        <form
          onSubmit={handleSubmit}
          //   className={wasValidated ? 'was-validated' : ''}
        >
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={informations.name}
            onChange={handleChange}
            minLength={2}
            required
          />
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            pattern="\d{10}"
            id="phone"
            name="phone"
            value={informations.phone}
            onChange={handleChange}
            onInput={(e) => {
              e.target.value.length > 10
                ? (e.target.value = e.target.value.slice(0, 10))
                : null; // Limit to 10 digits
              e.target.value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
            }}
            required
          />
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            min="18"
            max="100"
            value={informations.age}
            onChange={handleChange}
            required
          />
          <label htmlFor="empoyee"> Are you an employee ?</label>
          <input
            type="checkbox"
            id="yes"
            name="employee"
            checked={informations.employee}
            value={true}
            onChange={(e) => {
              setInformations({
                ...informations,
                employee: e.target.checked,
              });
            }}
          />
          <label htmlFor="salary">Salary</label>
          <select
            name="salary"
            id="salary"
            value={informations.salary}
            onChange={handleChange}
            required
          >
            <option value="">--Select your salary--</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
            <option value="3000">3000</option>
            <option value="4000">4000</option>
            <option value="5000">5000</option>
          </select>
          <button type="submit" disabled={allValided} onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
      <Popup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        informations={informations}
        setInformations={setInformations}
        infos={infos}
      />
    </>
  );
}
