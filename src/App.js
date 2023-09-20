import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

//This main component contains routing with the 2 components 'Cats' amd 'Breeds'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          {/*creating links to nagivate to*/}
          <nav>
            <Link to="/cats" className="App-link">
              cats
            </Link>
            <Link to="/cat_breeds" className="App-link">
              breeds
            </Link>
          </nav>
          {/*All the routes with their endpoint*/}
          <Routes>
            <Route path="/cats" exact element={<Cats />} />
            <Route path="/cat_breeds" element={<Breeds />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

//First componet to navigate to
function Cats() {
  //Left side, creating a state variable called 'cats'. Right side calling state with empty array as deafault value
  const [cats, setCats] = useState([]);

  //useEffect fetching data with axios.
  useEffect(() => {
    axios
      //This endpoint contains random cat picture and limit of pictures is set to 10.
      .get("https://api.thecatapi.com/v1/images/search?limit=10")
      .then((response) => {
        console.log(response.data);
        //when data gets fetched, the response will be put in the default empty array.
        setCats(response.data);
      });
  }, []);

  return (
    <div>
      <h1>Random cats</h1>
      {cats.map((catpicture) => (
        <article>
          <img src={catpicture.url} alt="Picture of a cat"></img>
        </article>
      ))}
    </div>
  );
}

//Second componet to navigate to
function Breeds() {
  const [catBreeds, setCatBreeds] = useState([]);
  const [typeBreed, setTypeBreed] = useState("abys");
  useEffect(() => {
    axios
      .get(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${typeBreed}`
      )
      .then((response) => {
        console.log(response.data);
        setCatBreeds(response.data);
      });
  }, [typeBreed]);

  return (
    <div>
      <h1>Cat breeds</h1>
      <select onChange={(event) => setTypeBreed(event.target.value)}>
        <option value="abys">Abyssinian</option>
        <option value="acur">American Curl</option>
        <option value="beng">Bengal</option>
        <option value="char">Chartreux</option>
        <option value="hima">Himalayan</option>
        <option value="munc">Munchkin</option>
        <option value="siam">Siamese</option>
      </select>

      {catBreeds.map((breed) => (
        <article>
          <img src={breed.url} alt="Picture of a cat"></img>
        </article>
      ))}
    </div>
  );
}

export default App;
