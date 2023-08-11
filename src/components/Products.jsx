import React, { useEffect, useState } from "react";

// https://dummyjson.com/docs/products

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePageChange = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <>
      <div style={{ display: loading ? "none" : "block" }}>
        {products && (
          <div className="grid grid-cols-3 text-center gap-10 my-10">
            {products.map((product) => (
              <div className="flex flex-col justify-self-center items-center border-4 border-gray-300 w-80">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="object-cover h-60 w-60"
                />
                <div className="my-2">{product.title}</div>
              </div>
            ))}
          </div>
        )}

        {products ? (
          <div className="flex gap-2 justify-center mb-10">
            <button
              style={{ display: page === 1 ? "none" : "inline" }}
              className="border border-black w-10 h-10 hover:bg-slate-300"
              onClick={() => handlePageChange(page - 1)}
            >
              ◀️
            </button>
            {[...Array(totalPages)].map((_, i) => {
              return (
                <button
                  key={i}
                  className={`border border-black w-10 h-10 hover:bg-slate-300 ${
                    page === i + 1
                      ? `bg-slate-300 text-blue-500 font-bold`
                      : `bg-white`
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              );
            })}
            <button
              style={{ display: page === totalPages ? "none" : "inline" }}
              className="border border-black w-10 h-10 hover:bg-slate-300"
              onClick={() => handlePageChange(page + 1)}
            >
              ▶️
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {loading && (
        <div className="flex justify-center items-center text-xl font-extrabold w-screen h-screen">
          Loading...
        </div>
      )}
    </>
  );
};

export default Products;
