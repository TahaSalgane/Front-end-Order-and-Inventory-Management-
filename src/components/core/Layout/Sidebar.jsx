import React,{useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import {AiFillDashboard,FaBoxOpen,FaBullhorn,BiChevronsRight, BiChevronsLeft,BiEdit,SiGoogleclassroom,HiUserGroup,FaSchool,HiUser ,FaCog} from "components/core/Layout/icons";
import Avatar from 'components/shared/AvatarUser';
const Sidebars = () => {
  const location = useLocation();
  const [active, setActive] = useState(null);

  const { collapseSidebar } = useProSidebar();
  const {user} = useSelector(state=>state.auth);

  const collapsed = useProSidebar().collapsed;

  let profileContent;
  if (!user.profile_image) {
    if (collapsed) {
      profileContent = (
        <div style={{ width: "60%", margin: "auto" }}>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Avatar username={user.username} />
          </div>
        </div>
      );
    } else {
      profileContent = (
        <div style={{ width: "60%", margin: "auto" }}>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Avatar size={110} username={user.username} />
            <p style={{ textAlign: "center", fontSize: "25px" }}>{user.username}</p>
          </div>
        </div>
      );
    }
  } else {
    if (collapsed) {
      profileContent = (
        <div style={{ width: "60%", margin: "auto" }}>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <img style={{ maxHeight: "40px", maxWidth: "40px" }} className="rounded-circle" src={`http://127.0.0.1:8000${user.profile_image}`} alt="Profile" />
          </div>
        </div>
      );
    } else {

      profileContent = (
      <div style={{ width: "60%", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ marginTop: "10px", marginBottom: "10px", textAlign: "center" }}>
          <img style={{ maxHeight: "150px", maxWidth: "150px" }} className="rounded-circle" src={`http://127.0.0.1:8000${user.profile_image}`} alt="Profile" />
          <p style={{ fontSize: "25px" }}>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</p>
        </div>
      </div>
      );
    }
  }
  return (
    <div>
      
      <Sidebar className  ="sidebarsss" width='200px'>
      {profileContent}
      <div className="button-container" onClick={() => collapseSidebar()}>
          {useProSidebar().collapsed ? (
            <h3><BiChevronsRight /></h3>
          ) : (
            <h1><BiChevronsLeft /></h1>
          )}
        </div>
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
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/ordres"/>}
              icon={<FaBoxOpen />}
              className={location.pathname === "/ordres" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/ordres" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Ordres
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/réclamation"/>}
              icon={<FaBullhorn />}
              className={location.pathname === "/réclamation" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/réclamation" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Réclamation
            </MenuItem>
            <SubMenu icon={<FaSchool/>} label="Etablissements">
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes/syba"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >SYBA
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes/daoudiat"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >DAOUDIAT
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes/babDokala"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >BABDOKKALA
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes/jbelKhder"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >JBELKHDER
            </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/utilisateurs"/>}
              icon={<HiUserGroup />}
              className={location.pathname === "/utilisateurs" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/utilisateurs" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Utilisateurs
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/profile"/>}
              icon={<HiUser />}
              className={location.pathname === "/profile" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/profile" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Profile
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/parametre"/>}
              icon={<FaCog />}
              className={location.pathname === "/parametre" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/parametre" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Parametre
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
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/ordres"/>}
              icon={<FaBoxOpen />}
              className={location.pathname === "/ordres" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/ordres" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Ordres
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/réclamation"/>}
              icon={<FaBullhorn />}
              className={location.pathname === "/réclamation" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/réclamation" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Réclamation
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to={`/classes/${user.etablissement}`}/>}
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
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/profile"/>}
              icon={<HiUser />}
              className={location.pathname === "/profile" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/profile" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Profile
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/parametre"/>}
              icon={<FaCog />}
              className={location.pathname === "/parametre" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/parametre" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Parametre
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
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes/syba"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >SYBA
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes/daoudiat"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >DAOUDIAT
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes/babDokala"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >BABDOKKALA
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/classes/jbelKhder"/>}
              className={location.pathname === "/classes" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/classes" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >JBELKHDER
            </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/utilisateurs"/>}
              icon={<HiUserGroup />}
              className={location.pathname === "/utilisateurs" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/utilisateurs" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Utilisateurs
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/profile"/>}
              icon={<HiUser />}
              className={location.pathname === "/profile" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/profile" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Profile
            </MenuItem>
            <MenuItem
              component={<Link onClick={() => setActive("active")}className={`${active} ?  ${active}:""`}to="/parametre"/>}
              icon={<FaCog />}
              className={location.pathname === "/parametre" ? "active" : ""}
              style={{backgroundImage:location.pathname === "/parametre" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",}}
              >Parametre
            </MenuItem>
          </React.Fragment>

           )}
        </Menu>

      </Sidebar>
    </div>
  );
};

export default Sidebars;
