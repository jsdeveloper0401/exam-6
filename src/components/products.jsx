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
            <Card>
                <CardMedia
                    component="img"
                    height="500"
                    image={product.image}
                    alt={product.title}
                />
                <CardContent>
                    <Typography variant="p">{product.title}</Typography>
                    <Typography variant="h6">${product.price}</Typography>
                    <Typography variant="body1" mt={2}>
                        {product.description}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Product;
