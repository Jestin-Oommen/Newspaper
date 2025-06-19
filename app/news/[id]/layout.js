import Footer from "../../../components/Footer";
import { Navbar } from "../../../components/NavBar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}