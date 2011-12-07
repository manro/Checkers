using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Checkers_MVC.Models
{
    /// <summary>
    /// Summary description for Board
    /// </summary>
    [Serializable]
    public class Board
    {
        //Fields
        private byte[,] whiteCheckers;
        private byte[,] blackCheckers;
        private byte[] whiteKings;
        private byte[] blackKings;
        private byte cells;
        private byte minCells = 4;
        private byte maxCells = 10;

        //Constructors
        public Board(byte cells = 8)
        {
            this.cells = ((cells < minCells) ? minCells : ((cells > maxCells) ? maxCells : cells));
            this.cells = (byte)(((this.cells & 1) != 0) ? this.cells + 1 : this.cells);

            whiteCheckers = newBoard(true);
            blackCheckers = newBoard(false);
            whiteKings = new byte[(this.cells / 2) * ((this.cells-1) / 2)];
            blackKings = new byte[(this.cells / 2) * ((this.cells - 1) / 2)];
        }

        //Methods
        private byte[,] newBoard(bool white = true)
        {
            byte[,] board = new byte[this.cells, this.cells];

            int rows = ((this.cells & 1) == 0 ? (this.cells / 2) - 1 : (this.cells - 1) / 2);
            for (int i = 0 + ((white) ? 0 : this.cells - rows); i < ((white) ? rows : this.cells); i++)
                for (int j = 0; j < this.cells; j++)
                {
                    board[i, j] = 0;
                    if ((i + j) % 2 == 1)
                    {
                        board[i, j] = (byte)(i * this.cells + j + 1);
                    }
                }
            return board;
        }

        //Properties
        public byte[,] WhiteCheckers
        {
            get { return whiteCheckers; }
            set { whiteCheckers = value; }
        }
        public byte[,] BlackCheckers
        {
            get { return blackCheckers; }
            set { blackCheckers = value; }
        }
    }
}