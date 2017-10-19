class MovieList extends React.Component {
  
    constructor() {
      super();
      this.state = {
        movies: []
      };
    }
  
    componentWillMount() {
      axios.get('/api/movies')
        .then((response) => {
          this.setState({
            movies: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    render() {
      let movieItems = this.state.movies.map( (movie) => {
        return <li>{ movie.title }</li>
      });
      
      return (
        <ul>
          { movieItems }
        </ul>
      );
    }
  }
  
  ReactDOM.render(
    <MovieList />,
    document.getElementById('movies')
  );