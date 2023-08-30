FROM node:18-alpine
WORKDIR /app
COPY api /app/api
COPY shared /app/shared
WORKDIR /app/api
RUN rm -rf .env
RUN yarn global add typescript@5.1.6
RUN yarn install --production
RUN tsc
ENV NODE_ENV=production
ENTRYPOINT ["node", "dist/index.js"]

EXPOSE 7081