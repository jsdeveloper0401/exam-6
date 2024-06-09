import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
const status =["inprog", "complete","pending","open"]
const UserModal = ({ open, toggle, addCar, status }) => {
    const [car, setCar] = useState({
        status: status || "",
        brand: "",
        color: "",
        price: "",
        year: "",
    });

    useEffect(() => {
        setCar((prevCar) => ({
            ...prevCar,
            status: status || "",
        }));
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prevCar) => ({
            ...prevCar,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        addCar(car);
        setCar({
            status: status || "",
            brand: "",
            color: "",
            price: "",
            year: "",
        });
    };

    return (
        <Dialog open={open} onClose={toggle}>
            <DialogTitle>Add Car</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Status"
                    name="status"
                    type="text"
                    fullWidth
                    value={car.status}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Brand"
                    name="brand"
                    type="text"
                    fullWidth
                    value={car.brand}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Color"
                    name="color"
                    type="text"
                    fullWidth
                    value={car.color}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    name="price"
                    type="text"
                    fullWidth
                    value={car.price}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Year"
                    name="year"
                    type="date"
                    fullWidth
                    value={car.year}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={toggle} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserModal;
