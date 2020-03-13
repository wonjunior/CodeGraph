
# CodeGraph [![GitHub version](https://img.shields.io/static/v1?label=version&message=cg2020&color=green)](https://badge.fury.io/gh/WonJunior%2FCodeGraph)[](https://reposs.herokuapp.com/?path=WonJunior/CodeGraph&color=ff69b4) [![GitHub issues open](https://img.shields.io/github/issues/WonJunior/CodeGraph.svg?colorB=0576b7)]() [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
(updated on March. 13th)


Node based programming editor that allows you to create code with a visual interface.

## Preview:

#### Linking system![alt text](https://image.ibb.co/iswbep/first.png)

#### Node finder![alt text](https://image.ibb.co/bZtyc9/finder.png)

#### Live feedback![alt text](https://image.ibb.co/ezvpjp/action.png)

-----

#### Codegraph philosophy: code reuse through componentization
Codegraph can work with an existing code base, the objective is not to translate this code into a complete graph. Instead the aim is to rather to create high level components based on this code base. This allows us to use the codebase in the graph to build new components. Codegraph is not a dependency, it should allow anyone to get in and out very easily. Therefore, it needs to be able to compile node graphs into code.

---

#### The basics: nodes, docks, execution flow
A node is a block which represents a function or a process. It has a head and body, but these sections are only a visual separation, they do not hold any semantic sense. Nodes can have docks which are essentially sockets from which we can link the node to other nodes. The side on which seats the dock, however, has its importance. Information comes from the left inside the node, then leaves from the right side. There are two fundamental types of docks execution docks (squared docks) and data docks (rounded docks). These are two types of information flows which are used in Codegraph. Execution controls the execution of the program while data is the actual information passed to feed the nodes.

Let’s take the most basic node as an example. We will represent a simple function which has no arguments and returns a constant: 10. It will have a single data dock as output. It will also have two execution docks that will allow us to indicate when the node needs to be executed. We can link this node with other nodes to pass information through.

Below is an example of such graph, where we have two getter nodes passing their values to the node in the center which processes the two arguments and returns a value. The value is then relayed to a fourth node on the right, the end of the graph. Green links are data links. They link two data docks: an output data dock with one or more input data docks. Blue links on the other hand allow us to define the order of execution of the graph: literally setting which nodes are executed first, second, etc...

---

#### Some flexibility: dynamic node output
Note that some nodes do not have execution docks. This is because they have no process, i.e. the value they hold is retrieved from the current scope, not computed. If the result of a node is computed, it needs to have input and output execution docks in order to tell when it needs to compute it. For getters, the value will always be the last known value for that variable. Let’s imagine we have a getter node that is used twice: for instance, by a first function then a second further down the graph. Now, imagine that the value of this variable has changed between the two accesses. In this case the getter node will have provided two different values because it was accessed the getter at two different moments in time. This will open to another discussion on data propagation and resolving dependencies.

---

#### Common nodes: function-nodes
We can assert that every node has at least one exiting data dock because every function as a returning value (in some languages if no value is returned there will be a default value). Therefore, when defining a node, we need a function definition. This is the core component. A function can have arguments and will always return a value. The corresponding node will have as many entering data docks as there are arguments.

The node’s process will be defined as `process: (a,b) => f(a,b)` where we imagine f is a function declared explicitly somewhere else. NB: No support for rest or spread operators.

The internal process of a given node has a list of references to the data docks and their values in order to execute and calculate its result.

A good proposal would be to have a base node which has no docks (no data docks nor execution docks). We can attach a process to it. This means adding data input docks for arguments and the process’ definition which will have two layers. The first layer will compute the result of the function while the second layer returns a string function called on those arguments.

---

#### Special nodes: getter-nodes
Another commonly used type of node is one which acts as a getter to a variable. It has no data input dock and a single data output dock. They don’t work the same way function-nodes do: the value of `a`, will be fetched when it is accessed.

---

#### Very special nodes: control-flow-nodes
In some cases, nodes need to make some variables available to the outside scope. This is only the case for special nodes which have control on graph’s execution. They’re called control flow nodes. In this case, we will need more than one output data dock. However, this is an exception.
Also, control-flow-nodes have one input execution dock and can have more than one output execution dock. As they are usually able to redirect the flow of execution on a specific route.

---

#### Functions vs function calls
Once defined, a function can either be used or passed:

or
When passed, the function acts as a value. This feature is not required right now but might be in the future if want to pass a function as parameter like a callback. For now, an if-then approach is preferred.


We already have a proposal to implement anonymous functions. It will introduce a new kind of dock used to plug a function node directly into another node’s input data dock.

---

