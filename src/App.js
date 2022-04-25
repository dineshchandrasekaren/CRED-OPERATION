import React, { Component } from "react";

import {
  AiOutlineHeart as Outline,
  AiFillHeart as Filled,
} from "react-icons/ai";
import { addMovie, deleteMovie, likeMovie, updateMovie } from "./redux/actions";

class App extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }
  state = {
    movies: [],
    tempData: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    isEditing: false,
  };

  onDelete = (id) => {
    this.setState({ movies: deleteMovie(id) });
  };
  handleLike = (id) => {
    this.setState({ movies: likeMovie(id) });
  };
  componentDidMount() {
    this.setState({ movies: deleteMovie() });
    this.setState({
      tempData: {
        title: "",
        genre: "",
        numberInStock: "",
        dailyRentalRate: "",
      },
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let temp = {};
    temp[name] = value;
    this.setState((prev) => {
      const { movies, tempData } = prev;
      return {
        movies: [...movies],
        tempData: { ...tempData, ...temp },
      };
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { title, genre, numberInStock, dailyRentalRate } =
      this.state.tempData;
    if (!(title && genre && numberInStock && dailyRentalRate)) return;

    this.setState({ movies: addMovie(this.state.tempData) });
    this.setState({
      tempData: {
        title: "",
        genre: "",
        numberInStock: "",
        dailyRentalRate: "",
      },
    });
  };
  onEdit = (id) => {
    this.setState({
      movies: this.state.movies.map((movie) =>
        movie._id !== id ? movie : { ...movie, isEdit: true }
      ),
    });
    this.setState({ isEditing: true });
  };
  onSave = (id) => {
    const getUpdatedData = (index) =>
      this.myRef.current.childNodes[index].textContent;
    let tempData = {};
    tempData["title"] = getUpdatedData(0);
    tempData["genre"] = getUpdatedData(1);
    tempData["numberInStock"] = getUpdatedData(2);
    tempData["dailyRentalRate"] = getUpdatedData(3);

    this.setState({ movies: updateMovie(tempData, id) });
    this.setState({ isEditing: false });
  };
  render() {
    return (
      <main className="container">
        <p className="fs-4">{`Showing ${
          this.state.movies.length ? this.state.movies.length : "no"
        } movies in the Database`}</p>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col">
                <></>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="title"
                  value={this.state.tempData.title}
                  onChange={this.handleChange}
                  className="form-control"
                  disabled={this.state.isEditing}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="genre"
                  value={this.state.tempData.genre}
                  onChange={this.handleChange}
                  className="form-control"
                  disabled={this.state.isEditing}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="numberInStock"
                  value={this.state.tempData.numberInStock}
                  onChange={this.handleChange}
                  className="form-control"
                  disabled={this.state.isEditing}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="dailyRentalRate"
                  value={this.state.tempData.dailyRentalRate}
                  onChange={this.handleChange}
                  className="form-control"
                  disabled={this.state.isEditing}
                />
              </td>
              <td>
                <></>
              </td>
              <td>
                <button
                  disabled={this.state.isEditing}
                  onClick={this.handleSubmit}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </td>
            </tr>

            {this.state.movies.map((movie) => {
              return (
                <tr key={movie._id} ref={movie.isEdit && this.myRef}>
                  <td
                    name="title"
                    onChangeCapture={this.handleChange}
                    contentEditable={movie.isEdit}
                  >
                    {movie.title}
                  </td>
                  <td
                    name="genre"
                    onChangeCapture={this.handleChange}
                    contentEditable={movie.isEdit}
                  >
                    {movie.genre}
                  </td>
                  <td
                    name="numberInStock"
                    onChangeCapture={this.handleChange}
                    contentEditable={movie.isEdit}
                  >
                    {movie.numberInStock}
                  </td>
                  <td
                    name="dailyRentalRate"
                    onChangeCapture={this.handleChange}
                    contentEditable={movie.isEdit}
                  >
                    {movie.dailyRentalRate}
                  </td>
                  <td
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      !this.state.isEditing && this.handleLike(movie._id)
                    }
                  >
                    {movie.isLiked ? (
                      <Filled size={25} />
                    ) : (
                      <Outline size={25} />
                    )}
                  </td>
                  <td
                    onClick={() =>
                      !movie.isEdit
                        ? this.onEdit(movie._id)
                        : this.onSave(movie._id)
                    }
                  >
                    <button className="btn  btn-warning">
                      {movie.isEdit ? "Save" : "Edit"}
                    </button>
                  </td>
                  <td onClick={() => this.onDelete(movie._id)}>
                    <button className="btn  btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    );
  }
}

export default App;
