Big Data Technology App
=======================

## Stack

* FrontEnd: https://github.com/react-boilerplate/react-boilerplate (React, Redux, Saga)
* BackEnd: Symfony 4.4
* MySQL
* Nginx (proxy)
* Redis (caching, locking)

## Setup

#### Backend

```shell script

# Install project
git clone project
cd project

# prepare configuration
cp .env.dist .env
cp apps/back/api/.env.dist apps/back/api/.env

# you can change default RSA keys (optional for dev)
openssl genpkey -out apps/back/api/config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
openssl pkey -in apps/back/api/config/jwt/private.pem -out apps/back/api/config/jwt/public.pem -pubout

# build containers
docker-compose build --no-cache --force-rm
# start containers
docker-compose up
# docker-compose up -d
# install dependencies
# some composer libraries requires personal github token
# how to: https://github.com/settings/tokens
docker-compose exec bdt.back composer config --global --auth github-oauth.github.com <github_personal_token>
docker-compose exec bdt.back composer install
# prepare database
docker-compose exec bdt.back php bin/console doctrine:schema:create
# prepare fixtures
docker-compose exec bdt.back bin/console hautelook:fixtures:load -n
docker-compose exec bdt.back bin/console fos:user:create admin admin@bdt.com admin
# execute consumer for gathering action log
docker-compose exec bdt.back bin/console messenger:consume async

docker-compose exec bdt.back bin/console hautelook:fixtures:load -n
```

#### Frontend

```shell script
# go to frontend path
cd apps/front
yarn install
yarn start

# open http://localhost:3000
# sign in by admin@bdt.com admin
```

### Troubleshooting

```shell script
docker-compose config
docker-compose ps
# when docker-compose down use `docker-compose run --rm <container>`
docker-compose exec bdt.back tail -f api/var/log/dev.log
docker-compose logs -f bdt.back
docker-compose logs -f bdt.front
docker-compose exec bdt.db mysql -u <USERNAME> -p<PASSWORD> <DBNAME>
docker-compose exec bdt.redis redis-cli monitor
```

### Database Structure

users
INT id
VARCHAR(600) email
VARCHAR (30) password
SMALLINT state
TIMESTAMP cdate

indexes: email

#### subscribers
INT id
VARCHAR(15) phone
VARCHAR(2) locale
SMALLINT state
TIMESTAMP cdate

indexes: fname, lname, phone, state, cdate

#### services
INT id
VARCHAR(200) title
VARCHAR(1000) description
SMALLINT state
TIMESTAMP cdate
indexes: title, cdate

#### subscribers_services
INT id
INT subscriber_id
INT service_id
indexes: subscriber_id (fk), service_id (fk)

#### logs
Structure

* `id`
* `user_id`
* `entity`
* `entity_id`
* `action`
* `cdate`

Indexes:
 
* user_id (fk)
* entity, entity_id
* action
* cdate

### TODO List

#### Environment

* Make `prod` compilation

#### FrontEnd

* Fix notifications policy
* Improve auth process
* Improve logging
* Improve phone input
* Improve validation
* Complete localization
* Fix layouting bugs (jumps, scrolls etc)
* Make tables responsive
* Make landing page
* Sticky footer

#### Backend

* Remove fos_users table (overloading functionality) / using it for quick start with jwt auth
* Implement common exception handler
* Improve testing code coverage
* Make locales for services table (creating `locale_services` table with `iso2`, `title`, `service_id` fields)
* Use rabbitmq for messaging instead of redis
* Complete workflow setup

#### Fixtures

* Resolve problem with password generation for fos_user
* Resolve problem with uniqueness constraint when fixtures loaded

#### Benchmarking

* Dedicated server with docker installation
* Up to 30 million records fixtures generator
* Configure JMeter for perform tests for back and front 

#### Cache

* Warming up cache
* Partially invalidate cache

#### Monitor

* Sentry or analogs (error reporting on both sides)
* API availability
* Frontend availability
* MySql availability
* Redis availability
* Slow query log
