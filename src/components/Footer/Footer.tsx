import { useTheme } from "../../hooks/useTheme";
import Navbar from "../Navbar/Navbar";

function Footer() {
  const { toggle } = useTheme();
  return (
    <footer className="bg-pink-800 dark:bg-gray-900 md:bg-pink-800 p-5 text-white text-5xl font-extralight  text-center">
     {/*  <button onClick={() => toggle()}>Click me</button> */}
      Footer
      <Navbar />
    </footer>
  );
}

export default Footer;
