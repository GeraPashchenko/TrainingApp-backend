include .env

##### command variable #####
NAME=''


##### docker compose #####

docker-logs:
	docker-compose -f docker-compose.yml up --build --remove-orphans

docker-build:
	docker-compose -f docker-compose.yml build

docker-up:
	docker-compose -f docker-compose.yml up -d --force-recreate; exit 0

docker-stop:
	docker-compose -f docker-compose.yml stop

docker-restart:
	docker-compose -f docker-compose.yml restart

docker-reload-env:
	docker-compose -f docker-compose.yml up -d

docker-up-no-demon:
	docker-compose -f docker-compose.yml up --force-recreate

docker-down:
	docker-compose -f docker-compose.yml down -v


create-migration:
	docker-compose exec app node_modules/.bin/sequelize migration:generate --name=${NAME}

run-migrations:
	docker-compose exec app node_modules/.bin/sequelize db:migrate; exit 0

undo-last-migration:
	docker-compose exec app node_modules/.bin/sequelize db:migrate:undo

undo-all-migrations:
	docker-compose exec app node_modules/.bin/sequelize db:migrate:undo:all

update-model:
	docker-compose exec app node_modules/.bin/sequelize-auto -h db -d ${DB_NAME} -u ${DB_USER} -x ${DB_PASSWORD} -e "mysql" -o "./models" -t ${NAME}

create-seed:
	docker-compose exec app node_modules/.bin/sequelize seed:generate --name ${NAME}

run-seeds:
	docker-compose exec app node_modules/.bin/sequelize db:seed:all

run-one-seed:
	docker-compose exec app node_modules/.bin/sequelize db:seed --seed ${NAME}

undo-one-seed:
	docker-compose exec app node_modules/.bin/sequelize db:seed:undo --seed ${NAME}

undo-seeds:
	docker-compose exec app node_modules/.bin/sequelize db:seed:undo:all

run-tests:
	docker-compose exec app bash -c '[ "${NODE_ENV}" == "production" ] && echo "Forbidden in production environment" || npm test'
