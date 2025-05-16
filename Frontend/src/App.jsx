import "./App.css";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <div className="content">
          <h1>App Component</h1>
          <button>hey</button>
        </div>
      </div>
    </>
  );
}

export default App;
