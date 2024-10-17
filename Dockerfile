# pre-image of node
FROM node:20.16.0

# set working directory
WORKDIR /app

# copy package.json
COPY package.json .

# install node modules
RUN npm install

# copy source code of frontend
COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]