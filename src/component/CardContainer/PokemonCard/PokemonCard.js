import React, { Component } from "react";
import classes from "./PokemonCard.module.scss";

export default class PokemonCard extends Component {
  renderPokemonType() {
    return this.props.pokemon.type.map((type) => (
      <span className={[classes.PokemonCard__Type, type].join(" ")} key={type}>
        {type}
      </span>
    ));
  }
  render() {
    return (
      <div className={classes.PokemonCard}>
        <img
          src={this.props.pokemon.ThumbnailImage}
          alt={this.props.pokemon.ThumbnailAltText}
        />
        <div className={classes.PokemonCard__Info}>
          <p className={classes.PokemonCard__Number}>
            #{this.props.pokemon.number}
          </p>
          <p className={classes.PokemonCard__Name}>{this.props.pokemon.name}</p>
          {this.renderPokemonType()}
        </div>
      </div>
    );
  }
}
