import { DELETE, ISLIKE, ADD, UPDATE } from "./actionType";
const movies = [
  {
    _id: "gvnzew4eh6d87v",
    title: "Terminator",
    genre: "Action",
    numberInStock: 6,
    isLiked: false,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    isEdit: false,
  },
  {
    _id: "stur65r8bokh9g",
    title: "Die Hard",
    genre: "Action",
    numberInStock: 5,
    isLiked: false,
    dailyRentalRate: 2.5,
    isEdit: false,
  },
  {
    _id: "yddhfgxiktz798g",
    title: "Get Out",
    genre: "Thriller",
    numberInStock: 8,
    isLiked: false,
    dailyRentalRate: 3.5,
    isEdit: false,
  },
  {
    _id: "mlkájháxd5",
    title: "Trip to Italy",
    genre: "Comedy",
    numberInStock: 7,
    isLiked: false,
    dailyRentalRate: 3.5,
    isEdit: false,
  },
  {
    _id: "ghhcgfi8z8cf5z",
    title: "Airplane",
    genre: "Comedy",
    numberInStock: 7,
    isLiked: false,
    dailyRentalRate: 3.5,
    isEdit: false,
  },
  {
    _id: "ds45ujnn8ddrtfzcd",
    title: "Wedding Crashers",
    genre: "Comedy",
    numberInStock: 7,
    isLiked: false,
    dailyRentalRate: 3.5,
    isEdit: false,
  },
  {
    _id: "ktt8se44szfgnz",
    title: "Gone Girl",
    genre: "Thriller",
    numberInStock: 7,
    isLiked: false,
    dailyRentalRate: 4.5,
    isEdit: false,
  },
  {
    _id: "45tzdtzdzi6r",
    title: "The Sixth Sense",
    genre: "Thriller ",
    numberInStock: 4,
    isLiked: false,
    dailyRentalRate: 3.5,
    isEdit: false,
  },
  {
    _id: "gfkdgkztt",
    title: "The Avengers",
    genre: "Action",
    numberInStock: 7,
    isLiked: false,
    dailyRentalRate: 3.5,
    isEdit: false,
  },
];
export function reducer(state = movies, action) {
  switch (action.type) {
    case DELETE:
      return state.filter((m) => m._id !== action.payload.id);
    case ADD:
      return [...state, action.payload];
    case ISLIKE:
      return state.map((m) =>
        m._id !== action.payload.id ? m : { ...m, isLiked: !m.isLiked }
      );
    case UPDATE:
      return state.map((m) =>
        m._id !== action.payload.id ? m : { ...m, ...action.payload }
      );
    default:
      return state;
  }
}
