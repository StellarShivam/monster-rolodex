import { useState, useEffect } from "react";
import "./App.css";
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";

const App = () => {
  const [monsterCollection, setmonsterCollection] = useState([]);
  const [searchString, setsearchString] = useState("");
  const [filteredMonster, setfilteredMonster] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((collection) => {
        console.log(collection);
        setmonsterCollection(collection);
      })
      .catch((error) => {
        console.log("error fetching the monster collection", error);
      });
  }, []);

  const onSearchChange = (event) => {
    const newSearchString = event.target.value.toLowerCase();
    setsearchString(newSearchString);
  };

  useEffect(() => {
    const newMonsterCollection = monsterCollection.filter((monster) => {
      return monster.name.toLowerCase().includes(searchString);
    });
    setfilteredMonster(newMonsterCollection);
  }, [searchString, monsterCollection]);

  return (
    <div className="App">
      <h2 className="app-title">Monsters Rolodex</h2>

      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />

      <CardList filteredMonster={filteredMonster} />
    </div>
  );
};

export default App;
