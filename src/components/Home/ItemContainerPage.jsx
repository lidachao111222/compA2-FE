import React, { useState, useEffect } from "react";
import Item from "../Home/Item";
import ItemWithToken from "../Home/ItemWithToken";

const ItemContainerPage = () => {
  const [accessToken, setAccessToken] = useState(null);

  const accessTokenFromStorage = localStorage.getItem("accessToken");

  useEffect(() => {
    setAccessToken(accessTokenFromStorage);
  }, []);

  return (
    <>
      {accessToken === null ? (
        <>
          <Item></Item>
        </>
      ) : (
        <>
          <ItemWithToken></ItemWithToken>
        </>
      )}
    </>
  );
};

export default ItemContainerPage;
