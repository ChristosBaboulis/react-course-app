import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from "react";
import { BsFillCalendarFill } from "react-icons/bs";
import { produce } from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/ExpenseFilter";

function App() {
  let items = ["New York", "San Fransisco", "Tokyo", "London"];
  const displayText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  // ------------------------------------------------------ STATE ------------------------------------------------------
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

  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 10, category: "Utilities" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
    { id: 4, description: "ddd", amount: 10, category: "Utilities" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  // ------------------------------------------------------ RENDER FUNCTIONS ------------------------------------------------------
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

  // ------------------------------------------------------ HANDLERS ------------------------------------------------------
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

  const handleClickForPizza = () => {
    // vanilla way
    //setPizza({ ...pizza, toppings: [...pizza.toppings, "Olives"] });

    setPizza(
      produce((draft) => {
        draft.toppings.push("Olives");
      })
    );
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;
  // ------------------------------------------------------ JSX ------------------------------------------------------
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

      <br></br>
      <br></br>
      <Button onClick={handleClickForPizza}>Add Olives </Button>
      <p>
        {pizza.name} - Toppings: {pizza.toppings.join(", ")}
      </p>

      <br></br>
      <br></br>
      <ExpandableText maxChars={10}>{displayText}</ExpandableText>
      <div></div>
      <br></br>
      <br></br>
      <div>
        <Form />
      </div>
      <br></br>
      <br></br>
      {expenses.length !== 0 && (
        <div>
          <div className="mb-3">
            <ExpenseFilter
              onSelectCategory={(category) => setSelectedCategory(category)}
            />
          </div>
          <ExpenseList
            expenses={visibleExpenses}
            onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
          />
        </div>
      )}
    </>
  );
}

export default App;
