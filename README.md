# objectPath experiment

Reading code of [https://github.com/mariocasciaro/object-path/](mariocasciaro/object-path/), I don't like how is it implemented. In this repository I'll try to create a new project with my vision and when the project will be consolidated, I will do proposals to change [https://github.com/mariocasciaro/object-path/](mariocasciaro/object-path/) project.

## Deleting `push` and `insert` methods

In object-path, `push` and `insert` are implemented accessing in element indicated by path and then modifying value accessed. It might not necessary if `set`, `get` or `ensureExists` had returned the current value (and hadn't returned the old value). For example:

``` javascript
var obj = { array: [2] }
objectPath.get(obj, ['array']).push(3) // now: obj === { array: [2, 3]}
```
Or if you would create array when it doesn't exist:
``` javascript
var obj = { array: [2] }
objectPath.ensureExist(obj, ['foo', 'bar']).push(5, 4) // now: obj === { array: [2], foo: [5, 4]}
```

On other hand, some times, it's useful to get old value when another is modified. So, it's interesting to allow configuring methods `set`, `empty` or `del` with a extra parameter `options` with property `returns = 'new' | 'old'`. For example:

``` javascript
var obj = { foo: 3 }
objectPath.set(obj, ['foo'], 5, {
    returns: 'old'
}) // returns old value: 3
```
Or:
``` javascript
var obj = { foo: 3 }
objectPath.del(obj, ['foo'], {
    returns: 'old'
}) // returns old value: 3
```

## implementing `ensureExists` or configuring `set` method?

I think that it is not necessary to implement `ensureExists` method. It might be used a `set` method that had been configured with property `ifValue = 'does not exist' | 'exists'`. For example:

``` javascript
// it behaves like ensureExists
var obj = { foo: 3}
objectPath.set(obj, ['foo'], 5, {
    ifValue: 'does not exist'
}) // obj isn't modified

objectPath.set(obj, ['bar'], 5, {
    ifValue: 'does not exist'
}) // obj is modified. now: { foo: 3, bar: 5 }
```
And additional behaviour when `ifValue === 'exists'`:
``` javascript
var obj = { foo: 3 }
objectPath.set(obj, ['foo'], 5, {
    ifValue: 'exists'
}) // obj is modified. now: { foo: 5 }

objectPath.set(obj, ['bar'], 5, {
    ifValue: 'exists'
}) // obj isn't modified.
```

## create configuration property.

As opposed to `del` and `empty` methods, `set` method create intermediate object if it does not exist. This behaviour might be changed by configuration. For example: 

``` javascript
// it behaves like ensureExists
var obj = { foo: 3}
objectPath.set(obj, ['fizz', 'buzz'], 5, {
    create: false
}) // obj.fizz does not exists and 5 isn't set.
```

## Property `filter`: `ifValue` and `create` property is not enought

Maybe you need set value depending on value to modify. For example: set only if value is not an array. It might be interesting to use property `filter` with callback function:

``` javascript
// it behaves like push implemented in objectPath
var obj = { foo: 3}
// set empty array if value is not an array.
objectPath.set(obj, ['foo'], [], {
    filter: function (value) {
        return !isArray(value)
    }
}).push(5) // then push number 5 in array.
```











