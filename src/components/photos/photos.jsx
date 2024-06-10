import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Container,
    Grid,
    Pagination,
    Box,
    CardActions,
    Button,
} from "@mui/material";
import Rolling from "@img/rolling.svg";
import { useNavigate } from "react-router-dom";
import "./photos.css";

const Photos = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://fakestoreapi.com/products?limit=${limit}&page=${currentPage}`
            )
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [currentPage, limit]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleBuyClick = (id) => {
        navigate(`/main/product/${id}`);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <img src={Rolling} alt="Loading..." />
            </Box>
        );
    }

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Products
            </Typography>
            <Grid container spacing={4}>
                {data.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}>
                            <CardMedia
                                className="cardImg"
                                component="img"
                                height="350"
                                image={item.image}
                                alt={item.title}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="p"
                                    padding={"16px"}
                                    component="div">
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary">
                                    ${item.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View
                                </Button>
                                <Button size="small" color="secondary">
                                    Wishlist
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleBuyClick(item.id)}>
                                    Buy
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={4}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                />
            </Box>
        </Container>
    );
};

export default Photos;
