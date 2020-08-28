DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

\c sdc;

CREATE TABLE products
(
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(300) DEFAULT null,
  slogan VARCHAR(500) DEFAULT null,
  product_descr VARCHAR(1000) DEFAULT null,
  category_id INT(15) NOT NULL,
  related_products INTEGER[] DEFAULT []
);

  CREATE TABLE categories
  (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
  );

  CREATE TABLE features
  (
    id SERIAL PRIMARY KEY,
    product_id INT(15) NOT NULL,
    feature_name VARCHAR(500) DEFAULT null,
    feature_value VARCHAR(500) DEFAULT null
  );

  CREATE TABLE styles
  (
    id SERIAL PRIMARY KEY,
    product_id INT(15) NOT NULL,
    style_name VARCHAR(300) DEFAULT null,
    price VARCHAR(20) DEFAULT null,
    sale_price VARCHAR(20) DEFAULT null,
    on_sale BOOLEAN DEFAULT "0",
    default BOOLEAN DEFAULT "0",
  );

  CREATE TABLE photos
  (
    id SERIAL PRIMARY KEY,
    style_id INT(15) NOT NULL,
    default_photo BOOLEAN NOT NULL DEFAULT "0",
    thumbnail_url VARCHAR(500) DEFAULT null,
    full_size_url VARCHAR(500) DEFAULT null,
  );

  CREATE TABLE skus
  (
    id SERIAL PRIMARY KEY,
    style_id INT(15) NOT NULL,
    sku_by_size JSON DEFAULT null,
  );