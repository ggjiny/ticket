import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/index";
import MainPage from "./views/MainPage/MainPage";
import DetailPage from "./views/DetailPage/DetailPage";
import LoginPage from "./views/LoginPage/LoginPage";
import SignUpPage from "./views/SignUpPage/SignUpPage";
import InterworkPage from "./views/InterworkPage/InterworkPage";
import ExternalPage from "./views/ExternalPage/ExternalPage";
import ReviewHome from "./views/ReviewPage/ReviewHome";
import PartsHome from "./views/PartsPage/PartsHome";
import ReviewRegister from "./views/ReviewPage/ReviewRegister";
import "antd/dist/antd.css";
import "./App.css";
import Calendar from "./views/MyPage/Calendar";
import MyPage from "./views/MyPage/MyPage";
import UserPage from "./views/MyPage/UserPage";
import SearchPage from "./views/DetailPage/SearchPage";
import Kakao from "./views/LoginPage/Kakao";

import ChatPage from "./views/ChatPage/ChatPage";

import "antd/dist/antd.css";
import "./App.css";
import MyReview from "./views/ReviewPage/MyReview";
import ReviewModify from "./views/ReviewPage/ReviewModify";

function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      {/* <Router> basename="/"> */}
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:showId" element={<DetailPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/interwork" element={<InterworkPage />} />
          <Route path="/external/:siteName" element={<ExternalPage />} />
          <Route path="/review/:hallId" element={<ReviewHome />} />
          <Route path="/parts" element={<PartsHome />} />
          <Route path="/review/:hallId/register" element={<ReviewRegister />} />
          <Route path="/review/:hallId/modify" element={<ReviewModify />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/userpage/:id" element={<UserPage />} />
          <Route path="/search/:inputValue" element={<SearchPage />} />
          <Route path="/oauth/redirect" element={<Kakao />} />
          <Route path="/chat/:partId" element={<ChatPage />} />

          <Route path="/myreview" element={<MyReview />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
