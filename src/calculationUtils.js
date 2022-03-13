const setDate = YMD => {
    let [Y, M, D] = YMD.split('-').map(Number)
    return new Date(Y, --M, D)
}

export const groupEmployeesByProjectID = (arrayOfEmployees) => {

    const result = arrayOfEmployees.reduce((r, [EmployeeID, ProjectID, StartDate, EndDate]) => {
        let stD = setDate(StartDate)
        let enD = EndDate ? setDate(EndDate) : new Date()
        r[ProjectID] = r[ProjectID] ?? []
        r[ProjectID].push({ EmployeeID, stD, enD })
        return r

    }, {})
    return result;
}

export const combinatePairsEmpsPerProject = (result) => {
    let Result;
    const oneDay = 24 * 60 * 60 * 1000;
    let combination = {};
    for (let proj in result) {
        for (let i = 0; i < result[proj].length - 1; i++) {
            for (let j = i + 1; j < result[proj].length; j++) {
                let employeeA = result[proj][i]
                let employeeB = result[proj][j]

                if ((employeeA.enD <= employeeB.enD && employeeA.enD > employeeB.stD)
                    || (employeeB.enD <= employeeA.enD && employeeB.enD > employeeA.stD)) {

                    let date1 = employeeA.stD > employeeB.stD ? employeeA.stD : employeeB.stD;
                    let date2 = employeeA.enD < employeeB.enD ? employeeA.enD : employeeB.enD;
                    let days = Math.ceil((date2 - date1) / oneDay);
                    let key = `${employeeA.EmployeeID}-${employeeB.EmployeeID}`;

                    combination[key] = combination[key] ?? { emA: employeeA.EmployeeID, emB: employeeB.EmployeeID, proj, sum: 0 }
                    combination[key].sum += days;
                }
            }
            Result =
                Object.entries(combination)
                    .sort((a, b) => b[1].sum - a[1].sum)
                    .map(([k, v]) => v)
        }
    }
    return Result;
}