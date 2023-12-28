import Layout from 'components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { EmployeesAPI } from 'api/methods';

function App() {
  const {
    data: employees,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getEmployees'],
    queryFn: () => EmployeesAPI.getAllEmployees(),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <h2>An error has occurd: {error.message}</h2>;

  return (
    <Layout>
      <div>
        {!employees ? (
          <div>No employees to display</div>
        ) : (
          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                <div>{employee.name}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}

export default App;
