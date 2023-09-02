import React, { useEffect, useState } from "react";

function index() {
  const [message, setMessage] = useState(["Loading..."]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:80/api/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && data.message) {
          setMessage(data.message);
          setPeople(data.people);
        } else {
          setMessage("Unexpected response format");
        }
      });
  }, []);

  return (
    <div>
      <div>{message}</div>

      {people.map((person, index) => {
        <div key={index}>{person}</div>;
      })}
    </div>
  );
}

export default index;
