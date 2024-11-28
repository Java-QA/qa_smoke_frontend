import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { userService } from '../services/api';

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers();
                setUsers(response);
                setLoading(false);
            } catch (err) {
                setError('Не удалось загрузить список пользователей');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <Container className="mt-5">Загрузка...</Container>;
    }

    if (error) {
        return <Container className="mt-5">Ошибка: {error}</Container>;
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Пользователи</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {users.map((user) => (
                    <Col key={user.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{user.username}</Card.Title>
                                <Link 
                                    to={`/users/${user.id}/wishlists`} 
                                    className="btn btn-primary"
                                >
                                    Посмотреть списки желаний
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Users;