#### A proposal for OOP
To allow OOP, calling methods is like applying filters on an object. We can use the pythonic approach which consists of adding the self object in the argument list. This translates to adding an additional data input dock to set the value of this inside the method’s scope. On the right, the node is applying method f on object a with parameter b.

This structure can be used to allow function binding: either on-call (an argument allows us to set the value of the bind) or by applying a bind before-hand on the function node.

---

#### Node Process: the API
We will describe the attributes that are given to the Node constructor. The most important part of a node’s definition is its process. The two-layered function declaration and the input and output docks definitions, here named respectively params and the unique result dock:

    process: {
        params: DockDefinition[],
        result: DockDefinition,
        function: Function,
        string: Function,
    }

We call DockDefinition the set of attributes that are used to define a dock.

A proxy is created on the node to access an instance of Process, a class which is responsible with computing the node’s result. The dock will be instantiated and passed to this Process object. At the same time, we must also add these docks in a Set inside the Node instance. It will be used to update the graph. We end with two attributes: docks and a proxy named process.

---

#### Execution control: ROUTERS
We now need to deal with the execution docks. For a process there are two by default. So, these two need to be created, added to the list of docks and relayed to an instance of Router. This instance is attached to the node with a proxy, the same way we did with the Process instance.

We can declare a function for the router with a special API to access information about the execution of the route. Ultimately, this function would return the output execution dock that needs activating. By default, i.e. for basic function-node, a default router will be used.

Let’s see study the router for a conditional block. We need to think about what the function needs to have access to in order to decide: there are two possible output routes (the "true" OED and the "true" OED), which one to activate? The answer depends on one of the input data docks, the one called "condition". The router’s function needs to check if it’s truthy or falsy and choose the dock accordingly. For node loops, it is trickier. The node’s router saves its state and decides depending on the "end" input data dock whether to execute the "body" or the default OED.

The router might also need to make some variables available. This is generally the case for loop nodes where an index value will be provided as an ODD. This will simply be specified with a getter attribute which will list all the variable.

    router: {
        params: DockDefinition[],
        getters: GetterDefinition[],
        function: Function,
    }

---

#### Getters: the API
Lastly there are getters, which unsurprisingly will have the same definition we used for routers:

    getters: GetterDefinition[]

Every ODD is connected to either a process module or a getter module. This module allows it to find its value: the former will try to compute it with the node’s parameters and the latter will retrieve the value in the current scope’s context.

---

#### Control-flow nodes: the routers
Some more details on control-flow nodes:

These types of nodes have multiple output execution docks. This means there’s a decision to be made. The 'if' node will look at the condition, pick the appropriate output dock and redirect the execution to the connected node.

The for node on the other hand will need to keep track of the loop’s progress and execute the dock "body". When executions of this path end up on a leaf (the last node of the loop’s body), the information is relayed back to the for node to proceed with the loop. If the condition last index hasn’t been reached, the body will be executed again. When the last index is reached, execution is redirected to the upper output execution dock (the default execution dock). Looping sections of the graph require the execution links to have a special payload describing the process that initiated its execution. This way, we can jump back to the initiator when the leaf is met.
Also, we notice we have an output data dock index which can be used by the nodes in the body. The value of index will be set and updated by the for node before each iteration. This variable will be scoped, meaning that nodes outside of the body won’t have access to this value.

Every process, i.e. dock, has a scope attached to it. It allows to store and retrieve variables as well as create sub-scopes. This allows a given node to know what variables it has access to. Getter will retrieve variables; setters will store, or override variables and function will create new scopes.

---

#### Dock values: where are they coming from?
How do data docks get their values? An Input Data Dock (IDD) gets its value directly from the dock it is connected to. That will, of course, be an Output Data Dock (ODD). An ODD will get its value differently depending on its type. A getter dock will access the node’s scope to retrieve its value. A return dock works differently because it will first look in the cache to see if the value ready for use.

Links do not hold specific information. It might be useful down the road to provide additional information for the user.

---

#### Recap: node types
In total, there are five types of nodes:

---
#### Lexical scope: variable’s reach
We need an object Scope which tracks variables in each context and gives tools to get and set their values as well as create new variables. When a getter dock is accessed it will get its value in the scope that is attached to it. Same with setter docks (equal to setter nodes) which will modify a variable’s associated value.

Does everything inside the same canvas share the same scope? A single scope? No: if we have a loop that defines a new variable i then, only the body of the loop will have access to it. So definitely: scopes have a parent/child structure. If we want to access a specific variable, we need to navigate up the chain of parents until we find one of the same names. Therefore, control-flow-nodes are the only nodes capable of creating a new scope.

---

#### Data propagation and tree execution: the interpreter
The idea is to allow the user to interact with the graph and get immediate feedback. That includes possible errors in interpretation and each node’s output. Here’s how it works:

1.	Update triggers

