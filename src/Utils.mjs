export function getBit( bytes, n ) {

	return bytes & ( 1 << n );

};

export function isUnsetBit( bytes, n ) {

	return (bytes & ( 1 << n )) === 0;

};

export function setBit( bytes, n ) {

	return bytes | ( 1 << n );

};

export function unsetBit( bytes, n ) {

	return bytes & ~( 1 << n );

};

export function clamp( value, min, max ) {

	return Math.max( min, Math.min( max, value ) );

};
