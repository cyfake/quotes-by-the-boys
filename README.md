# Quotes by the Boys

A Discord bot made (primarily) to quote memorable things said by the boys.

## Usage

The actions you can currently perform in your Discord server are:

- _Adding new quotes_
- _Getting any quote said by any user_
- _Getting any quote said by a specific user_
- _Getting a specific quote said by a specific user_
- _Deleting a quote_

### Adding a new quote

1. **Right click** on the message containing the text you want to quote in the future.
2. Hover over `Apps`, then click on `Add a new quote`.

![Demonstration of adding a new quote to the database](/qbtbdemogif.gif)

An ephemeral message will be sent to you by the bot once the quote has been successfully added.

### Getting a random quote

```
/randomquote
```

Get a random quote said by anyone on the database.

### Getting a random quote said by a specific user

```
/randomquoteby user
```

Get a random quote said by a specific user, of username `user`.

The `user` field can be chosen from a list of users currently in the database.

### Getting a specific quote said by a specific user

```
/quote user quote
```

Get a specific quote of value `quote` said by a specific user of username `user` .

Both the `user` and `quote` fields can be chosen from a list of users and quotes currently in the database.

### Deleting a quote

```
/deletequote quote
```

Delete a specific quote of value `quote`.

The `quote` field can be chosen from a list of quotes currently in the database.

## Built With

- [Discord.js](https://discord.js.org/) - Node.js module used to interact with the Discord API.
- [Sequelize](https://sequelize.org/) - ORM used to store the quotes and users in the SQLite database.

## Acknowledgements

- The creation of this project was inspired by my friends after having said a few memorable things in our Discord server.
