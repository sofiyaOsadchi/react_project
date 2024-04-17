import { useTheme } from "../../hooks/useTheme";
import Search from "../../routes/Search";
import Navbar from "../Navbar/Navbar";
import "./Header.scss";

function Header() {
  const {theme} = useTheme(); 
  return (
    <header className="bg-pink-800 dark:bg-gray-900 p-5 text-white text-5xl font-extralight  text-center">
      <h2 className="text-5xl text-purple-300">Tsofiya Osadchi - {theme}</h2>
      <Navbar />
      < Search />
    </header>
  );
}

export default Header;
