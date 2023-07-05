FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn global add typescript
RUN tsc
CMD ["node", "NODE_ENV=production dist/index.js"]

EXPOSE 7081