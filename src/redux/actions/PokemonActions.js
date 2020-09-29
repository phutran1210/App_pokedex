import axios from "axios";
import { FETCH_POKEMON, LOAD_MORE, SEARCH } from "../types/PokemonTypes";

export const fetchPokemon = () => (dispatch) => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://www.pokemon.com/us/api/pokedex/kalos",
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: FETCH_POKEMON,
          payload: {
            data: res.data,
            loading: false,
          },
        });
      })
      .catch((error) => console.log(error));
  };
  
  export const getPokemonList = (pageNumber) => ({
    type: LOAD_MORE,
    payload: pageNumber,
  });
  
  export const searchPokemonList = (keyword) => ({
    type: SEARCH,
    payload: keyword,
  });