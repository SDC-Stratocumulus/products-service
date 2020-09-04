DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

\c sdc;

CREATE TABLE products
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(300) DEFAULT null,
  slogan VARCHAR(500) DEFAULT null,
  description VARCHAR(1000) DEFAULT null,
  category VARCHAR(100) DEFAULT null,
  default_price VARCHAR(20) DEFAULT null
);

  CREATE TABLE related
  (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    related_products_id INT(15) DEFAULT null
  );


  CREATE TABLE features
  (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    feature VARCHAR(500) DEFAULT null,
    value VARCHAR(500) DEFAULT null
  );

  CREATE TABLE styles
  (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(300) DEFAULT null,
    sale_price VARCHAR(20) DEFAULT null,
    original_price VARCHAR(20) DEFAULT null,
    default_style BOOLEAN DEFAULT false
  );

  CREATE TABLE photos
  (
    id SERIAL PRIMARY KEY,
    style_id INT NOT NULL,
    url VARCHAR DEFAULT null,
    thumbnail_url VARCHAR DEFAULT null
  );

  CREATE TABLE skus
  (
    id SERIAL PRIMARY KEY,
    style_id INT NOT NULL,
    size VARCHAR(100) DEFAULT null,
    quantity VARCHAR(50) DEFAULT null
  );