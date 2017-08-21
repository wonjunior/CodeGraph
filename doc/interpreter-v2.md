# Interpreter version 2

The problem with the previous answer was that it only dealt with simple/linear programs. In other words, it couldn't deal with operations such as condition checks: `if, else` and most of all loops: `for` and `while`. Based on the discussion I had with [mapofemergence][1] I've decided to work on this issue in order to create a more versatile interpreter that would compile pretty much any graph structure. So here's an update on the **Node Graph Interpreter**!

I have been looking around the Unreal Engine docs a bit and I find out some really cool things about how their node graph works. Basically, they have a different type of link between nodes called `execution links`. Furthermore, they have other types of nodes called `control nodes` that handle conditions and loops. So in this answer, I'm going to be looking at how to implement them and how the interpreter will function in order to run them.

Let's take two simple examples:

    // CODE A
    total = 0
    for(i = 0; i < 10; i++) {
        total++;
    }
    print(total)

and

    // CODE B
    total = 0
    for(i = 0; i < 10; i++) {
        total++;
        print(total);
    }

The first displays `total` at the end, the second one displays it on each loop.

Now how do we implement it with nodes?

 1. we need the body of the loop:

[![enter image description here][2]][2]

2. then we need a new node to control the loop, the `loop node`:

[![enter image description here][3]][3]

See that purple dock? This is the execution dock, it indicates order. That's cool because it tells the interpreter exactly what to do on each loop.


----------


## Let's create `CODE A`:

[![enter image description here][4]][4]


----------

## Let's do `CODE B`:
`CODE B` requires that we add a "callback" dock to the `loop node`:

[![enter image description here][5]][5]

Here's `CODE B`:

[![enter image description here][6]][6]


----------

## Conclusion

Essentially the interpreter (version 2!) works as follows:

When the `loop node` is called (we'll have to add a purple dock on the left side of the `loop` node in order to call it) the interpreter will follow its existing control link (purple link) and linearly work its way, one node at the time.

In our example `CODE A`, the `loop node` is attached to `add` first it must resolve all its dependencies before moving onto the next node attached by the control link (here `print`). That corresponds to `BLOCK 1` (see the last image).

### BLOCK 1

The node `add` has to pull variable `total` no further calculation needed to calculate his arguments, all arguments have been resolved (the other one is set to `1`). Therefore calculate the output of `add` and find the nodes attached to it: we have a node `total` attached on the right (it's a `set` function, the other one was a `get`). Move to this node and proceed: no nodes attached to this one => move to the second node linked by control link: BLOCK 2.

### BLOCK 2

The node has one argument, it pulls the variable `total` and runs its function, therefore, printing the variable `total` (which has been incremented by 1 by the preceding node).

### All in all

Here's the graph with the blocks I was mentioning previously
[![enter image description here][7]][7]

Two things to understand:

 1 - there are two types of links: `data links`  and `control links`, the former was used in the first interpreter and the latter was introduced in this post.

 2 - this interpreter will switch between

  - *direct interpretation*:

     - when navigation through a control link (purple link) the interpretation will be direct (in `CODE A` the interpreter went like so: `loop node` -> `add node` -> `print node`)

     - <strike>whenever a node that is attached by a control link has its output attached to other node(s). (in `CODE A` the `add node` is attached on the right to a `total` node)</strike>

  - *indirect interpretation*: when resolving dependencies on a node that is attached by a control link, the interpreter will have to work its way backward in order to find the node's arguments. (in `CODE A` the


----------

## EDIT

Some modifications have to be made to this interpreter here's the problem:

>  I'm not sure how you would update the input total for the add node after each iteration

> \- [mapofemergence][1]

Here's how we solve this: `ADD` shouldn't have an execution pin and the `SET` node should have one instead. Here's the correct graph to run `CODE A`:

[![enter image description here][8]][8]

Let's recap:

 - *forward interpretation* for all nodes attached with control links
 - *backward interpretation* to find the arguments of a node

Also, an actual variable object (we will call `context` here, it's just an array of variables) would be used to store all variables used in the graph. In `CODE A`, only `title` is used:

 - a `GET` node will just return the value `total` from `context`

 - a `SET` node will assign the value given, inside the array `context`

------

## Another example

Before I try to implement it in JS I wanted to check with another example:

    var total, other;

    for (var i = 0; i < 10; i++) {

      total -= other * random();
      other = (other + 2) / 3
      print(other)

    }

    print(total)

Here's the graph for the above code:
[![enter image description here][9]][9]


  [1]: https://stackoverflow.com/users/8200213/mapofemergence
  [2]: https://i.stack.imgur.com/5f8OU.png
  [3]: https://i.stack.imgur.com/hwBpw.png
  [4]: https://i.stack.imgur.com/G9g5X.png
  [5]: https://i.stack.imgur.com/coDtu.png
  [6]: https://i.stack.imgur.com/iyrww.png
  [7]: https://i.stack.imgur.com/9yjNS.png
  [8]: https://i.stack.imgur.com/DiXj1.png
  [9]: https://i.stack.imgur.com/iEyt8.png
