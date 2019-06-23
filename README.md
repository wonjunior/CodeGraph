
# CodeGraph [![GitHub version](https://img.shields.io/badge/version-early_v0.5-brightgreen.svg)](https://badge.fury.io/gh/WonJunior%2FCodeGraph)[](https://reposs.herokuapp.com/?path=WonJunior/CodeGraph&color=ff69b4) [![GitHub issues open](https://img.shields.io/github/issues/WonJunior/CodeGraph.svg?colorB=0576b7)]() [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) (updated on Jan. 29th)


Node based programming editor that allows you to create code with a visual interface.

## Preview:

### Linking system![alt text](https://image.ibb.co/iswbep/first.png)

### Node finder![alt text](https://image.ibb.co/bZtyc9/finder.png)

### Live feedback![alt text](https://image.ibb.co/ezvpjp/action.png)

-----

## What interrupted v0.5?

What was holding us back to proceed preparing version 0.5 was the gap between logic and HTML structure. We needed the header of each Getter node to be a `<div>`↔`<input>` element so the user can change the variable he's getting. However it seemed like a mess to handle the fixed headers and those that could be modified (plus it had to access the function's process - the `function` and `stringFunction` properties - which wasn't possible). Moreover the scoping system wasn't even in place to make this kind of behaviour work.

---

## Current state of Codegraph

1. A quick fix was done to allow for two different Getter nodes to access to different "variables" in a provisory scope object that was holding the variables. **The graph was working**: two variable Getters where used, logged, added together, set to a variable, and the variable was logged. This graph contained three directed nodes (with execution links).

2. The objective for this build is to have a **live reload**. This means the graphs needs to be up to date at any point in time. There are three possible types of update that can happen depending on the node that was last modified by the user: **direct data propagation** (*DDP*), **directed execution flow** (*DEF*) and **backwards dependency solving** (*BDS*).
 - *DDP*: the node fires its process if it has any then propagates its returned value to all descending nodes. Recursively, they too update their return values. 
 - *DEF*: the execution tree is updated from its root following its branches (a.k.a. control flow links).
 - *BDS*: before executing its process, a node makes sure the variables it depends on haven't been modified, if so it will need to resolve its dependencies before proceeding with *DDP*.

3. A **design structure for the scoping system** was put in place

---

## Todos

- **Work on `Node` and `Dock` class structure**. We have a couple of sub-classes that will help structure the different types of nodes and docks. This will help define the HTML structure as well.

```
      Node                    Dock
       |                     /    \
   Executable          DataDock  ExeDock
       |                /    \
     Setter        Getter  Editable
```

- **Provide a reliable data structure for `Node` and `Dock`** (cf. § Trello cards)

- **Update the Github repository**: `master` is unstable. Stabilize `comeback_v0.5`, then merge to `master`. Create a new branch for each new feature.

- **Rollback to previous zoom/pan version** : view diff between `saved-finite` and `saved-infinitePane`. We want the window to have a finite area. The background will stick to the view and not get fixed as a wallpaper like in the current version.

- **Check if mouse/key event handler is working correctly** It doesn't seem like a viable solution to use the `pointer-events` property in CSS to ignore some elements. Sometimes the parent will get an event handled by the system and the child will have to get a `pointer-events: hidden`.

- **The state system for mouse/key events**: It might work. Need to make sure it does.


---

## State System

Here's how it works: we first define a new state, provide a name and add a set of `keybinds` and `mousebinds`:

```
new State({
   name: 'finder',
   keybinds: {
      escape: () => nodeFinder.hide(),
      other: e => nodeFinder.search(e)
    },
   mousebinds: {
      left: {
         finder: () => nodeFinder.hide()
      }
   }
});
```
To change from a State to another, we can use the `State.change(<stateName>)` method). Currently it takes a string as argument. We could make it so it takes a symbol instead. For example, `Finder`'s state

```    
Finder.state = Symbol('Finder');
```

define the state:

```
new State({
   name: Finder.state,
   keybinds: {   },
   mousebinds: {   }
});
```

then use it like so:

```
state.change(Finder.state)
```

## Current developments

- **variable scope support**: each node has a lexical scope (i.e. a reference to an object that's created on all root nodes) attached to it that allows to update if necessary the values of the different variables, delete or add new variables.

- **introduce loop structures**: the question is, how to implement loops with the current `function`/`string` functions contained by each node?
