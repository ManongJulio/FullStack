import { useEffect, useState, useCallback } from 'react';
import  debounce  from 'lodash.debounce';

import {
    fetchData,
    deleteData,
    updateData,
    filterData,
    filterDataByName, paginate, countRows
} from '../../components/firebase/firebase';
import DataTable from 'react-data-table-component';
import { Delete, Edit, Star, StarBorderOutlined } from '@mui/icons-material';
import { Button } from "@mui/material";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, MenuItem, FormControl, Input } from '@mui/material';


const Table = () => {
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        page: 10,
        totalRows: 50,
        query: '',
        field: 'name',
        starred: 2,
        currentPage: 1,
        sortDirection: 'asc'
    });
    const updateStarred = (values) => {
        let index = data[data.findIndex(a => a.id == values.id)];
        index = {
            ...index,
            starred: index.starred ? 0 : 1
        }
        updateData(index).then((response) => {
            if (response == true) {
                let obj = data[data.findIndex(a => a.id == values.id)] = index;
                const newObj = [...data];
                setData(newObj);

            }
        });
    }
    useEffect(() => {
        //fetchData(filter).then((result) => {
        //    setData(result);
        //});
       
        countRows().then((r) => {
            setFilter({ ...filter, totalRows: r._data.count.integerValue })
        })
    }, []);
    const removeItem = (id) => {
        Swal.fire({
            title: 'Do you want to delete the contact?',
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            setLoading(true);

            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteData(id).then((response) => {
                    if (response == true) {
                        let newData = data.filter(a => a.id != id);
                        setData(newData);
                        Swal.fire('Contact has been deleted.', '', 'success')
                    }
                    setLoading(false);
                });
            }
        })
    }
    const filteredData = (starred) => {
        filter.starred = starred;
        setLoading(true);

        filterData(filter).then((response) => {
            setData(response);
            setLoading(false);

        });
    }
    const searchData = (input) => {
        if (input.lenth != 0) {
            setLoading(true);
            filter.query = input;
            filterDataByName(filter).then((response) => {
                setData(response);
                setLoading(false);

            });
        } else {
            return false;
        }
    }
    const handleText = debounce((e) => {
        setFilter({ ...filter, query: e });
        searchData(e)
    }, 1000)
    const columns = [
        
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,
            id: 'name',

        },
        {
            name: 'email',
            selector: row => row.email,
            sortable: true,
            id: 'email',

        },
        {
            name: 'contact',
            selector: row => row.contact,
            sortable: true,
            name: 'contact',

        },
        {
            name: 'address',
            selector: row => row.address,
            sortable: true,
            name: 'address',

        },
        {
            name: 'starred',
            cell: (row) => {
                if (row.starred) {
                    return <Button color="success" size="small" variant="text" onClick={() => updateStarred(row) }><Star /></Button>
                } else {
                    return <Button color="primary" size="small" variant="text" onClick={() => updateStarred(row)}><StarBorderOutlined /></Button>
                }
            }
        },
        {
            name: 'action',
            cell: row => (
                <div>
                    <Button sx={{m:1}} variant="contained" color="primary" size="small" onClick={() => {
                        navigate('/create/' + row.id, { state: row });
                    }}><Edit /></Button>
                    <Button sx={{ m: 1 }}  variant="contained" color="error" size="small" onClick={() => {
                        removeItem(row.id)
                    }}><Delete /></Button>
                </div>)
        },
    ];
    const handlePerRowsChange = (newPerPage, page) => {
        setLoading(true);
        filter.page = newPerPage;
        paginate(filter).then((res) => {
            setData(res);
            setLoading(false);
        });
    }
    const handlePageChange = (currentPage, totalRow) => {
        filter.currentPage = currentPage;
        setLoading(true);
        paginate(filter).then((res) => {
            setData(res);
            setLoading(false);

        });
    }
    const handleSort = debounce((column, sortDirection) => {
        filter.sortDirection = sortDirection;
        filter.field = column.name;
        setLoading(true);
        paginate(filter).then((res) => {
            setData(res);
            setLoading(false);
        });
    }, 500);
    return (<>
        {/* note search function is not optimized. Firebase doesnt have wildcard query. will update if have time. */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel shrink>Search by name</InputLabel>
            <Input
                type="text"
                name="name"
                onChange={(e) => {
                    handleText(e.target.value);
                }}
            />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }} shrink>
            <InputLabel>Filter</InputLabel>
            <Select
                onChange={(e) => {
                    filteredData(e.target.value)
                }}
                value={filter.starred}
                name="filter"
            >
                <MenuItem value={1}>Starred</MenuItem>
                <MenuItem value={0}>Not Starred</MenuItem>
                <MenuItem value={2}>All</MenuItem>
            </Select>
        </FormControl>
       
        <DataTable
            columns={columns}
            data={data}
            sortServer
            persistTableHead
            onSort={handleSort}
            defaultSortAsc={true}
            defaultSortFieldId={filter.field}

            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={filter.totalRows}
            onChangeRowsPerPage={(newPerPage, page) => { handlePerRowsChange(newPerPage, page) }}
            onChangePage={(currentPage, totalRow) => { handlePageChange(currentPage, totalRow) }}
            
        />
       
    </>)
}
export default Table;