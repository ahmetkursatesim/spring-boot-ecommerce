import React, { useContext, useState } from "react";

import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Context from "../config/context";

export default function Navbar() {
  const context = useContext(Context);
  const { user} = context;
  const path = "home";
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const addProp = user ? user.admin ? (
          <Menu pointing secondary size="massive" color="teal"  style={{marginLeft:"20%"}}>
              <Menu.Item name="Ürünler" active={activeItem === "Ürünler"} onClick={handleItemClick} as={Link} to="/products"/>
              <Menu.Item name="Siparişler" active={activeItem === "Siparişler"} onClick={handleItemClick} as={Link} to="/orders"/>
          </Menu>

  ): (
      <Menu pointing secondary size="massive" color="teal"  >
          <Menu.Item name="Siparişlerim" active={activeItem === "Siparişlerim"} onClick={handleItemClick} as={Link} to="/orders"/>
          <Menu.Item name="Sepetim" active={activeItem === "Sepetim"} onClick={handleItemClick} as={Link} to="/shoppingcart"/>
      </Menu>
  ) : (
      <Menu pointing secondary size="massive" color="teal" style={{backgroundColor:"white"}}>
          <Menu.Item name="Üye Ol" active={activeItem === "Üye Ol"} onClick={handleItemClick} as={Link} to="/signin"/>
      </Menu>


  )
  const menuBar = (
      <div style={{display:"flex",margin:"auto"}}>
          {addProp}
      </div>
  );
  return menuBar;
}
