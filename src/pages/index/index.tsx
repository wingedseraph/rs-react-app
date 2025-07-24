import { CardList } from '@/components/CardList';
import { Search } from '@/components/Search';
import { CONST, type AppProps, type PokemonResponse } from '@/types';
import { Component } from 'react';

class Index extends Component<AppProps> {
  state = {
    query: localStorage.getItem(CONST.POKEMON_QUERY) ?? '',
    data: [],
    loading: true,
    error: null,
  };

  onSearch = async () => {
    const query = (this.state.query || '').trim();
    localStorage.setItem(CONST.POKEMON_QUERY, query);
    const pageSize = 5;
    this.setState({ loading: true });

    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:*${query}*&pageSize=${pageSize}`
      );
      const responseData: PokemonResponse = await response.json();

      this.setState({
        data: responseData.data,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.onSearch();
  }

  handleInputChange = (value: string) => {
    this.setState({ query: value });
  };

  render() {
    return (
      <div className="flex flex-col items-center justify-center">
        <Search
          value={this.state.query}
          onChange={this.handleInputChange}
          loading={this.state.loading}
          onClick={() => this.onSearch()}
        />
        <CardList data={this.state.data} loading={this.state.loading} />
      </div>
    );
  }
}
export default Index;
