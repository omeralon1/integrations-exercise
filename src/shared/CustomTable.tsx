// src/shared/CustomTable.tsx
import {ReactElement, useEffect, useState} from 'react';
import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import axios from 'axios';

export interface ColumnSchema<T> {
    field: string;
    headerName: string;
    width?: string; // Optional width property
    cellRenderer?: ({row}: { row: T }) => ReactElement;
}

interface CustomTableProps<T> {
    columns: ColumnSchema<T>[];
    dataUrl: string;
}

const CustomTable = <T, >({columns, dataUrl}: CustomTableProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<T[]>(dataUrl);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataUrl]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            {loading ? (
                <CircularProgress/>
            ) : (
                <TableContainer component={Paper} style={{maxWidth: 1024, backgroundColor: '#f0f0f0'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.field}
                                        style={column.width?.endsWith('fr')
                                            ? {flex: column.width}
                                            : {width: column.width}}>
                                        <Typography variant="h6">{column.headerName}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => {
                                        console.log('row', row)
                                            return (<TableCell key={column.field}>
                                                {column.cellRenderer ? column.cellRenderer({row}) : row[column.field]}
                                            </TableCell>)
                                        }
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default CustomTable;