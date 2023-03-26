import NavBar from "./components/NavBar";
import HomePage from "./components/Body";
import "./App.css";
function App() {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-gray-100 h-screen">
      <NavBar />
      <HomePage />
    </div>
  );
}
export default App;
