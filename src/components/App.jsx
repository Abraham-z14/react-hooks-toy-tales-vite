import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

function handleAddToy(newToy) {
  setToys((currentToys) => [...currentToys, newToy]);
}

function handleDonateToy(id) {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "DELETE",
  }).then(() => {
    setToys((currentToys) =>
      currentToys.filter((toy) => toy.id !== id)
    );
  });
}

function handleLikeToy(toy) {
  const updatedLikes = toy.likes + 1;

  fetch(`http://localhost:3001/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: updatedLikes,
    }),
  })
    .then((response) => response.json())
    .then((updatedToy) => {
      setToys((currentToys) =>
        currentToys.map((currentToy) =>
          currentToy.id === updatedToy.id ? updatedToy : currentToy
        )
      );
    });
}

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
  toys={toys}
  onDonateToy={handleDonateToy}
  onLikeToy={handleLikeToy}
/>
    </>
  );
}

export default App;