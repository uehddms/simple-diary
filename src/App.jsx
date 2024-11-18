import "./App.css";
import MainView from "./components/MainView";
// eslint-disable-next-line no-unused-vars
import HistoryView from "./components/HistoryView";
import react, { useEffect, useState } from "react";

function App() {
  const [view, setView] = useState("main"); //"history"

  return (
    <div className="container">
      {view === "main" && <MainView setView={setView} />}
      {view === "history" && <HistoryView setView={setView} />}
    </div>
  );
}

export default App;
