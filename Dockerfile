FROM node:18-alpine
WORKDIR /app
COPY ./app/ .
RUN npm install --omit=dev
RUN npm run build
CMD ["npm", "start"]