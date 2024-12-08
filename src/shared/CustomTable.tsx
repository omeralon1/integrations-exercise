// src/shared/CustomTable.tsx
import {useEffect, useState} from 'react';
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

interface ColumnSchema {
    field: string;
    headerName: string;
    width?: string; // Optional width property
}

interface CustomTableProps {
    columns: ColumnSchema[];
    dataUrl: string;
}

const CustomTable = <T, >({columns, dataUrl}: CustomTableProps) => {
    const [data, setData] = useState<any[]>([]);
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
                                            ? { flex: column.width }
                                            : { width: column.width }}>
                                        <Typography variant="h6">{column.headerName}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.field}>{row[column.field]}</TableCell>
                                    ))}
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