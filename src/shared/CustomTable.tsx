import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';

export interface ColumnSchema<T> {
    field: keyof T;
    headerName: string;
    width?: string;
}

interface CustomTableProps<T> {
    columns: ColumnSchema<T>[];
    dataUrl: string;
    enableSearch?: boolean;
}

const CustomTable = <T, >({columns, dataUrl, enableSearch = false}: CustomTableProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<T[]>(dataUrl, {
                    params: {
                        search: searchQuery || undefined
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataUrl, searchQuery]);

    const handleSearch = () => {
        setSearchQuery(searchTerm);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh">
            {enableSearch && (
                <Box display="flex" mb={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Box>
            )}
            {loading ? (
                <CircularProgress/>
            ) : (
                <TableContainer component={Paper} style={{maxWidth: 1024, backgroundColor: '#f0f0f0'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.field.toString()}
                                        style={column.width?.endsWith('fr')
                                            ? {flex: column.width}
                                            : {width: column.width}}>
                                        <Typography variant="h6">{column.headerName}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.field.toString()}>{String(row[column.field])}</TableCell>
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