import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

const UserModal = ({ open, toggle, addCar, status }) => {
    const [carDetails, setCarDetails] = useState({
        brand: "",
        color: "",
        price: "",
        year: "",
        status: status,
    });

    useEffect(() => {
        setCarDetails((prevDetails) => ({
            ...prevDetails,
            status: status,
        }));
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleAddCar = () => {
        addCar(carDetails);
        setCarDetails({
            brand: "",
            color: "",
            price: "",
            year: "",
            status: status,
        });
    };

    return (
        <Dialog open={open} onClose={toggle}>
            <DialogTitle>Add Car</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Brand"
                    type="text"
                    fullWidth
                    name="brand"
                    value={carDetails.brand}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Color"
                    type="text"
                    fullWidth
                    name="color"
                    value={carDetails.color}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    type="text"
                    fullWidth
                    name="price"
                    value={carDetails.price}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    type="date"
                    fullWidth
                    name="year"
                    value={carDetails.year}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={carDetails.status}
                        onChange={handleChange}>
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="inprog">InProg</MenuItem>
                        <MenuItem value="complete">Complete</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggle} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAddCar} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserModal;
