import { Component } from 'react';
import { CardList } from './components/CardList';
import { Search } from './components/Search';
import type { AppProps, PokemonResponse } from './types/types';
import { Button } from './components/Button';

class App extends Component<AppProps> {
  state = {
    query: '',
    data: [],
    loading: true,
    error: null,
    throwError: false,
  };

  onSearch = async () => {
    const query = this.state.query || '';
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
          onClick={() => this.onSearch()}
        />
        <Button onClick={this.simulateError}>simulate error</Button>
        <CardList data={this.state.data} loading={this.state.loading} />
      </div>
    );
  }
}

export default App;
