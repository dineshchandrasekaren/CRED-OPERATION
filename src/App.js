import React, { Component } from "react";
import { data } from "./data";
import {
  AiOutlineHeart as Outline,
  AiFillHeart as Filled,
} from "react-icons/ai";
class App extends Component {
  state = {
    movies: [...data],
  };
  onDelete = (id) => {
    let movies = this.state.movies;
    movies = movies.filter((mov) => mov._id !== id);
    this.setState({ movies });
  };
  handleLike = (id) => {
    let movies = this.state.movies;
    movies[id].isLiked = !movies[id].isLiked;

    this.setState({ movies });
  };

  render() {
    return (
      <main className="container">
        <p className="fs-4">{`Showing ${
          this.state.movies.length ? this.state.movies.length : "no"
        } movies in the Database`}</p>
        {this.movies()}
      </main>
    );
  }

  movies() {
    return (
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map((movie, i) => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td onClick={() => this.handleLike(i)}>
                  {movie.isLiked ? <Filled size={20} /> : <Outline size={20} />}
                </td>
                <td onClick={() => this.onDelete(movie._id)}>
                  <button className="btn  btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default App;
