import styles from './renderTable.module.css'

const TableHeader = () => {
    const headers = ["EmployeeID #1", "EmployeeID #2", "ProjectID", "Days worked"];
    return (
        <thead>
          <tr key="header">
            {headers.map((key) => (
              <th key={key} className={styles.header}>{key}</th>
            ))}
          </tr>
        </thead>
    )
}

const TableBody = (props) => {
    return (
        <tbody>

        {
          Object.keys(props.combinationResult).map((key) => {
            const el = props.combinationResult[key];
            return (
              <tr key={el.emA} className={styles.infoRow}>
                <th className={styles.cell}>{el.emA}</th>
                <th className={styles.cell}>{el.emB}</th>
                <th className={styles.cell}>{el.proj}</th>
                <th className={styles.cell}>{el.sum}</th>
              </tr>
            )
          })}
      </tbody>
    )
}

export const RenderTable = (props) => {
    return (
      <table className={styles.table}>
        <TableHeader></TableHeader>
        <TableBody combinationResult={props.combinationResult}></TableBody>
      </table>
    )

  }

