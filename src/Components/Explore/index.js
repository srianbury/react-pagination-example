import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../Loading";

const START_KEY = "start";
const LIMTIT_KEY = "limit";
const TOTAL_COUNT_HEADER_KEY = "x-total-count";
const TOTAL_COUNT_INDEX = 1;

const ListContainer = () => {
  const query = new URLSearchParams(useLocation().search);
  const start = query.get(START_KEY);
  const limit = query.get(LIMTIT_KEY);

  const [state, setState] = useState({
    totalCount: null,
    data: null
  });
  const [pageInfo, setPageInfo] = useState({
    start,
    limit
  });

  function handlePageInfoChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setPageInfo(prev => ({
      ...prev,
      [key]: value
    }));
  }

  useEffect(() => {
    async function read() {
      setState(prev => ({
        ...prev,
        data: null
      })); // show that were loading new data
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
      );
      const result = await response.json();
      let totalCount = null;
      for (let pairs of response.headers) {
        if (pairs.includes(TOTAL_COUNT_HEADER_KEY)) {
          totalCount = pairs[TOTAL_COUNT_INDEX];
        }
      }

      setState(prev => {
        if (prev.totalCount === null) {
          return { totalCount, data: result };
        }
        return { ...prev, data: result };
      });
    }
    setPageInfo({
      start,
      limit
    });
    read();
  }, [start, limit]);

  return (
    <div>
      <PageController
        {...pageInfo}
        handlePageInfoChange={handlePageInfoChange}
        totalCount={state.totalCount}
      />
      <ListView data={state.data} />
    </div>
  );
};

const PageController = ({ start, limit, handlePageInfoChange, totalCount }) => (
  <div>
    <div>
      Start:{" "}
      <input name="start" value={start} onChange={handlePageInfoChange} />
    </div>
    <div>
      Limit:{" "}
      <input name="limit" value={limit} onChange={handlePageInfoChange} />
    </div>
    <div>
      <Link to={`/explore?start=${start}&limit=${limit}`}>Go</Link>
    </div>
    {totalCount !== null && Number(start) + Number(limit) < totalCount ? (
      <div>
        <Link
          to={`/explore?start=${Number(start) + Number(limit)}&limit=${limit}`}
        >
          Next
        </Link>
      </div>
    ) : null}
    {start > 0 ? (
      <div>
        <Link
          to={`/explore?start=${Math.max(
            Number(start) - Number(limit),
            0
          )}&limit=${limit}`}
        >
          Prev
        </Link>
      </div>
    ) : null}
    <hr />
  </div>
);

const ListView = ({ data }) => (
  <div>
    {data === null ? (
      <Loading />
    ) : (
      <>
        {data.map(item => (
          <ListItem key={item.id} {...item} />
        ))}
      </>
    )}
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
