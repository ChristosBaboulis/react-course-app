import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from "react";
import { BsFillCalendarFill } from "react-icons/bs";
import { produce } from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";

function App() {
  let items = ["New York", "San Fransisco", "Tokyo", "London"];

  const [alertVisible, setAlertVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);
  const [cartItems, setCartItems] = useState(["Product 1", "Product 2"]);
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });
  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom"],
  });

  const renderAlert = () => {
    return (
      alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>
          <strong>Holy guacamole!</strong> You should check this alert!
        </Alert>
      )
    );
  };
  const renderList = () => {
    return (
      listVisible && (
        <ListGroup
          items={items}
          heading="Cities"
          onSelectItem={handleSelectItem}
        />
      )
    );
  };

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleClick = () => {
    // vanilla way
    //setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));

    // immer way
    setBugs(
      produce((draft) => {
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  const handleClickForGame = () => {
    setGame({
      ...game,
      player: { ...game.player, name: "Nick" },
    });
  };

  return (
    <>
      <div>
        <Button onClick={() => setListVisible(!listVisible)} color="danger">
          Hide/Show List
        </Button>
      </div>
      <br></br>
      {renderList()}
      <br></br>
      <div>
        <Button onClick={() => setAlertVisible(!alertVisible)} color="danger">
          Hide/Show Alert
        </Button>
      </div>
      <br></br>
      {renderAlert()}
      <br></br>
      <BsFillCalendarFill color="red" size="40" />
      <br></br>
      <br></br>
      <Button onClick={handleClick}>Click Me </Button>
      <br></br>
      {bugs.map((bug) => (
        <p key={bug.id}>
          {bug.title} {bug.fixed ? "Fixed" : "New"}
        </p>
      ))}
      <br></br>
      <br></br>
      <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} />
      <br></br>
      <br></br>
      <Button onClick={handleClickForGame}>Change Name </Button>
      <p key={game.id}>{game.player.name}</p>
    </>
  );
}

export default App;
