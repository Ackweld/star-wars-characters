import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ApiService } from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { Character, Homeworld } from "../../types";

export const CharacterDetailView = () => {
  const [character, setCharacter] = useState<Character | undefined>();
  const [homeworld, setHomeworld] = useState<Homeworld | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (characterId) {
          const charResponse = await ApiService.getCharacter(
            parseInt(characterId)
          );

          if (charResponse) {
            setCharacter(charResponse);

            if (charResponse.homeworld) {
              const homeworldResponse = await ApiService.getHomeworld(
                charResponse.homeworld
              );

              if (homeworldResponse) {
                setHomeworld(homeworldResponse);
              }
            }
          }
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [characterId]);

  if (loading) {
    return <div className={styles.center}>Loading...</div>;
  }

  if (character && homeworld) {
    const { name, height, gender, birth_year } = character;
    const { name: homeworldName } = homeworld;

    return (
      <div className={styles.card}>
        <h2>{name}</h2>
        <dl>
          <dt>Height:</dt>
          <dd>{height}</dd>

          <dt>Gender:</dt>
          <dd>{gender}</dd>

          <dt>Birth Year:</dt>
          <dd>{birth_year}</dd>

          <dt>Homeworld:</dt>
          <dd>{homeworldName}</dd>
        </dl>
      </div>
    );
  }

  return <div className={styles.center}>{error}</div>;
};
