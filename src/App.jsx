import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [prod, setProd] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProd = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();

    console.log(data);

    if (data && data.products) {
      setProd(data.products);
    }
  };

  useEffect(() => {
    fetchProd();
  }, []);

  const selectPageHandler = (selected) => {
    if (selected > 1 && selected <= prod.length / 10 && selected != page) {
      setPage(selected);
    }
  };
  return (
    <>
      {prod.length > 0 && (
        <div className="products">
          {prod.slice(page * 10 - 10, page * 10).map((pro) => {
            return (
              <span className="products__single" key={pro.id}>
                <img src={pro.thumbnail} alt={pro.title} />
                <span>{pro.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {prod.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>
          {[...Array(prod.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < prod.length / 10 ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </>
  );
}

export default App;
