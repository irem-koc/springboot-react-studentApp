import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const Student = () => {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [students, setStudents] = React.useState([])
    React.useEffect(() => {
        fetch("http://localhost:8080/student/getAll").
            then(response => response.json()).
            then(data => setStudents(data))
    }, [students])

    const handleSubmit = (e) => {
        e.preventDefault();
        const student = { name, address }
        console.log(student);
        fetch("http://localhost:8080/student/add",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            }).then(() => {
                console.log("New student is added!");
            })
        setAddress("")
        setName("")
    }
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Add Student</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth id="outlined-basic" label="Student Name" variant="outlined" />
                    <TextField value={address} onChange={(e) => setAddress(e.target.value)} fullWidth id="outlined-basic" label="Student Address" variant="outlined" />
                </Box>
                <Button variant="contained" color="error" onClick={handleSubmit}>
                    Submit
                </Button>
            </Paper>
            <h1 color="primary" level="h1">Students</h1>
            <Paper elevation={3} style={paperStyle}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Id</b></TableCell>
                            <TableCell align="right"><b>Name</b></TableCell>
                            <TableCell align="right"><b>Address</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Paper>
        </Container>

    );
}
export default Student;