Whenever a node is interacted with (including f-node, g-node, s-node or o-node): it will get all the required arguments from its IDDs. For a given IDD, the value can be cached or not available at all. (a) If at least one is not available it will abort execution; (b) else the process is executed and a value is cached in the ODD, displayed on the node and propagated. Propagation allows this new value to update the rest of the graph: this process is called direct data propagation.

2.	Direct data propagation

The current node needs to propagate the value to its ODD. For each connected node, we recalculate their result: (a) check all IDD, (b) get values, (c) calculate result, (d) propagate.  Execution nodes can, potentially, be connected to other nodes independently from data links. If propagation hits an execution node, it might be part of a larger execution tree (e.g. a loop) which means each execution node of that tree must be updated as well. Therefore, we need to keep track of this execution tree from the start, whenever a given node of this tree is triggered, then an Execution Tree update must happen.

3.	Execution Tree update (ET update)

First, the root node of that tree must be found. It will get updated (all argument values are considered already cached), a direct data propagation will happen from this node. On the execution tree, if a node has ODD, a direct data propagation will occur, but it won’t be able to trigger yet another ET update to prevent infinite loops. By propagating, the execution will end up reaching a leaf, and will eventually end.

4.	Back data propagation

In some cases, updates are nonlinear, when something affects nodes in another part of the graph. Set-nodes have this effect. If at one point in the ET, a variable is set/changed with a set-node, this change needs to affect all nodes, using this variable after this point. However, we are not refreshing all cached values. We want to recalculate only the necessary nodes.

    * Dependency tracking

To achieve this, we must keep track of dependencies: is node x dependent on variable a? Therefore, each node including get-nodes (which are the source of the dependency) and set-nodes (which depend on a specific variable) must have a Dependency object on each of their IDD argument. Whenever a process or router is executed it must update this dependency set by combining the dependencies of each of the nodes it’s connected to and provide it to its ODD.
 
    * Setters trigger updates

When a setter-node performs a change on the current Scope i.e. its IDD value changes, this information needs to be carried over down the execution tree. A special object will keep track of variables that have been updated.

Unnecessary updates (scope confusion): we need to keep track of scope too e.g i = 1 then in a child scope i = 10 therefore then we go up a scope, i hasn’t changed (it has changed in the child scope but not in the main scope). Therefore, no update is required on nodes as i remains equal to 1. If we don’t check that, all nodes dependent on i will get updated.

    * Setters trigger updates

When updating an execution tree, we need to determine which nodes need to be recalculated. For each IDD, we compare the changed variables with the dock’s dependencies. If a dock depends on a variable that has changed, then a back propagation is executed to resolve this dependency. Note that this propagation is promised-based: for a given node, each IDD creates a promise. When all promises have been resolved the result of that node is calculated. It will reach the previous node still carrying over the list of changed variables, check for dependency updates and promise a result. When a node with no dependencies is reached the promise is resolved and the previous promise can then resolve itself until, consequently, the first promise created resolves.

5. Concurrent updates

When a node interacts with two or more nodes from the same execution tree. In other words, when it is connected to two nodes on two different points of the ET. Updating that first node will result in two concurrent updates of the execution tree. Considering those two updates will not happen at the same time and not in the correct order, we need to ensure every access point has been updated before updating the ET entirely.

    * ET access mapping

Each node of the execution tree will collect the identifiers of all data nodes it’s connected to. This mapping will be inverted resulting in a new object, mapping each ascending data node to an array of execution nodes it’s connected to. With that in memory, we are ready to supervise propagation.

When a node is being updated, the propagation will eventually lead down to the execution tree. If so, it will look at the origin of that update and look at the associated set of entries on the ET (described above). It will remember that this execution node has been accessed and wait for other accesses on the ET if the set contains other nodes. As long as all accesses on the ET haven’t been made, the ET cannot update.

    * Access buffer

The ET will have an access buffer in memory which allows it to know whether it is waiting for an access or not. On each ET access we can determine the origin of the update. If it’s the first update, we copy the associated set of execution nodes from the inverted access mapping.

For example, 1 is the origin and it has propagated to B. Then the buffer will have to be updated to `1→{A}`. This means, the ET is waiting for an access to A from 1. On each ET access, we will look at the access buffer, if there is a set saved, it needs to validate the access and update the set, if the set is empty the ET can be updated from the root. Else, it will pass i.e. wait for an access on another exe node.

In the example, if 2 triggers an update: either B, C or D will be accessed first (let’s say C). The access buffer will be `2→{B,D}`. Then either `B` or `D` will be updated, the buffer will become `2→{D}`. Then lastly `2→{}`. The buffer is empty, and the ET can be updated: `A→B→C|D`.

If for some reason the access is not validated, i.e. there are concurrent updates from two different origin sources. The most recent one will be ignored.