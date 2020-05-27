FROM node:10.16.3-alpine as build

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ========= publish stage =========
FROM node:10.16.3-alpine as publish
COPY --from=build /app/ /app/
WORKDIR /app
# COPY --from=build /user/group /user/passwd /etc/
RUN npm prune --production
RUN npm install node-contrast-2.10.1.tgz --no-save
# USER nobody:nobody
EXPOSE 7070 7071
CMD ["npm", "run", "contrast"]
