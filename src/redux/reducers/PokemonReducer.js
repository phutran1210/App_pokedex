import _ from 'lodash';

const initialState = {
    pokemonFullList: [],
    pokemonUniqueList: [],
    pokemonList: [],
    pokemonListToLoad: [],
    currentPage: 1,
    pokePerPage: 8,
    loading: true,
}

const currentPokeList = (currentPage, itemPerPage, array) => {
    const indexOfLastPoke = currentPage * itemPerPage;
    const indexOfFirstPoke = indexOfLastPoke - itemPerPage;
    return array.slice(indexOfFirstPoke, indexOfLastPoke);
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "FETCH_POKEMON": {
            // const pokemonUniqueList = payload.data.filter(
            //   (obj, index, self) =>
            //     index === self.findIndex((el) => el["name"] === obj["name"])
            // );
            const pokemonUniqueList = _.uniqBy(payload.data, "name");
            console.log('pokemonUniqueList: ', pokemonUniqueList);
            const initPokemonList = currentPokeList(
                state.currentPage,
                state.pokePerPage,
                pokemonUniqueList
            );
            return {
                ...state,
                pokemonFullList: payload.data,
                pokemonListToLoad: [...pokemonUniqueList],
                pokemonUniqueList: [...pokemonUniqueList],
                pokemonList: initPokemonList,
                loading: payload.loading,
            };
        }
        case "LOAD_MORE": {
            const nextPokeList = currentPokeList(
                payload.pageNumber,
                state.pokePerPage,
                state.pokemonListToLoad
            );
            return {
                ...state,
                currentPage: payload.pageNumber,
                pokemonList: [...state.pokemonList, ...nextPokeList],
            };
        }
        case "SEARCH": {
            let searchResultList = [...state.pokemonUniqueList];
            if (payload.keyword) {
                searchResultList = state.pokemonUniqueList.filter(
                    (poke) =>
                        poke.slug.includes(payload.keyword.toLowerCase()) ||
                        poke.number.includes(payload.keyword)
                );
            }
            return {
                ...state,
                pokemonList: searchResultList.slice(0, 8),
                pokemonListToLoad: searchResultList,
                currentPage: 1,
            };
        }
        default:
            return { ...state };
    }
};