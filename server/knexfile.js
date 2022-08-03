module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'cap_users',
    charset: 'utf8',
  }
};

/* note: 

for some reason knex wasn't recognizing the setup when it 
was in the development object I had to put the connection 
object outside and remove the development object 

*/