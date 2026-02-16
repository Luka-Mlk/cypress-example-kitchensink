FROM node:20

WORKDIR /app
ENV CI=true
ENV APP_URL=http://localhost:8080/todo

COPY . .

RUN npm install

WORKDIR /app/tests

RUN npm install
RUN npx playwright install
RUN npx playwright install-deps chromium

VOLUME /app/tests/allure-result

WORKDIR /app

ENTRYPOINT ["/bin/bash", "/app/build-test-pipeline.sh"]
