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
var Consumer = module.exports = function Consumer(source, start){
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
		if(!regex.global)
			regex.compile(regex.source, flags(regex));
		regex.lastIndex = this.position;
		var m = regex.exec(this.source);

		//all matches must start at the current position.
		if(m && m.index!=this.position){
			return null;
		}

		if(m) this.position += m[0].length;
		return m;
	},


	/**
	 * Returns true when the position is at the end.
	 */
	get done(){
		return this.position>=this.source.length;
	},


	/**
	 * Peek at the source without consuming any characters.
	 * @param {Number} howmany
	 */
	peek: function(howmany){
		if(howmany===1)
			return this.source[this.position+howmany];
		return this.source.substr(this.position, howmany);
	}
};

/**
 * @param {RegExp} regex
 */
function flags(regex){
	return regex.multiline && regex.ignoreCase? "gim":
			regex.multiline? "gm": regex.ignoreCase? "gi": "g";
}


