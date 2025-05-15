import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      results {
        id
        name
        image
      }
      info {
        next
        prev
      }
    }
  }
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const CharacterCard = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CharacterImage = styled.img`
  width: 100%;
  height: auto;
`;

interface Character {
  id: string;
  name: string;
  image: string;
}

const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page, name },
  });

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar personagens.</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CharacterGrid>
        {data.characters.results.map((character: Character) => (
          <CharacterCard key={character.id}>
            <Link to={`/character/${character.id}`}>
              <CharacterImage src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </Link>
          </CharacterCard>
        ))}
      </CharacterGrid>
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!data.characters.info.prev}
        >
          Anterior
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!data.characters.info.next}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
