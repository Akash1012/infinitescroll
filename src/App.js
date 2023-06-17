import { useState, useEffect, useRef } from "react";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const infiniteScroll = useRef(null);

  useEffect(() => {
    const getTheData = async () => {
      const value = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      const json = await value.json();
      const { products, total } = json;

      setData([...data, ...products]);
      setTotalPage(total / 10);
    };
    getTheData();
  }, [page]);

  const onScroll = (e) => {
    if (infiniteScroll.current) {
      const { scrollTop, scrollHeight, clientHeight } = infiniteScroll.current;

      if (scrollTop + clientHeight + 1 > scrollHeight) {
        if (page < totalPage) {
          setPage((page) => page + 1);
        }
      }
    }
  };

  return (
    <div>
      <div
        ref={infiniteScroll}
        onScroll={() => onScroll()}
        // style={{

        // }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "darkblue",
          height: "800px",
          overflow: "auto",
        }}
      >
        {data.map((item) => {
          const { id, title, thumbnail } = item;
          return (
            <div
              key={id}
              style={{
                margin: "10px",
                padding: "10px",
                backgroundColor: "grey",
              }}
            >
              <img
                src={thumbnail}
                alt={title}
                style={{
                  width: "300px",
                  height: "290px",
                  borderRadius: "10px",
                }}
              />
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
