import { Route, Routes, Navigate, useParams } from "react-router-dom";
import "./App.css";
import { CharacterDetailView, CharacterListView } from "./views";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/characters" />} />
      <Route path="/characters" element={<CharacterListView />} />
      <Route
        path="/characters/:characterId"
        element={<CharacterDetailView />}
      />
    </Routes>
  );
}

export default App;
