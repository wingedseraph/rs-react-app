import { Component } from 'react';
import { Button } from './components/Button';
import { CardList } from './components/CardList';
import { Search } from './components/Search';
import { CONST, type AppProps, type PokemonResponse } from './types/types';

class App extends Component<AppProps> {
  state = {
    query: localStorage.getItem(CONST.POKEMON_QUERY) ?? '',
    data: [],
    loading: true,
    error: null,
    throwError: false,
  };

  onSearch = async () => {
    const query = this.state.query || '';
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

  simulateError = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('ErrorBoundary');
    }

    return (
      <div className="flex flex-col items-center justify-center">
        <Search
          value={this.state.query}
          onChange={this.handleInputChange}
          loading={this.state.loading}
          onClick={() => this.onSearch()}
        />
        <Button className="bg-red-500" onClick={this.simulateError}>
          simulate error
        </Button>
        <CardList data={this.state.data} loading={this.state.loading} />
      </div>
    );
  }
}

export default App;
