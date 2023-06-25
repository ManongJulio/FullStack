import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
    
import DataTable from 'react-data-table-component';
import { Delete, Edit, Star, StarBorderOutlined } from '@mui/icons-material';
import { Button } from "@mui/material";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, MenuItem, FormControl, Input, Typography } from '@mui/material';
import axios from 'axios';

const NetCoreTable = () => {
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
        let index = data[data.findIndex(a => a.contactId == values.contactId)];
        values.starred = values.starred ? 0 : 1;
        axios.put('http://localhost:5000/api/controller/' + values.contactId, values).then((r) => {
            data[index] = r.data;
            const newObj = [...data];
            setData(newObj);
        }).catch(err => {
        })
    }
    useEffect(() => {
       
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
                axios.delete('http://localhost:5000/api/controller/' + id).then((r) => {
                    let newData = data.filter(a => a.contactId != id);
                    setData(newData);
                    Swal.fire('Contact has been deleted.', '', 'success');
                    setLoading(false);

                }).catch(err => {
                    setLoading(false);
                })
                //deleteData(id).then((response) => {
                //    if (response == true) {
                //        let newData = data.filter(a => a.id != id);
                //        setData(newData);
                //        Swal.fire('Contact has been deleted.', '', 'success')
                //    }
                //    setLoading(false);
                //});
            }
        })
    }
    const filteredData = (starred) => {
        filter.starred = starred;
        paginate(filter);
    }
    const searchData = (input) => {
        axios.get("http://localhost:5000/api/controller/query/" + input, { param: {query: input} })
            .then(res => {
                console.log(res);
            });
        //if (input.lenth != 0) {
        //    setLoading(true);
        //    filter.query = input;
        //    filterDataByName(filter).then((response) => {
        //        setData(response);
        //        setLoading(false);

        //    });
        //} else {
        //    return false;
        //}
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
            name: 'address',
            selector: row => row.address,
            sortable: true,
            name: 'address',

        },
        {
            name: 'contact',
            selector: row => row.contact,
            sortable: false,
            name: 'contact',

        },
        {
            name: 'starred',
            cell: (row) => {
                if (row.starred) {
                    return <Button color="success" size="small" variant="text" onClick={() => updateStarred(row)}><Star /></Button>
                } else {
                    return <Button color="primary" size="small" variant="text" onClick={() => updateStarred(row)}><StarBorderOutlined /></Button>
                }
            }
        },
        {
            name: 'action',
            cell: row => (
                <div>
                    <Button sx={{ m: 1 }} variant="contained" color="primary" size="small" onClick={() => {
                        navigate('/netcorecreate/' + row.contactId, { state: row });
                    }}><Edit /></Button>
                    <Button sx={{ m: 1 }} variant="contained" color="error" size="small" onClick={() => {
                        removeItem(row.contactId)
                    }}><Delete /></Button>
                </div>)
        },
    ];
    const handlePerRowsChange = (newPerPage, page) => {
        filter.page = newPerPage;
        paginate(filter);

    }
    const handlePageChange = (currentPage, totalRow) => {
        filter.currentPage = currentPage;
        paginate(filter);

    }
    const handleSort = debounce((column, sortDirection) => {
        filter.sortDirection = sortDirection;
        filter.field = column.name;
        paginate(filter);
    }, 500);
    const paginate = (filter) => {
        setLoading(true);
        axios.post("http://localhost:5000/api/controller/paginate", filter )
            .then(res => {
                setLoading(false);
                setData(res.data.contacts);
                setFilter({ ...filter, totalRows: res.data.totalRows })
            });
    }
    return (<>
        {/* note search function is not optimized. Firebase doesnt have wildcard query. will update if have time. */}
        <Typography variant="h5" sx={{ mb: 3 }}>.Net Core Table</Typography>

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
export default NetCoreTable;