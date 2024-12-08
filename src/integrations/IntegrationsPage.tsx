// src/integrations/IntegrationsPage.tsx
import React from 'react';
import CustomTable, {ColumnSchema} from "../shared/CustomTable.tsx";
import usePlatform from "../shared/usePlatforms.ts";

type Integration = {
    id: number;
    name: string;
    risk: string;
    platformId: string;
}

function PlatformRenderer({row}: { row: Integration }) {
    const {getPlatform} = usePlatform();

    const platform = getPlatform(row.platformId);

    return (
        <div>
            {platform && <img src={platform.icon} style={{width: 24, height: 24}}/>}
        </div>
    );
}

const columns: ColumnSchema<Integration>[] = [
    {field: 'id', headerName: 'ID', width: '200px'},
    {field: 'name', headerName: 'Name', width: '1'},
    {field: 'risk', headerName: 'Risk', width: '130px'},
    {field: 'platformId', headerName: 'Platform', width: '150px', cellRenderer: PlatformRenderer},
];

const dataUrl = 'http://localhost:3000/integrations';

const IntegrationsPage: React.FC = () => {
    return <CustomTable columns={columns} dataUrl={dataUrl}/>;
};

export default IntegrationsPage;