First create database

-users and buckets

    CREATE TABLE users (
    id serial primary key,
    email varchar(255),
    hashPassword varchar(255),
    groupCode varchar(255)
    );

    CREATE TABLE buckets (
    id serial primary key,
    price money,
    description varchar(255),
    date varchar(255),
    updateDate varchar(255),
    userId int references users(id)
    );

-npm install
-npm run dev
