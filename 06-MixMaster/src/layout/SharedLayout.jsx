import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function SharedLayout() {
  const navigation = useNavigation;

  if (navigation.state === "loading") {
    return (
      <main>
        <div>Chargement...</div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}

export default SharedLayout;
