import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
    fetchPokemon,
    getPokemonList,
} from "../../redux/actions/PokemonActions";

import PokemonCard from "./PokemonCard/PokemonCard";
import spinner from "../../assests/img/pokemon-ball.png";
import classes from "./CardContainer.module.scss";

class CardContainer extends Component {
    componentDidMount() {
        this.props.dispatch(fetchPokemon());
    }

    renderPokemon = () =>
        this.props.pokemonList.map((item, index) => (
            <PokemonCard key={index} pokemon={item}></PokemonCard>
        ));

    readMoreHanler = () => {
        this.props.dispatch(
            getPokemonList({ pageNumber: this.props.currentPage + 1 })
        );
    };

    shouldComponentUpdate(nextProps) {
        return _.isEqual(this.props, nextProps) ? false : true;
    }

    render() {
        console.log("[CardContainer]");
        return (
            <div className={classes.CardContainer}>
                {this.props.loading ?
                    (
                        <div className={classes.CardContainer__Wrapper}>
                            {<img src={spinner} alt="spinner"></img>}
                        </div>
                    )
                    :
                    (
                        !_.isEmpty(this.props.pokemonList) ?
                            (
                                <div className={classes.CardContainer__Wrapper}>
                                    {this.renderPokemon()}

                                    {Math.ceil(this.props.pokemonListToLoad.length / 8) ===
                                        this.props.currentPage ? null : (
                                            <div className={classes.CardContainer__Button}>
                                                <button onClick={this.readMoreHanler}>Load more Pokémon</button>
                                            </div>
                                        )}
                                </div>
                            )
                            :
                            (
                                <div className={classes.CardContainer__Wrapper}>
                                    <div className={classes.CardContainer__NoPokemon}>
                                        <p>No Pokémon Matched Your Search!</p>
                                        <span>Try these suggestions to find a Pokémon:</span>
                                        <ul>
                                            <li>Reduce the number of search parameters</li>
                                            <li>Search for only one Pokémon type at a time</li>
                                            <li>Try multiple body sizes and shapes</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                    )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let {
        pokemonList,
        pokemonListToLoad,
        currentPage,
        loading,
    } = state.PokemonReducer;
    return { pokemonList, pokemonListToLoad, currentPage, loading };
};
export default connect(mapStateToProps)(CardContainer);
