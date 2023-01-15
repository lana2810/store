import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const { logOut } = useAuth();
  useEffect(() => {
    logOut();
  }, []);
};

export default Logout;
