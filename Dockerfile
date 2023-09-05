FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "app.js"]
EXPOSE 3000