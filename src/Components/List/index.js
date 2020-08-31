import React, { useState, useEffect } from "react";
import Loading from "../Loading";

const ListContainer = () => {
  const [state, setState] = useState({
    loading: true,
    data: null
  });

  useEffect(() => {
    async function read() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10`
      );
      const result = await response.json();
      setState(prev => ({
        loading: false,
        data: result
      }));
    }
    read();
  });

  if (state.loading) {
    return <Loading />;
  }
  return <ListView data={state.data} />;
};

const ListView = ({ data }) => (
  <div>
    {data.map(item => (
      <ListItem key={item.id} {...item} />
    ))}
  </div>
);

const ListItem = ({ albumId, id, title, url, thumbnailUrl }) => (
  <div>
    <div>{albumId}</div>
    <div>{id}</div>
    <div>{title}</div>
    <div>{url}</div>
    <div>{thumbnailUrl}</div>
    <hr />
  </div>
);

export default ListContainer;
