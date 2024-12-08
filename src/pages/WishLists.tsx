import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { WishList, WishListDto } from '../types';
import { wishListService } from '../services/api';

const WishLists: React.FC = () => {
    const [wishLists, setWishLists] = useState<WishList[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newWishList, setNewWishList] = useState<WishListDto>({ title: '' });
    const [error, setError] = useState('');

    const loadWishLists = async () => {
        try {
            const data = await wishListService.getCurrentUserWishLists();
            setWishLists(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Не удалось загрузить списки желаний');
        }
    };

    useEffect(() => {
        loadWishLists();
    }, []);

    const handleCreateWishList = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await wishListService.createWishList(newWishList);
            setShowModal(false);
            setNewWishList({ title: '' });
            loadWishLists();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Не удалось создать список желаний');
        }
    };

    const handleDeleteWishList = async (id: string) => {
        try {
            await wishListService.deleteWishList(id);
            loadWishLists();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Не удалось удалить список желаний');
        }
    };

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Мои списки желаний</h2>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Создать новый список
                </Button>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
                {wishLists.map((wishList) => (
                    <Col key={wishList.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{wishList.title}</Card.Title>
                                <Card.Text>{wishList.description}</Card.Text>
                                <Card.Text>
                                    <small className="text-muted">
                                        {wishList.gifts.length} подарков
                                    </small>
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/wishlists/${wishList.id}`}>
                                        <Button variant="primary">Просмотр</Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteWishList(wishList.id.toString())}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать новый список желаний</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateWishList}>
                        <Form.Group className="mb-3">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                value={newWishList.title}
                                onChange={(e) =>
                                    setNewWishList({ ...newWishList, title: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Описание (необязательно)</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={newWishList.description || ''}
                                onChange={(e) =>
                                    setNewWishList({ ...newWishList, description: e.target.value })
                                }
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                                Отмена
                            </Button>
                            <Button variant="primary" type="submit">
                                Создать
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default WishLists;
