Consumer
=============

This module provides basic state management and functions for reading Javascipt strings character-by-character
and/or with `RegExp`s.

## Install
```
npm install consumer
```

## API
```javascript
var Consumer = require('consumer');

var c = new Consumer("1234567890");
var match = c.consume(/\d/);
console.log(match);
// ["1"]

match = c.advance(1).consume(/(\d)(\d)/);
console.log(match);
// ["34","3","4"]

console.log(c.current);
// 5
console.log(c.position);
// 4
```

### Consumer(source[, start]);
Constructs a new Consumer object.

### current
Gets the character at the current index.

### position
Gets or sets the current position.

### source
Returns the `source` string.

### done
Returns true when the `position` is at the end.

### consume(regexp)
Executes the `regexp` against the `source` at the current `position`. If the match fails, null is returned and the
position is not changed.

**Note 1:** This module fiddles with the RegExp's `lastIndex` property to do the continuation matches. For it to work,
all `RegExp` objects used will be re-compiled with the `g` flag if it doesn't have one. This is a slight
performance hit- so should define them with the `g` flag to avoid it.

**Note 2:** Since continuation matching is used, **the `^` (start of input) anchor should not be used**. `consume()`
forces ALL matches start at the current `position`. To skip over something, advance the `position` by:

* manually setting the `position` property.
* calling `advance(n)`.
* or, `consume()` and discared the result.

### peek(n)
Peeks at the next `n` characters of the `source` without advancing the `position`.

### advance(n)
Advance the position ahead `n` characters.

# License
The MIT License (MIT)

Copyright (c) 2013 William Kapke

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
