// ---------create table---------
// users
// CREATE TABLE users (id serial, f_name text, l_name text, email text, password text, primary key (id));
// beers
// CREATE TABLE beers (id serial, user_id int references users(id), name text, brewery text, style text, memo text, untapped boolean, primary key (id));
// favorites
// CREATE TABLE favorites (id serial, user_id int references users(id), beer_id int references beers(id), primary key (id));


// ---------inner join---------
// select * from beers inner join users on beers.user_id = user.id where users.id = 4;



// insert into beers (user_id, name, brewery, style, memo, untapped) values (4, 'Johns Brown', 'Devil Craft', 'Amber Ale', 'Pretty Good', true);