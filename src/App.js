import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { combinatePairsEmpsPerProject,  groupEmployeesByProjectID } from './calculationUtils';
import { RenderTable } from './renderTable';

function App() {
  const [file, setFile] = useState();
  const [arrayOfEmployees, setArrayOfEmployees] = useState([]);
  const [renderTable , setRenderTable] = useState(false);
  const [combinationResult, setCombination] = useState({});
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    console.log(e.target.files[0].type);
    if( e.target.files[0].type !== "application/vnd.ms-excel"){
      alert("wrong type file , try again")
    }else {
      setFile(e.target.files[0]);
    }
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        let text = event.target.result;
        csvToArray(text);
        setRenderTable(true);
      }
    }
    fileReader.readAsText(file);
  }
  const csvToArray = (string) => {
    const employeesStr = string.slice(string.indexOf("\n") + 1).split("\n");
    let allEmployees = [];
    for (let i = 0; i < employeesStr.length; i++) {
      let eachEmployee = employeesStr[i];
      eachEmployee = eachEmployee.replaceAll(' ', "")
      eachEmployee = eachEmployee.replaceAll('NULL', '')
      eachEmployee = eachEmployee.replace(/(\r\n|\n|\r)/, "").split(",")

      if (eachEmployee != '') {
        allEmployees[i] = eachEmployee;
      }
    }
    setArrayOfEmployees(allEmployees);
  }
  useEffect(() => {
    let result = groupEmployeesByProjectID(arrayOfEmployees);
   let finalResult = combinatePairsEmpsPerProject(result)
   setCombination(finalResult)
  }, [arrayOfEmployees]);

  return (
    <div className="App">
      <form>
        <input type="file" accept='.csv' id='cvsFileInput' onChange={handleOnChange} />
        <button onClick={(e) => handleOnSubmit(e)}>IMPORT CSV</button>
      </form>
      <br />  
      {renderTable ? <RenderTable combinationResult={combinationResult}></RenderTable> : null}
    </div>
  );
}
export default App;
