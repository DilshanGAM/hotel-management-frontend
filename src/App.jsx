import Header from "./components/header/header";
import './App.css';
import HomePage from "./pages/client-page/homePage";
import AdminPage from "./pages/adminpage/admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return(
    <BrowserRouter>

      <Routes path="/*">
        
        <Route path="/" element={<HomePage/>}/>

        <Route path="/admin/*"  element={<AdminPage/>}/>

        <Route path="/*" element={

          <div className="w-full h-[100vh] bg-green-400">
            404
          </div>

        }/>

      </Routes>


    </BrowserRouter>
 );
}

export default App;
