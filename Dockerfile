FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/app

ARG BASE_URL
ARG SUPABASE_URL
ARG SUPABASE_PUBLIC_ANON_KEY
ARG SUPABASE_KEY_SERVICE_ROLE
ARG EMAIL
ARG EMAIL_PASSWORD
ARG JWT_PUBLIC_KEY
ARG DISCORD_GUILD_ID
ARG DISCORD_TOKEN
ARG DISCORD_CLIENT_ID
ARG BOT_TOKEN

COPY package*.json ./

COPY . .

RUN npm install


ENV PORT=8000

ENV BASE_URL=$BASE_URL
ENV SUPABASE_URL=$BASE_URL
ENV SUPABASE_PUBLIC_ANON_KEY=$SUPABASE_PUBLIC_ANON_KEY
ENV SUPABASE_KEY_SERVICE_ROLE=$SUPABASE_KEY_SERVICE_ROLE
ENV EMAIL=$EMAIL
ENV EMAIL_PASSWORD=$EMAIL_PASSWORD
ENV JWT_PUBLIC_KEY=$JWT_PUBLIC_KEY
ENV DISCORD_GUILD_ID=$DISCORD_GUILD_ID
ENV DISCORD_TOKEN=$DISCORD_TOKEN
ENV DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID
ENV BOT_TOKEN=$BOT_TOKEN


EXPOSE 8000

CMD ["npm", "start"]