import Session from "./components/session";
import Timer from "./components/timer";


function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-1 col-sm-0 col-xs-2"></div>
        <div className="col-md-10 col-sm-12 col-xs-12">
          <Session />
        </div>
      </div>
      <div className="row">
        <div className="col-md-1 col-sm-0 col-xs-0"></div>
        <div className="col-md-10 col-sm-12 col-xs-12">
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default App;
