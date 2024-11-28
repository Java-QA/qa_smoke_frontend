import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { WishList, Gift } from '../types';
import { wishListService as wishlistService, giftService } from '../services/api';

type NewGift = Omit<Gift, 'id' | 'wishListId'>;

const WishListDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [wishlist, setWishlist] = useState<WishList | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddGift, setShowAddGift] = useState(false);
    const [newGift, setNewGift] = useState<NewGift>({
        name: '',
        description: '',
        link: '',
        price: 0,
        reserved: false
    });

    useEffect(() => {
        loadWishList();
    }, []);

    const loadWishList = async () => {
        setLoading(true);
        setError('');

        if (!id) return;

        try {
            const response = await wishlistService.getWishList(id);
            setWishlist(response);
            setLoading(false);
        } catch (err) {
            setError('Ошибка при загрузке списка желаний');
            setLoading(false);
        }
    };

    const handleAddGift = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !wishlist) return;

        try {
            await giftService.createGift(id, newGift);
            setShowAddGift(false);
            setNewGift({ name: '', description: '', link: '', price: 0, reserved: false });
            await loadWishList();
        } catch (err) {
            setError('Не удалось добавить подарок');
        }
    };

    const handleReserveGift = async (giftId: string) => {
        if (!id) return;

        try {
            await giftService.toggleReserved(giftId);
            await loadWishList();
        } catch (err) {
            setError('Не удалось зарезервировать подарок');
        }
    };

    const handleDeleteWishList = async (id: string) => {
        if (!id) return;

        try {
            await wishlistService.deleteWishList(id);
            // redirect to home page or something
        } catch (err) {
            setError('Не удалось удалить список желаний');
        }
    };

    if (loading) {
        return <Container className="mt-5">Загрузка...</Container>;
    }

    if (error) {
        return <Container className="mt-5">Ошибка: {error}</Container>;
    }

    if (!wishlist) {
        return <Container className="mt-5">Список желаний не найден</Container>;
    }

    return (
        <Container className="mt-5">
            <h2>{wishlist.title}</h2>
            <p>{wishlist.description}</p>

            <Button variant="primary" onClick={() => setShowAddGift(true)} className="mb-4">
                Добавить подарок
            </Button>

            <Button variant="danger" onClick={() => handleDeleteWishList(wishlist.id.toString())} className="mb-4 ms-2">
                Удалить список
            </Button>

            <Row xs={1} md={2} lg={3} className="g-4">
                {wishlist.gifts.map((gift) => (
                    <Col key={gift.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{gift.name}</Card.Title>
                                <Card.Text>{gift.description}</Card.Text>
                                {gift.link && (
                                    <Card.Link href={gift.link} target="_blank">
                                        Ссылка на подарок
                                    </Card.Link>
                                )}
                                {gift.price && (
                                    <Card.Text>Цена: {gift.price} руб.</Card.Text>
                                )}
                                <Button
                                    variant={gift.reserved ? "secondary" : "primary"}
                                    onClick={() => handleReserveGift(gift.id.toString())}
                                    disabled={gift.reserved}
                                >
                                    {gift.reserved ? "Зарезервирован" : "Зарезервировать"}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showAddGift} onHide={() => setShowAddGift(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить подарок</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddGift}>
                        <Form.Group className="mb-3">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                value={newGift.name}
                                onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={newGift.description}
                                onChange={(e) => setNewGift({ ...newGift, description: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ссылка (необязательно)</Form.Label>
                            <Form.Control
                                type="url"
                                value={newGift.link}
                                onChange={(e) => setNewGift({ ...newGift, link: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Цена (необязательно)</Form.Label>
                            <Form.Control
                                type="number"
                                value={newGift.price}
                                onChange={(e) => setNewGift({ ...newGift, price: Number(e.target.value) })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Добавить
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default WishListDetail;
