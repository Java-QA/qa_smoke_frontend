# Фронтенд приложения WishList

Веб-приложение на React для управления списками желаний и подарками. Позволяет пользователям создавать списки желаний, добавлять подарки и управлять их резервированием.

## Возможности

- Аутентификация пользователей (вход/регистрация)
- Создание и управление списками желаний
- Добавление, редактирование и удаление подарков
- Резервирование подарков
- Адаптивный дизайн на основе Bootstrap
- Поддержка Docker

## Требования

- Node.js 18 или выше
- npm или yarn
- Docker (для контейнеризации)

## Установка для разработки

1. Клонируйте репозиторий
2. Установите зависимости:
```bash
npm install
```

3. Запустите сервер разработки:
```bash
npm start
```

Приложение будет доступно по адресу `http://localhost:3000`.

## Сборка для production

Для сборки приложения:

```bash
npm run build
```

## Docker

### Использование docker-compose (рекомендуется)

1. Настройте переменные окружения в `docker-compose.yml`:
```yaml
environment:
  - NODE_ENV=production
  - REACT_APP_API_URL=https://your-api-url/api
```

2. Запустите контейнер:
```bash
docker-compose up -d
```

### Ручная сборка и запуск

1. Соберите образ:
```bash
docker build -t wishlist-frontend .
```

2. Запустите контейнер:
```bash
docker run -p 80:80 -e REACT_APP_API_URL=https://your-api-url/api wishlist-frontend
```

Приложение будет доступно по адресу `http://localhost`.

## Структура проекта

- `/src/components` - Переиспользуемые React компоненты
- `/src/pages` - Компоненты страниц
- `/src/services` - Сервисы для работы с API
- `/src/types` - TypeScript интерфейсы и типы
- `/src/utils` - Вспомогательные функции

## Конфигурация

Приложение использует следующие переменные окружения:

- `REACT_APP_API_URL` - URL backend API (например, https://api.example.com/api)
- `NODE_ENV` - Окружение (development/production)

Конфигурация может быть изменена:
1. Через переменные окружения в docker-compose.yml
2. При запуске контейнера через параметры `-e`
3. Через файл `.env` при локальной разработке

## Особенности реализации

- TypeScript для типобезопасности
- React Router для маршрутизации
- Axios для HTTP-запросов
- JWT для аутентификации
- Bootstrap для UI компонентов
- Nginx для раздачи статики в production

## Разработка

1. Форкните репозиторий
2. Создайте ветку для новой функциональности
3. Внесите изменения
4. Создайте Pull Request

## Безопасность

- Не храните чувствительные данные в коде
- Используйте переменные окружения для конфигурации
- Следите за обновлениями зависимостей

## CI/CD

Проект использует GitHub Actions для автоматизации сборки и публикации Docker образов.

### Автоматические действия

- Сборка Docker образа при каждом push в main и pull request
- Публикация образа в GitHub Container Registry (ghcr.io)
- Сканирование уязвимостей с помощью Trivy
- Многоплатформенная сборка (linux/amd64, linux/arm64)

### Теги образов

- Для каждой ветки: `ghcr.io/username/wishlist-front:branch-name`
- Для каждого PR: `ghcr.io/username/wishlist-front:pr-N`
- Для тегов (релизов): 
  - `ghcr.io/username/wishlist-front:v1.2.3`
  - `ghcr.io/username/wishlist-front:1.2`
- SHA коммита: `ghcr.io/username/wishlist-front:sha-xxxxx`

### Использование опубликованного образа

```bash
docker pull ghcr.io/username/wishlist-front:latest
docker run -p 80:80 -e REACT_APP_API_URL=https://api.example.com/api ghcr.io/username/wishlist-front:latest
