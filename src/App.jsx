import Body from "./components/Body";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import store from "./app/store";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Feed />}/>
              <Route path="/connections" element={<Connections />}/>
              <Route path="/requests" element={<Requests />}/>
              <Route path="/signup" element={<SignUp />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
