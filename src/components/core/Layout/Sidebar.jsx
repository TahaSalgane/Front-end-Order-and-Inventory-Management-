import React,{useState} from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import { AiFillDashboard } from "react-icons/ai";
import {BiChevronsRight, BiChevronsLeft,BiTable,BiPen,BiCameraMovie,BiEdit} from "react-icons/bi";
import {SiGoogleclassroom} from "react-icons/si";
import { Link, useLocation } from "react-router-dom";

const Sidebars = () => {
  const location = useLocation();
  console.log(location.pathname);

  const [active, setActive] = useState(null);

  const { collapseSidebar } = useProSidebar();

  return (
    <div>
      <Sidebar className  ="sidebarsss" width='200px'>
        <Menu iconShape="circle">
<MenuItem
  component={
    <Link
      onClick={() => setActive("active")}
      className={`${active} ?  ${active}:""`}
      to="/dashboard"
    />
  }
  icon={<AiFillDashboard />}
  className={location.pathname === "/dashboard" ? "active" : ""}
  style={{
    backgroundImage:
      location.pathname === "/dashboard" ? "linear-gradient(to right, #000000 0%, #5c5e70b2 51%, #cac3c356 100%)" : "",
  }}
>
  Dashboard
</MenuItem>
          <MenuItem icon={<SiGoogleclassroom />}>Classes</MenuItem>
          <SubMenu icon={<BiEdit />} label="Equipment">
            <MenuItem icon={<BiTable />}>Table</MenuItem>
            <MenuItem icon={<BiCameraMovie />}>Projecteur</MenuItem>
            <MenuItem icon={<BiPen />}>Crayon</MenuItem>
          </SubMenu>
        </Menu>
        <div className='arrow-sidebar' onClick={() => collapseSidebar()} > {useProSidebar().collapsed ? (
          <h1><BiChevronsRight /></h1>
        ):  <h1> <BiChevronsLeft /></h1> } </div>
      </Sidebar>
    </div>
  );
};

export default Sidebars;
