import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { WishList } from '../types';
import { userService } from '../services/api';

const UserWishlists: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [wishlists, setWishlists] = useState<WishList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWishlists = async () => {
            if (!userId) return;
            
            try {
                const response = await userService.getUserWishlists(Number(userId));
                setWishlists(response);
                setLoading(false);
            } catch (err) {
                setError('Не удалось загрузить списки желаний');
                setLoading(false);
            }
        };

        fetchWishlists();
    }, [userId]);

    if (loading) {
        return <Container className="mt-5">Загрузка...</Container>;
    }

    if (error) {
        return <Container className="mt-5">Ошибка: {error}</Container>;
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Списки желаний пользователя</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {wishlists.map((wishlist) => (
                    <Col key={wishlist.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{wishlist.title}</Card.Title>
                                <Card.Text>{wishlist.description}</Card.Text>
                                <Link 
                                    to={`/wishlists/${wishlist.id}`} 
                                    className="btn btn-primary"
                                >
                                    Посмотреть подарки
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="mt-4">
                <Link to="/users" className="btn btn-secondary">
                    Назад к списку пользователей
                </Link>
            </div>
        </Container>
    );
};

export default UserWishlists;
