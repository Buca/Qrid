import Cell from './Cell.mjs';

class Qrid {

	constructor({ cell, block, grid }) {

		this.cell = cell;

		this.group = {
			iW: 5,
			iH: 5
		};
		
		this.block = {
			iW: 2000,
			iH: 2000
		};

		this.grid = {
			iW: 1000,
			iH: 1000
		};

		this.anchor = {
			x: 0,
			y: 0
		};

		this.blocks = new Map();

		this.collection = {
			cell: new Map()
		};

	};

	insert( item, minX, minY, maxX, maxY ) {

		// Fixing the AABB coordinates:
		minX = Math.min( minX, maxX );
		minY = Math.min( minY, maxY ); 
		maxX = Math.max( minX, maxX );
		maxY = Math.max( minY, maxY );

		// Go through each cell:
		Cell.forEach( 

			/* Context: */		
			this,
			/* Geometry: */ 	
			minX, minY, maxX, maxY, 
			/* Create inactive block: */  
			false, 
			/* Ignore inactive groups: */ 
			false, 
			/* Ignore inactive cell: */	  
			false, 

			/* Handler: */
			( /* Indices: */ b, g, c ) => {

				// Set bit to 1:
				Cell.setByIndices( this, b, g, c );

				// Calculate id:
				const id = Cell.idByIndices( this, b, g, c );
				
				// Get the Cell collection:
				let collection = this.collection.cell.get( id );

				// If the collection doesn't exist, then create a new one:
				if( collection === undefined ) {

					// Create and set the collection:
					this.collection.cell.set( id, collection = new Set() );

				}

				// Add items to the collection:
				collection.add( item );

		});

	};

	query( minX, minY, maxX, maxY ) {

		// Fixing the AABB coordinates:
		minX = Math.min( minX, maxX );
		minY = Math.min( minY, maxY ); 
		maxX = Math.max( minX, maxX );
		maxY = Math.max( minY, maxY );

		// The result set cantains all the lvls matching the query:
		const result = new Set();

		// Go through each lvl unit:
		Cell.forEach( this, minX, minY, maxX, maxY, true, true, true, ( b, g, c ) => { 

			const id = Cell.idByIndices( this, b, g, c );
			const collection = this.collection.cell.get( id );
		
			collection.forEach( result.add, result );

		
		});

		// Return result set:
		return result;

	};

	remove( 

		item, 
		minX, minY, maxX, maxY 

	) {

		// Go through each lvl unit:
		Cell.forEach( this, minX, minY, maxX, maxY, true, true, true, ( b, g, c ) => { 

			const id = Cell.idByIndices( this, b, g, c );
			const collection = this.collection.cell.get( id );
		
			collection.delete( item );

			if( collection.size === 0 ) Cell.unsetByIndices( this, b, g, c );

		
		});

		return this;

	};

	move( 

		item, 
		minTX, minTY, maxTX, maxTY, 
		minSX, minSY, maxSX, maxSY

	) {

		this.remove( item, minSX, minSY, maxSX, maxSY );
		this.insert( item, minTX, minTX, maxTX, maxTY );

		return this;

	};

};
