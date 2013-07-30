Consumer
=============

This module provides basic state management and functions for reading Javascipt strings character-by-character
and/or with `RegExp`s.

## Install
```
npm install consumed
```

# API
```javascript
var Consumer = require('consumer');

var c = new Consumer("1234567890");
console.log(c.consume(/\d/));
// ["1"]
console.log(c.consume(/\d\d/));
// ["2","3"]
```

## Consumer(source[, start]);
Constructs a new Consumer object.

## current
Gets the character at the current index.

## position
Gets or sets the current position.

## source
Returns the `source` string.

## consume(regexp)
Executes the `regexp` against the `source` at the current `position`. If the match fails, the position is not changed.

## peek(n)
Gets the next `n` characters of the `source` starting at the current `position`.

## advance(n)
Advance the position ahead `n` characters.
