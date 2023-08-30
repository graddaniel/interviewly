FROM ubuntu:20.04
WORKDIR /app
COPY recordings-processor /app/recordings-processor
COPY shared /app/shared
WORKDIR /app/recordings-processor
RUN rm -rf .env
RUN apt update
RUN apt upgrade
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs
RUN apt install -y ffmpeg
RUN apt install -y janus-tools
RUN npm install -g yarn
RUN yarn global add typescript@5.1.6
RUN yarn install --production
RUN tsc
ENV NODE_ENV=production
ENTRYPOINT ["node", "dist/index.js"]