import React from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
// import { FaScrewdriver } from 'react-icons/fa';
import { AiFillDashboard } from "react-icons/ai";
import {BiChevronsRight, BiChevronsLeft,BiTable,BiPen,BiCameraMovie,BiEdit} from "react-icons/bi";
import {SiGoogleclassroom} from "react-icons/si";
// import { Link } from 'react-router-dom';

const Sidebars = () => {
  const { collapseSidebar } = useProSidebar();
  console.log(useProSidebar().collapsed )
  return (
    <div>
<Sidebar className="sidebarsss" width='200px'>
        <Menu iconShape="circle">
          <MenuItem active={window.location.pathname === "/dasboard/"} icon={<AiFillDashboard />}>Dashboard</MenuItem>
          <MenuItem icon={<SiGoogleclassroom />}>Classes</MenuItem>
          <SubMenu icon={<BiEdit />} label="Equipement">
          <MenuItem icon={<BiTable />}>Table</MenuItem>
          <MenuItem icon={<BiCameraMovie />}>Projecteur</MenuItem>
          <MenuItem icon={<BiPen />}>crayon</MenuItem>
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
