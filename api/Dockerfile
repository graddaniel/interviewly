FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn global add typescript
RUN tsc
CMD ["node", "dist/index.js"]

EXPOSE 7081