import React, { FormEvent, useState } from "react";

const Form = () => {
  const [person, setPerson] = useState({
    name: "",
    age: 0,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          onChange={(event) =>
            setPerson({ ...person, name: event.target.value })
          }
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age:
        </label>
        <input
          onChange={(event) =>
            setPerson({ ...person, age: parseInt(event.target.value) })
          }
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-pri" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
