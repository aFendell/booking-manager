import { useEffect, useState } from 'react';
import Layout from 'components/layout/Layout';

type Employee = {
  id: string;
  name: string;
};

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  return (
    <Layout>
      {employees ? (
        <ul>
          {employees.map((employee) => (
            <li>
              <div>{employee.name}</div>
            </li>
          ))}
        </ul>
      ) : null}
    </Layout>
  );
}

export default App;
