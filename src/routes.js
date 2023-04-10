import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SearchPage from "./pages/searchPage";
import FavoritesPage from "./pages/favoritesPage";
import AlbumsPage from "./pages/albumsPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "search",
    element: <SearchPage />,
  },
  {
    path: "favorites",
    element: <FavoritesPage />,
  },
  {
    path: "search/:id",
    element: <AlbumsPage />,
  },
]);
export { router };
