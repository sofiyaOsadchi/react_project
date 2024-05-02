import { useTheme } from "../../hooks/useTheme";
import Search from "../../routes/Search";
import Navbar from "../Navbar/Navbar";
import "./Header.scss";

function Header() {
  const {theme} = useTheme(); 
  return (
    <header className="bg-pink-800 dark:bg-gray-900 p-5 text-white text-5xl font-extralight  text-center">
      <Navbar />
      <h2 className="text-5xl text-purple-300 mt4">Tsofiya Osadchi - {theme}</h2>
     
      < Search />
    </header>
  );
}

export default Header;
