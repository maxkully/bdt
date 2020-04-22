Big Data Technology App
=======================

## Setup

```shell script
git clone project
cd project
cp .env.dist .env
cp apps/back/app/config/parameters.yml.dist apps/back/app/config/parameters.yml
docker-compose build --no-cache --force-rm
docker-compose up
```

### Troubleshooting

```shell script
docker-compose config
docker-compose ps
docker-compose run --rm bdt.db mysql -u <USERNAME> -p<PASSWORD> <DBNAME>
```

users
INT id
VARCHAR(600) email
VARCHAR (30) password
SMALLINT state
TIMESTAMP cdate

indexes: email

subscribers
INT id
VARCHAR(15) phone
VARCHAR(2) locale
SMALLINT state
TIMESTAMP cdate

indexes: fname, lname, phone, state, cdate

services
INT id
VARCHAR(200) title
VARCHAR(1000) description
SMALLINT state
TIMESTAMP cdate
indexes: title, cdate

subscribers_services
INT id
INT subscriber_id
INT service_id
TIMESTAMP cdate
indexes: subscriber_id (fk), service_id(fk)

logs
id
user_id
entity
entity_id (polymorph)
action
cdate
indexes: user_id (fk), entity_id, action, cdate


composer config --global --auth github-oauth.github.com <github_personal_token>
https://github.com/settings/tokens

$ mkdir -p config/jwt
$ openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
$ openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout

### TODO List
#### FrontEnd

* Improve auth process
* Improve logging
* Improve phone input
* Validation to all
