import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Box,
} from "@mui/material";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Container style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <Box display="flex" justifyContent="center">
                <Card sx={{ maxWidth: 450 }}>
                    <CardMedia
                        className="cardImg"
                        component="img"
                        sx={{
                            width: "400px",
                            height: "400px",
                            objectFit: "contain",
                            padding: "25px",
                            margin: "0 auto",
                            color:"error"
                        }}
                        image={product.image}
                        alt={product.title}
                    />
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{
                                maxWidth: "400px",
                                margin: "0 auto",
                                wordWrap: "break-word",
                                textAlign: "center",
                            }}>
                            {product.title}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                maxWidth: "400px",
                                margin: "0 auto",
                                wordWrap: "break-word",
                                textAlign: "center",
                            }}>
                            ${product.price}
                        </Typography>
                        <Typography
                            variant="body1"
                            mt={2}
                            sx={{
                                maxWidth: "400px",
                                margin: "0 auto",
                                wordWrap: "break-word",
                                textAlign: "center",
                                display: "-webkit-box",
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>
                            {product.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Product;
