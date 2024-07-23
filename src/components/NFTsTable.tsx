import React from 'react';
import { useTable } from 'react-table';

const NFTsTable = ({ NFTs, onSellNFT }: any) => {
  const data = React.useMemo(() => NFTs, [NFTs]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
      },
      {
        Header: 'TokenId',
        accessor: 'tokenId',
      },
      {
        Header: 'Collection',
        accessor: 'pack.name',
      },
      {
        Header: 'Action',
        Cell: ({ row }: any) => (
          <button
            className="btn btn-primary"
            onClick={() => onSellNFT(row.original)}
          >
            Sell NFT
          </button>
        ),
      },
    ],
    [onSellNFT]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="table table-dark table-striped">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} key={cell.column.id}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default NFTsTable;
