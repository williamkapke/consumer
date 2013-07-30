/*!
 * Consumer
 * Copyright(c) 2013 William Wicks (wjwicks@gmail.com)
 * MIT Licensed
 */


/**
 * Initialize `Consumer` with the given `source`.
 *
 * @param {String} source
 * @param {Number} [start=0]
 */
module.exports = function Consumer(source, start){
	Object.defineProperty(this, "source", {
		get: function(){
			return source;
		}
	})
	this.position = start || 0;
}


Consumer.prototype = {
	/**
	 * Get the character at the current position.
	 * @returns {String}
	 */
	get current(){
		return this.source[this.position];
	},

	/**
	 * Advances the position `n` characters.
	 * @param {Number} n
	 */
	advance: function(n){
		this.position+=n;
		return this;
	},

	/**
	 * Consume the characters matched by the 'regex'.
	 * @param {RegExp} regex
	 */
	consume: function(regex){
		//if it isn't global, `exec()` will not start at `lastIndex`
		if(!x.global)
			x.compile(x.source, flags(x));
		x.lastIndex = this.position;
		var m = x.exec(this.source);
		if(m) this.position += m[0].length;
		return m;
	},


	/**
	 * Peek at the source without consuming any characters.
	 * @param {RegExp|Number} x
	 */
	peek: function(x){
		return this.source[this.position+x];
	}
};

/**
 * @param {RegExp} regex
 */
function flags(regex){
	return regex.multiline && regex.ignoreCase? "gim":
			regex.multiline? "gm": regex.ignoreCase? "gi": "g";
}

