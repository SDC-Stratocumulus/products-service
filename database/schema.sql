DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

\c sdc;

CREATE TABLE products
(
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(300) DEFAULT null,
  slogan VARCHAR(500) DEFAULT null,
  product_descr VARCHAR(1000) DEFAULT null,
  category VARCHAR(100) DEFAULT null,
  default_price VARCHAR(20) DEFAULT null
);

  CREATE TABLE related
  (
    id SERIAL PRIMARY KEY,
    product_id INT(15) NOT NULL,
    related_products_id INT(15) DEFAULT null
  );


  CREATE TABLE features
  (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    feature_name VARCHAR(500) DEFAULT null,
    feature_value VARCHAR(500) DEFAULT null
  );

  CREATE TABLE styles
  (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    style_name VARCHAR(300) DEFAULT null,
    sale_price VARCHAR(20) DEFAULT null,
    price VARCHAR(20) DEFAULT null,
    default_style BOOLEAN DEFAULT false
  );

  CREATE TABLE photos
  (
    id SERIAL PRIMARY KEY,
    style_id INT(15) NOT NULL,
    full_size_url VARCHAR(1000) DEFAULT null,
    thumbnail_url VARCHAR(1000) DEFAULT null
  );

  CREATE TABLE skus
  (
    id SERIAL PRIMARY KEY,
    style_id INT(15) NOT NULL,
    size VARCHAR(100) DEFAULT null,
    quantity VARCHAR(50) DEFAULT null
  );