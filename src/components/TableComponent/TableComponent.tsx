import styles from './tableComponent.module.css';

type TableProps<T> = {
  columns: readonly { title: string; field: keyof T }[];
  data: T[];
};

export const TableComponent = <T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th className={styles.th} key={index}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr className={styles.tr} key={index}>
            {columns.map((col) => (
              <td className={styles.td} key={String(col.field)}>
                {String(row[col.field])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
