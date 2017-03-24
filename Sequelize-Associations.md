# Sequelize Associations

## 1:1


`Model1.belongsTo(Model2)` - associates the two models by putting a foreign key for model 2 in Model one's schema. By default, Sequelize will `camelCase` the name of this column, so it would be called `model2Id` in this case. If the first model is defined with the `underscored: true` option, this association would create a `model2_id` `snake_case` name.
* In`belongsTo`, the associated methods will be placed on the first Model, so that `Model1` would get methods such as `.setModel2` and `.getModel2`

`Model1.hasOne(Model2)` will put the foreign key for `Model1` on `Model2` (the `target model`)

## m:m


`Model1.belongsToMany(Model2 { through: <join table name>})` will create a join table with the given name

You must define `through` with `belongsToMany` associations

This will add methods `getModel2s`, `setModel2s`, `addModel2`,`addModel2s` to `Model1`. You usually want to set up these methods on both Models, so you'd also put in the:
`Model1.belongsToMany(Model2 { through: <same join table name>})`
and this would add `getModel1s`, `setModel1s`, `addModel1`, and `addModel1s` to `Model2`.

## Goal for our Puppies project:

* `Puppies` have lots of foods that they like. And `Foods` can be enjoyed by many different puppies

* Each `Puppy` has a favorite `Park` that we'd like to be able to access as its `favoritePark`

* Each `Park` is linked to a single `Location`

* We will build/modify routes to allow for things like
  * Puppies return with their favorite foods
  * Adding a favorite food to a puppy
  * Adding a location to a park
  * Creating a new Park with the associated location