# Which exception do the Iterators throw from their next() method when there are no more values to iterate, that work on finite collections?

## Iterators that work on finite collections throw Stop Iteration from their next() method when there are no more values to iterate. Stop Iteration is a property of the global object in JavaScript 1.7. Its value is an ordinary object (with no properties of its own) that is reserved for this special purpose of terminating iterations. Note, in particular,that Stop Iteration is not a constructor function like TypeError() or RangeError()




