import React from "react";

function Pagination({ pokemonCount, pageNumber, setPageNumber }) {
  const pageSize = 10;
  const pagesCount = Math.ceil(pokemonCount / pageSize);
  var startPage = Math.max(1, pageNumber - 5);
  var endPage = Math.min(startPage + pageSize - 1, pagesCount);
  startPage = Math.max(1, endPage - pageSize + 1);

  return (
    <div>
      {pageNumber > 1 && (
        <button onClick={() => setPageNumber(pageNumber - 1)}>Prev</button>
      )}
      {Array.from({ length: pagesCount }, (_, index) => index + 1)
        .map((page, index) => {
          return (
            <button
              class={index + 1 === pageNumber ? "selected" : ""}
              key={index}
              onClick={() => setPageNumber(index + 1)}
            >
              {index + 1}
            </button>
          );
        })
        .slice(startPage - 1, endPage)}
      {pageNumber !== pagesCount && (
        <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
      )}
    </div>
  );
}

export default Pagination;
