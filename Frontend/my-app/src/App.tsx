import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import TodoPage from './pages/todoPage'
import LoginPage from './pages/loginPage';


const routes = (
  <>
  <Route path="/">
    <Route index element = {<TodoPage/>}></Route>
  </Route>
  <Route path="/login">
    <Route index element = {<LoginPage/>}></Route>
  </Route>
  </>
)
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(routes))
  return (
    <RouterProvider router = {router}></RouterProvider>
  );
};

export default App;
