import {
  HomePage,
  AboutPage,
  ActivityInformation,
  TeacherInformation,
  RegistrationInformation,
  ContactPage,
  RegisterFulfillment,
  RegisterUploadDocument,
  RegisterPayment,
  StudentList,
  // PortfolioPage,
  // PortfolioItem,
  // NotFoundPage,
} from "./containers";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/information/activity" component={ActivityInformation} />
          <Route exact path="/information/teacher" component={TeacherInformation} />
          <Route exact path="/information/registration" component={RegistrationInformation} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/login" component={HomePage} />
          <Route exact path="/register/fulfillment" component={RegisterFulfillment} />
          <Route exact path="/register/upload-document" component={RegisterUploadDocument} />
          <Route exact path="/register/payment" component={RegisterPayment} />
          <Route exact path="/student/list" component={StudentList} />
          {/* <Route exact path="/about" component={AboutPage} />
          <Route exact path="/service" component={ServicePage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/gallery" component={GalleryPage} />
          <Route exact path="/portfolio" component={PortfolioPage} />
          <Route exact path="/portfolio/:id" component={PortfolioItem} />
          <Route path='*' component={NotFoundPage} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
