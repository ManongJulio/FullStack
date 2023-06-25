import { FormControl, InputLabel, Input, FormHelperText, Button, Box, Snackbar,Alert } from '@mui/material/';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addData, updateData } from '../../components/firebase/firebase';
import { useState, useEffect } from 'react';
import { useParams, useLocation,useNavigate } from "react-router-dom";

const Create = () => {
    let { contactId } = useParams();
    let location = useLocation();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        email: '',
        name: '',
        contact: '',
        address: ''
    });
    const [msg, setMsg] = useState({
        open: false,
        message: "",
        severity: 0
    });
    const handleClose = () => {
        setMsg({ ...msg, open: false, message: '', severity: 0 })
    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email("Invalid email")
                .required("Required"),
            name: Yup
                .string()
                .max(30, "Must be 30 characters or less.")
                .min(5, "Must be 5 characters or more")
                .required("Required"),
            contact: Yup
                .string()
                .matches(phoneRegExp, "Contact number invalid")
                .required("Required"),
            address: Yup
                .string()
                .max(30, "Must be 50 characters or less.")
                .min(5, "Must be 5 characters or more")
                .required("Required")
        }),
        enableReinitialize: !contactId ? false : true,
        onSubmit: (values) => {
            setLoading(true);
            if (!contactId) { 
                addData(values).then((response) => {
                    setMsg({ ...msg, open: true, message: 'Contact information has been added.', severity: 0 })
                    setLoading(false);
                    //timeout for the delay
                    setTimeout(() => {
                        navigate('/table');
                    }, 3000)
                }).catch(err => {
                    console.log(err);
                    setMsg({ ...msg, open: true, message: 'Fail to add contact information', severity: 1 })

                })
               
            } else {
                updateData(values).then((response) => {
                    setMsg({ ...msg, open: true, message: 'Contact information has been modified.', severity: 0 })
                    setLoading(false);
                    //timeout for the delay
                    setTimeout(() => {
                        navigate('/table');
                    }, 3000)                }).catch(err => {
                    console.log(err);
                    setMsg({ ...msg, open: true, message: 'Fail to add contact information', severity: 1 })
                })
            }
        }
    })
    useEffect(() => {
        ifEdit();
    }, [])
    const ifEdit = () => {
        if (!contactId) return false;
        setInitialValues(location.state);
        return true;
    }
    return (<>
        { /* flexbox */}
        <form onSubmit={formik.handleSubmit} >
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            maxWidth: 500,
            p: 1,
            m: 1,
        }}> 
                <FormControl variant="standard" sx={{mb:2}}>
                    <InputLabel htmlFor="email-input" shrink>Email</InputLabel>
                    <Input id="email-input" aria-describedby="email-input"
                        type="text"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <FormHelperText id="email-input-helper-text" error >{formik.errors.email}</FormHelperText> : null}
                </FormControl>
                <FormControl variant="standard" sx={{ mb: 2 }}>
                    <InputLabel htmlFor="name-input" shrink>Name</InputLabel>
                    <Input id="name-input" aria-describedby="name-input"
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                />
                    {formik.touched.name && formik.errors.name ? <FormHelperText id="email-input-helper-text" error>{formik.errors.name}</FormHelperText> : null}
            </FormControl>

                <FormControl variant="standard" sx={{ mb: 2 }}> 
                    <InputLabel htmlFor="contact-input" shrink>Contact</InputLabel>
                    <Input id="contact-input" aria-describedby="contact-input"
                        type="text"
                        name="contact"
                        onChange={formik.handleChange}
                        value={formik.values.contact}
                        onBlur={formik.handleBlur}
                />
                    {formik.touched.contact && formik.errors.contact ? <FormHelperText id="email-input-helper-text" error>{formik.errors.contact}</FormHelperText> : null}
            </FormControl>

                <FormControl variant="standard" sx={{ mb: 2 }}>
                    <InputLabel htmlFor="address-input" shrink>Address</InputLabel>
                    <Input id="address-input" aria-describedby="address-input"
                        type="text"
                        onChange={formik.handleChange}
                        name="address"
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                />
                    {formik.touched.address && formik.errors.address ? <FormHelperText id="email-input-helper-text" error>{formik.errors.address}</FormHelperText> : null}
            </FormControl>
            <FormControl>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {!contactId ? 'Submit' : 'Edit'}
                    </Button>
            </FormControl>
            </Box>
        </form>
        <Snackbar open={msg.open} variant="filled" onClose={handleClose} anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}>
            {msg.severity == 0 ? <Alert severity="success" sx={{ width: '100%' }} >
                {msg.message}
            </Alert> : <Alert severity="error" sx={{ width: '100%' }} >
                {msg.message}
            </Alert>}
           
        </Snackbar>
        </>);
}
export default Create;