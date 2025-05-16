# Используем официальный образ Node.js (версия 22)
FROM node:22

# Рабочая директория приложения
WORKDIR /app

# Копируем package.json и yarn.lock (если есть)
COPY package.json yarn.lock* ./

# Устанавливаем зависимости через Yarn
RUN yarn install 

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем переменную окружения для порта
ENV PORT=3000

# Открываем порт 
EXPOSE 3000

# Запускаем приложение через Yarn
CMD ["yarn", "start"]