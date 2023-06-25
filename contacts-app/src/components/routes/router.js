import { Routes, Route } from "react-router-dom";
import Create from '../../components/body/create';
import Table from '../../components/body/table';
import NetCoreCreate from '../../components/body/netCoreCreate';
import NetCoreTable from '../../components/body/netCoreTable';

const Router = () => {
    return (<>
        <Routes>
            <Route path="/" index element={<Create />} />
            <Route path="create" element={<Create />} />
            <Route path="create/:contactId" element={<Create />} />
            <Route path="table" element={<Table />} />
            <Route path="netcorecreate" element={<NetCoreCreate />} />
            <Route path="netcorecreate/:contactId" element={<NetCoreCreate />} />
            <Route path="netcoretable" element={<NetCoreTable />} />
        </Routes>
        </>
    );

}
export default Router;