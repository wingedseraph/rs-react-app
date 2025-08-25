import CustomCursor from "@/shared/ui/CustomCursor/CustomCursor";
import Table from "@/shared/ui/Table/Table";
import Layout from "@/widgets/layout/layout";

export default function App() {
  return (
    <>
      <Layout>
        <Table>
          <thead>
            <tr>
              <th scope="col">Person</th>
              <th scope="col">Most interest in</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Chris</th>
              <td>HTML tables</td>
              <td>22</td>
            </tr>
            <tr>
              <th scope="row">Dennis</th>
              <td>Web accessibility</td>
              <td>45</td>
            </tr>
            <tr>
              <th scope="row">Sarah</th>
              <td>JavaScript frameworks</td>
              <td>29</td>
            </tr>
            <tr>
              <th scope="row">Karen</th>
              <td>Web performance</td>
              <td>36</td>
            </tr>
          </tbody>
        </Table>
        <CustomCursor />
      </Layout>
    </>
  );
}
