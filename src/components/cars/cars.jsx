import React, { useState } from "react";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import {
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from "@mui/material";
import { Edit, Delete, Info } from "@mui/icons-material";
import UserModal from "../modal";

const Cards = () => {
    const [cars, setCars] = useState([]);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentCar, setCurrentCar] = useState(null);
    const [currentStatus, setCurrentStatus] = useState("");
    const [statusAddAnother, setStatusAddAnother] = useState("");

    const openModal = (status) => {
        setCurrentStatus(status);
        setModal(true);
    };

    const openEditModal = (car) => {
        setCurrentCar(car);
        setEditModal(true);
    };

    const deleteCar = (id) => {
        setCars(cars.filter((car) => car.id !== id));
    };

    const updateCar = () => {
        setCars(
            cars.map((car) => (car.id === currentCar.id ? currentCar : car))
        );
        setEditModal(false);
        setCurrentCar(null);
    };

    const addCar = (car) => {
        setCars([...cars, { ...car, id: nanoid(), status: car.status }]);
        setModal(false);
        setStatusAddAnother((prev) => ({
            ...prev,
            [car.status]: true,
        }));
    };

    const filteredCars = cars.filter((car) =>
        Object.values(car).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const names = ["open", "pending", "inprog", "complete"];

    return (
        <>
            <UserModal
                open={modal}
                toggle={() => setModal(false)}
                addCar={addCar}
                status={currentStatus}
            />
            <Dialog open={editModal} onClose={() => setEditModal(false)}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Status"
                        type="text"
                        fullWidth
                        value={currentCar?.status || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                status: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Brand"
                        type="text"
                        fullWidth
                        value={currentCar?.brand || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                brand: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Color"
                        type="text"
                        fullWidth
                        value={currentCar?.color || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                color: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="text"
                        fullWidth
                        value={currentCar?.price || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                price: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Year"
                        type="date"
                        fullWidth
                        value={currentCar?.year || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                year: e.target.value,
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setEditModal(false)}
                        color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={updateCar} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="container">
                <Grid container spacing={3}>
                    {names.map((status) => (
                        <Grid item xs={12} sm={6} md={3} key={status}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {status}
                                    </Typography>
                                    {filteredCars
                                        .filter((car) => car.status === status)
                                        .map(
                                            ({
                                                id,
                                                status,
                                                brand,
                                                color,
                                                price,
                                                year,
                                            }) => (
                                                <div key={id}>
                                                    <Typography color="text.secondary">
                                                        {brand}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Color: {color}
                                                        <br />
                                                        Price: {price}
                                                        <br />
                                                        Year: {year}
                                                    </Typography>
                                                    <CardActions>
                                                        <IconButton
                                                            color="warning"
                                                            onClick={() =>
                                                                openEditModal({
                                                                    id,
                                                                    status,
                                                                    brand,
                                                                    color,
                                                                    price,
                                                                    year,
                                                                })
                                                            }>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton
                                                            color="error"
                                                            onClick={() =>
                                                                deleteCar(id)
                                                            }>
                                                            <Delete />
                                                        </IconButton>
                                                        <NavLink
                                                            to="single-car"
                                                            state={{
                                                                car: {
                                                                    id,
                                                                    status,
                                                                    brand,
                                                                    color,
                                                                    price,
                                                                    year,
                                                                },
                                                            }}
                                                            className="btn btn-primary">
                                                            <Info />
                                                        </NavLink>
                                                    </CardActions>
                                                </div>
                                            )
                                        )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => openModal(status)}>
                                        {statusAddAnother[status]
                                            ? "Add Another Car"
                                            : "Add Car"}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Cards;
