import React, { Component } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import _ from "lodash";

import { searchPokemonList } from "../../redux/actions/PokemonActions";
import classes from "./SearchArea.module.scss";

class SearchArea extends Component {
  state = {
    options: [],
    value: "",
  };

  renderOptionsList(value) {
    this.setState({
      options: this.props.pokemonUniqueList
        .map((poke) => poke.slug)
        .filter((name) => name.includes(value.toLowerCase()))
        .slice(0, 4)
        .map((value) => ({
          label: (
            <span
              style={{
                color: "grey",
                textTransform: "capitalize",
                fontSize: "16px",
              }}
              key={value}
            >
              {value}
            </span>
          ),
          value,
        })),
    });
  }

  shouldComponentUpdate(props, nextState) {
    return !_.isEqual(this.state, nextState) ? true : false;
  }

  render() {
    console.log("[SearchArea]");
    return (
      <div className={classes.SearchArea}>
        <div className={classes.SearchArea__Left}>
          <p className={classes.SearchArea__Title}>Name or Number</p>
          <div className={classes.SearchArea__Wrapper}>
            <AutoComplete
              options={this.state.options}
              onSearch={(value) => {
                this.renderOptionsList(value);
              }}
              onBlur={(e) => {
                let value = e.target.value;
                this.setState({
                  value,
                });
              }}
              onSelect={(value, option) => {
                if (option) {
                  this.setState({
                    options: [option],
                  });
                }
              }}
              backfill={true}
              className={classes.SearchArea__AutoComplete}
            >
              <Input
                onPressEnter={(e) =>
                {
                  this.props.dispatch(
                    searchPokemonList({ keyword: e.target.value })
                  );
                }}
              />
            </AutoComplete>
            <SearchOutlined
              onClick={() => {
                this.props.dispatch(
                  searchPokemonList({ keyword: this.state.value })
                );
              }}
              className={classes.SearchArea__Icon}
            />
          </div>
          Use the Advanced Search to explore Pokémon by type, weakness, Ability,
          and more!
        </div>
        <div className={classes.SearchArea__Right}>
          <div className={classes.SearchArea__Instructions}>
            Search for a Pokémon by name or using its National Pokédex number.
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  pokemonUniqueList: state.PokemonReducer.pokemonUniqueList,
});
export default connect(mapStateToProps)(SearchArea);
