#!/bin/bash

cd frontend && npm i && npm run dev & cd backend && docker-compose -f docker-compose.yml up -d && npm i && npm run start:dev
