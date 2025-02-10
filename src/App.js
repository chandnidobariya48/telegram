import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import BotTable from "./componets/BotTable";
import Lending from "./componets/Lending";  // Import your Loading component
import DetailPage from "./componets/DetailPage";
// import DetailPage from "./componets/DetailPage";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000);  
  }, []);

  return (
    <Router>
      {loading ? (
        <Lending />  
      ) : (
        <Routes>
          <Route path="/" element={<Lending />} />  
          <Route path="/botTable" element={<BotTable />} />  
          <Route path="/detailPage" element={<DetailPage/>}/>
        </Routes>
      )}
    </Router>
  );
}
export default App;