import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import { extractNumberFromString } from "../../helpers/helpers";
import { Character, Characters } from "../../types";
import { Button } from "../../ui";
import styles from "./styles.module.css";

export const CharacterListView = () => {
  const [characters, setCharacters] = useState<Characters | null>(null);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (pageNr: number) => {
    try {
      const response = await ApiService.getCharacters(pageNr);
      if (response) {
        setCharacters(response);
      }
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = (targetPage: number) => {
    return (
      characters &&
      (targetPage < 1 || targetPage > Math.ceil(characters.count / pageSize))
    );
  };

  const savePage = () => {
    localStorage.setItem("page", page.toString());
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    setLoading(true);

    localStorage.setItem("page", newPage.toString());
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    if (savedPage) {
      setPage(Number(savedPage));
    } else {
      localStorage.setItem("page", "1");
    }

    fetchData(page);
  }, [page]);

  if (loading) {
    return <div className={styles.center}>Loading...</div>;
  }

  if (characters) {
    return (
      <div className={styles.characterList}>
        <h2>STAR WARS CHARACTERS</h2>
        {characters.results.map((character: Character, index: number) => (
          <Link
            key={index}
            to={`/characters/${extractNumberFromString(character.url)}`}
            className={styles.characterListItem}
            onClick={savePage}
          >
            {character.name}
          </Link>
        ))}
        <div className={styles.buttonsContainer}>
          <Button
            label="Previous"
            onClick={() => changePage(page - 1)}
            disabled={isButtonDisabled(page - 1) || false}
          />

          <div>
            Page {page}/{Math.ceil(characters.count / pageSize)}
          </div>

          <Button
            label="Next"
            onClick={() => changePage(page + 1)}
            disabled={isButtonDisabled(page + 1) || false}
          />
        </div>
      </div>
    );
  }
  return <div className={styles.center}>{error}</div>;
};
