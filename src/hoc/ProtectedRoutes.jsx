import React,{useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "pages/Login";

const ProtectedRoutes = () => {
  const navigation = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigation("/");
    }
  }, [navigation, user]);

  return user?.isAdmin ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
