/**
 * Copyright (c) 2011-2014 DevShop http://devshop.me/
 * Released under the MIT license:
 * https://github.com/rgr-myrg/DevShop-JS/raw/master/MIT-LICENSE
 */

(function( $ ){
	$.ObjectFactory = function( $Object ) {
		if ( typeof $Object !== "object" ) {
			throw( "Object not provided" );
		}

		var getInstance = function( $Constructor ) {
			if ( typeof $Constructor === "function" ) {
				try {
					return new $Constructor();
				} catch( e ) {
				}
			} else if ( typeof $Constructor === "object" ) {
				return $Constructor;
			}
		},

		interfase = getInstance( $Object._implements_ ),
		baseclass = getInstance( $Object._extends_ ),
		singleton = getInstance( $Object._public_ );

		for ( var i in baseclass ) {
			if ( baseclass.hasOwnProperty(i) ) {
				if( !singleton[i] ) {
					singleton[ i ] = baseclass[ i ];
				}
			}
		}

		for ( i in interfase ) {
			if ( interfase.hasOwnProperty(i) ){
				if ( !singleton[i] ) {
					throw( object.instance + " must implement '" + i + "' " + typeof interfase[i] );
				}
			}
		}

		if ( typeof singleton.init === "function" ) {
			try {
				singleton.init();
			} catch( e ) {
			}
		}

		return singleton;
	};
})( DevShop );