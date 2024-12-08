// src/integrations/IntegrationsPage.tsx
import React from 'react';
import CustomTable from "../shared/CustomTable.tsx";

const columns = [
    { field: 'id', headerName: 'ID', width: '200px' },
    { field: 'name', headerName: 'Name', width: '1' },
    { field: 'risk', headerName: 'Risk', width: '130px' },
];

const dataUrl = 'http://localhost:3000/integrations';

const IntegrationsPage: React.FC = () => {
    return <CustomTable columns={columns} dataUrl={dataUrl} />;
};

export default IntegrationsPage;