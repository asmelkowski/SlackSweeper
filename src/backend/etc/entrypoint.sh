#!/bin/bash

/app/etc/wait-for-it.sh slack_sweeper_db:5432

echo "Runing database migrations"
python /app/manage.py migrate
echo "Populating database with slack data"
python /app/manage.py populate_db

exec "$@"