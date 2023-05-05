import React,{useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import {AiFillDashboard,BiChevronsRight, BiChevronsLeft,BiEdit,SiGoogleclassroom,HiUserGroup,FaSchool} from "components/core/Layout/icons";

const Sidebars = () => {
  const location = useLocation();
  console.log(location.pathname);

  const [active, setActive] = useState(null);

  const { collapseSidebar } = useProSidebar();
  const {user} = useSelector(state=>state.auth);

  return (
    <div>
      <Sidebar className  ="sidebarsss" width='200px'>
        <Menu iconShape="circle">
        {user.role === "magasinier" && (
          <React.Fragment>
            <MenuItem
                component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/dashboard"/>}
                icon={<AiFillDashboard />}
                className={location.pathname === "/dashboard" ? "active" : ""}
                style={{backgroundImage:location.pathname === "/dashboard" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Dashboard
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/articles"/>}
              icon={<BiEdit />}
              className={location.pathname === "/articles" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/articles" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Articles
            </MenuItem>
            <SubMenu icon={<FaSchool/>} label="Etablissements">
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >ISTA
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >ENCG
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >FST
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >fssm
            </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/utilisateurs"/>}
              icon={<HiUserGroup />}
              className={location.pathname === "/utilisateurs" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/utilisateurs" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Utilisateurs
            </MenuItem>
          </React.Fragment>
           )}
          {user.role === "directeur etablissement" && (
          <React.Fragment>
            <MenuItem
                component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/dashboard"/>}
                icon={<AiFillDashboard />}
                className={location.pathname === "/dashboard" ? "active" : ""}
                style={{backgroundImage:location.pathname === "/dashboard" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Dashboard
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/articles"/>}
              icon={<BiEdit />}
              className={location.pathname === "/articles" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/articles" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Articles
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes"/>}
              icon={<SiGoogleclassroom />}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Classes
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/utilisateurs"/>}
              icon={<HiUserGroup />}
              className={location.pathname === "/utilisateurs" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/utilisateurs" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Utilisateurs
            </MenuItem>
          </React.Fragment>
           )}
           {user.role === "directeur complexe" && (
          <React.Fragment>
           <MenuItem
                component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/dashboard"/>}
                icon={<AiFillDashboard />}
                className={location.pathname === "/dashboard" ? "active" : ""}
                style={{backgroundImage:location.pathname === "/dashboard" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Dashboard
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/articles"/>}
              icon={<BiEdit />}
              className={location.pathname === "/articles" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/articles" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Articles
            </MenuItem>
            <SubMenu icon={<FaSchool/>} label="Etablissements">
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >ISTA
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >ENCG
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >FST
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >fssm
            </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/utilisateurs"/>}
              icon={<HiUserGroup />}
              className={location.pathname === "/utilisateurs" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/utilisateurs" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Utilisateurs
            </MenuItem>
          </React.Fragment>

           )}
        </Menu>
        <div className='arrow-sidebar' onClick={() => collapseSidebar()} > {useProSidebar().collapsed ? (
          <h1><BiChevronsRight /></h1>
        ):  <h1> <BiChevronsLeft /></h1> } </div>
      </Sidebar>
    </div>
  );
};

export default Sidebars;
