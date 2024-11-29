#!/bin/sh

# Заменяем API_URL в config.js
sed -i "s|API_URL: '.*'|API_URL: '$REACT_APP_API_URL'|" /usr/share/nginx/html/config.js

# Запускаем nginx
nginx -g 'daemon off;'
