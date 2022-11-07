# Qrid
---
## <a name="table-of-contents"></a> Table of Contents
- [Table of Contents](#table-of-contents)
- [1. Qrid (constructor)](#constructor)
- [2. Instance Methods](#instance-methods)
- - [2.1. Insert](#instance-methods-insert)
- - [2.2. Query](#instance-methods-query)
- - [2.3. Remove](#instance-methods-remove)
- - [2.4. Move](#instance-methods-move)
- [3. Instance Properties](#instance-properties)
- - [3.1. Cell](#instance-properties-cell)
- - [3.2. Group](#instance-properties-group)
- - [3.3. Block](#instance-properties-block)
- - [3.4. Grid](#instance-properties-grid)
- - [3.5. Collections](#instance-properties-collections)
- - [3.6. Blocks](#instance-properties-data)

---

### <a name="constructor"></a> <sub><sup>`new`</sup></sub> Qrid({ <sub><sup>*`grid`, `block`, `cell`, `offset`* </sup></sub> })

#### <sub><sup>:arrow_right_hook:</sup></sub> `Input`

- *`grid`* is an object with entries *width* and *height*:
- - *`width`* non-zero positive integer, defaults to 100,
- - *`height`* non-zero positive integer, defaults to 100.

- *`block`* is an object with entries *width* and *height*:
- - *`width`* non-zero positive integer, defaults to 100,
- - *`height`* non-zero positive integer, defaults to 100.

- *`cell`* is an object with entries *width* and *height*:
- - *`width`* non-zero positive float, defaults to 10,
- - *`height`* non-zero positive float, defaults to 10.

- *`anchor`* is an object with entries *x* and *y*:
- - *`x`* a float, defaults to 0,
- - *`y`* a float, defaults to 0.

#### <sub><sup>:arrow_right:</sup></sub> `Output`

- returns a new instance of `Qrid`.

##### <sub><sup>:scroll:</sup></sub> Example code:
```javascript
// Creating the parameter objects:
const grid = { width: 10, height: 10 };
const block = { width: 100, height: 100 };
const cell = { width: 5, height: 5 };
const anchor = { x: 0, y: 0 };

// Creating an instance of Qrid from the paramater objects:
const queryGrid = new Qrid({ grid, block, cell, anchor });
```

---
## <a name="instance-methods"></a> Instance Methods

### <a name="instance-methods-insert"></a> .insert( <sub><sup>*`item`, `minX`, `minY`, `maxX`, `maxY`*</sup></sub> )

#### <sub><sup>:arrow_right_hook:</sup></sub> `Input`

- *`item`* is the object that is inserted into the region.
- *`minX`, `minY`, `maxX`* and *`maxY`* are floats, determining the region where *`item`* is inserted.

#### <sub><sup>:arrow_right:</sup></sub> `Output`

##### <sub><sup>:scroll:</sup></sub> Example code:
```javascript
// Creating an instance of Qrid with the default parameters:
const queryGrid = new Qrid();

// Creating a dummy object acting as the item to be inserted to the grid:
const item = { name: 'Mark' };

// Inserting the item into a region:
queryGrid.insert( 10, 10, 20, 20, item );
```
---

### <a name="instance-methods-query"></a> .query( <sub><sup>*`minX`, `minY`, `maxX`, `maxY`*</sup></sub> )

#### <sub><sup>:arrow_right_hook:</sup></sub> Input
- *`minX`, `minY`, `maxX`* and *`maxY`* are floats, determining the region where the *`item`* is going to be inserted.

#### <sub><sup>:arrow_right:</sup></sub> Output
- returns a *`Set`* with the results.

##### <sub><sup>:scroll:</sup></sub>  Example code:
```javascript
// Creating an instance of Qrid with the default parameters:
const queryGrid = new Qrid();

// Creating a dummy object acting as the item to be inserted to the grid:
const item = { name: 'Mark' };

// Inserting the item into a region:
queryGrid.insert( 10, 10, 20, 20, item );

// Quering a region and getting a Set
queryGrid.query( 15, 10, 20, 20 );
```

---

### <a name="instance-methods-remove"></a> .remove( <sub><sup>*`item`, `minX`, `minY`, `maxX`, `maxY`*</sup></sub> )

#### <sub><sup>:arrow_right_hook:</sup></sub> `Input`

- *`item`* is the object to be removed from region.
- *`minX`, `minY`, `maxX`* and *`maxY`* are floats, determining the region where *`item`* is searched and removed.

#### <sub><sup>:arrow_right:</sup></sub> `Output`

- returns this `Qrid` instance.

##### <sub><sup>:scroll:</sup></sub> Example code:

```javascript
// Creating an instance of Qrid with the default parameters:
const queryGrid = new Qrid();

// Creating a dummy object acting as the item to be inserted to the grid:
const item = { name: 'Mark' };

// Inserting the item into a region:
queryGrid.insert( 10, 10, 20, 20, item );

// Removing the item from an overlapping region:
queryGrid.remove( 15, 10, 20, 20, item );
```
---

### <a name="instance-methods-move"></a>.move( <sub><sup>*`item`, `minX`, `minY`, `maxX`, `maxY`*</sup></sub> )

#### <sub><sup>:arrow_right_hook:</sup></sub> `Input`
- *`minX`, `minY`, `maxX`* and *`maxY`* are floats, determining the region where the *`item`* going to be moved.
- *`item`* is the object to be moved.

#### <sub><sup>:arrow_right:</sup></sub> `Output`
- returns this *`Qrid`* instance.


#### <sub><sup>:scroll:</sup></sub> Example code:
```javascript
// Creating an instance of Qrid with the default parameters:
const queryGrid = new Qrid();

// Creating a dummy object acting as the item to be inserted to the grid:
const item = { name: 'Mark' };

// Inserting the item into a region:
queryGrid.insert( 10, 10, 20, 20, item );

// Quering a region and getting a Set
queryGrid.query( 15, 10, 20, 20 );
```


---

## <a name="instance-properties"></a> Instance Properties

### <a name="instance-properties-cell"></a> .cell

- *`width`* and *`height`* are read-only floats, set during *`Qrid`* intance creation. Determines the cell width and height.

#### <sub><sup>:arrow_right:</sup></sub> `Output`
- returns reference to *`{ width, height }`*.

---

### <a name="instance-properties-block"></a> .block

- *`width`* and *`height`* are read-only floats, set during *`Qrid`* intance creation. Determines the number of cells inside the block.

#### <sub><sup>:arrow_right:</sup></sub> `Output`

- returns reference to *`{ width, height }`*.

---

### <a name="instance-properties-grid"></a> .grid

- *`width`* and *`height`* are two floats, these can adjusted after instance creation. Determines the number of blocks on the grid.

#### <sub><sup>:arrow_right:</sup></sub> `Output`
- returns reference to *`{ width, height }`*.

---

### <a name="instance-properties-offset"></a> .offset

- *`x`* and *`y`* are twos floats, these can adjusted after instance creation. Determines the number of blocks on the grid.

#### <sub><sup>:arrow_right:</sup></sub> `Output`

- returns reference to *`{ width, height }`*.

---

### <a name="instance-properties-collections"></a> .collections

Used to map cell id's to collections of inserted objects.

#### <sub><sup>:arrow_right:</sup></sub> `Output`

- returns a *`Map`* instance.

---

### <a name="instance-properties-data"></a> .blocks

#### <sub><sup>:arrow_right:</sup></sub> `Output`

- returns a *`Map`* instance.

---
