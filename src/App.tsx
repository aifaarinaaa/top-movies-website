import { Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
import Movies from "./Pages/Movies/Movies";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="/Movies" element={<Movies />} />
      <Route path="moviedetails/:id" element={<MovieDetails />}></Route>
    </Routes>
  );
}

export default App;
