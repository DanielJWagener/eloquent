function chessBoard(size: number): void {
  let oddRow = "";
  let evenRow = "";

  for (let i = 0; i < size; i++) {
    if (!oddRow || oddRow[i - 1] === "#") {
      oddRow += " ";
    } else {
      oddRow += "#";
    }

    if (!evenRow || evenRow[i - 1] === " ") {
      evenRow += "#";
    } else {
      evenRow += " ";
    }
  }

  let rowNumber = 1;
  while (rowNumber <= size) {
    console.log(rowNumber % 2 ? oddRow : evenRow);
    rowNumber++;
  }
}

chessBoard(8);
