import { 

	clamp, 
	getBit, 
	setBit, 
	unsetBit, 
	isUnsetBit 

} from './Utils.mjs';


export default class Cell {

	static idByIndices( qrid, b_index, g_index, c_index ) {

		const b_iW = qrid.block.iW;
		const b_iH = qrid.block.iH;
		const g_iW = qrid.group.iW;
		const g_iH = qrid.group.iH;

		return b_index * b_iH * b_iW * g_iW * g_iH + g_index * g_iW * g_iH + c_index;

	};

	static isUnsetByIndices( qrid, b, g, c ) {

		const block = qrid.blocks.get( b );
		const group = block[ g ];

		return isUnsetBit( group, c );

	};

	static setByIndices( qrid, b, g, c ) {

		const block = qrid.blocks.get( b );
		const group = block[ g ];

		block[ g ] = setBit( group, c );

	};

	static unsetByIndices( qrid, b, g, c ) {

		const block = qrid.blocks.get( b );
		const group = block[ g ];

		block[ g ] = unsetBit( group, c );

	};

	static forEach( qrid, minX, minY, maxX, maxY, ignoreInactiveBlock = true, ignoreInactiveGroup = true, ignoreInactiveCell = true, handler ) {

		// Calculate width and height of the entire grid:
		const c_width = qrid.cell.width;
		const c_height = qrid.cell.height;

		// Calculate the group width and height:
		const g_width = qrid.group.iW * c_width;
		const g_height = qrid.group.iH * c_height;

		// Calculate the block width and height:
		const b_width = qrid.block.iW * g_width;
		const b_height = qrid.block.iH * g_height;

		// Translate new coordinates relative to the offset set on the grid:
		const min_x = minX + qrid.anchor.x;
		const min_y = minY + qrid.anchor.y;
		const max_x = maxX + qrid.anchor.x;
		const max_y = maxY + qrid.anchor.y;

		//console.log('offset:', min_x, min_y, max_x, max_y );

		// Calculate Block level 2d index coordinates:
		const b_min_iX = clamp( Math.floor( min_x / b_width ), 0, qrid.grid.iW );
		const b_min_iY = clamp( Math.floor( min_y / b_height ), 0, qrid.grid.iH );
		const b_max_iX = clamp( Math.ceil( max_x / b_width ), 0, qrid.grid.iW );
		const b_max_iY = clamp( Math.ceil( max_y / b_height ), 0, qrid.grid.iH );

		for( let b_iX = b_min_iX; b_iX < b_max_iX; b_iX ++ ) {
		for( let b_iY = b_min_iY; b_iY < b_max_iY; b_iY ++ ) {


			// Translate Block 2d index coordinates to 1d index coordinate:
			const b_index = qrid.grid.iW * b_iX + b_iY;

			// Get the block:
			let block = qrid.blocks.get( b_index )

			// Checking if the block exists, if it doesn't then check if we want to create a new one:
			if( qrid.blocks.get( b_index ) === undefined ) {

				// If we don't need to create a new block then continue:
				if( ignoreInactiveBlock ) continue;

				// Create a new block:
				qrid.blocks.set( b_index, block = new Uint32Array( qrid.block.iW * qrid.block.iH ) );

			}

			// Calculate offsets for coordinate translation:
			const b_offset_x = b_width * b_iX;
			const b_offset_y = b_height * b_iY;

			// Translate new coordinates relative to the offset of the block:
			const b_min_x = min_x - b_offset_x;
			const b_min_y = min_y - b_offset_y;
			const b_max_x = max_x - b_offset_x;
			const b_max_y = max_y - b_offset_y;

			// Calculate Group level 2d index coordinates:
			const g_min_iX = clamp( Math.floor( b_min_x / g_width ), 0, qrid.block.iW );
			const g_min_iY = clamp( Math.floor( b_min_y / g_height ), 0, qrid.block.iH );
			const g_max_iX = clamp( Math.ceil( b_max_x / g_width ), 0, qrid.block.iW );
			const g_max_iY = clamp( Math.ceil( b_max_y / g_height ), 0, qrid.block.iH );
			
			for( let g_iX = g_min_iX; g_iX < g_max_iX; g_iX ++ ) {			for( let g_iY = g_min_iY; g_iY < g_max_iY; g_iY ++ ) {

				// Translate the groups 2d index coordinates to a 1d index coordinate:
				const g_index = qrid.block.iW * g_iX + g_iY;

				// Get the group (an integer):
				const group = block[ g_index ];
				
				// Check if group is inactive and whether or not to ignore it.
				if( group === 0 && ignoreInactiveGroup ) continue;

				// Calculate offsets for coordinate translation:
				const g_offset_x = g_width * g_iX;
				const g_offset_y = g_height * g_iY;

				// Translate new coordinates relative to the offset of the group:
				const g_min_x = min_x - g_offset_x - b_offset_x;
				const g_min_y = min_y - g_offset_y - b_offset_y; 
				const g_max_x = max_x - g_offset_x - b_offset_x;
				const g_max_y = max_y - g_offset_y - b_offset_y;

				// Calculate cell level 2d index coordinates:
				const c_min_iX = clamp( Math.floor( g_min_x / c_width ), 0, qrid.group.iW );
				const c_min_iY = clamp( Math.floor( g_min_y / c_height ), 0, qrid.group.iH );
				const c_max_iX = clamp( Math.ceil( g_max_x / c_width ), 0, qrid.group.iW );
				const c_max_iY = clamp( Math.ceil( g_max_y / c_height ), 0, qrid.group.iH );

				for( let c_iX = c_min_iX; c_iX < c_max_iX; c_iX ++ ) {
				for( let c_iY = c_min_iY; c_iY < c_max_iY; c_iY ++ ) {
					
					// Translate the cell 2d index coordinates to a 1d index coordinate:
					const c_index = qrid.group.iW * c_iX + c_iY;
					
					if( isUnsetBit( group, c_index ) && ignoreInactiveCell ) continue;
					
					handler( b_index, g_index, c_index );

				}
				}

			}
			}

		}
		}

	};

};
