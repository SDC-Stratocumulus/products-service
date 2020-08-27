DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

\c sdc;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(300) DEFAULT null,
  slogan VARCHAR(500) DEFAULT
  description VARCHAR(1000) ,DEFAULT null,
  category_id VARCHAR(15) ,
  default_style_id INT (15),
  related_products INT[] DEFAULT mull,
);