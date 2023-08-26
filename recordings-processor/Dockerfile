FROM node:18-alpine
WORKDIR /app
COPY api /app/recordings-processor
WORKDIR /app/recordings-processor
RUN rm -rf .env
RUN yarn global add typescript
RUN yarn install --production
RUN tsc
ENV NODE_ENV=production
ENTRYPOINT ["node", "dist/index.js"]