
# <span style="color:#4285f4">C</span>ode<span style="color:#ea4335">G</span>raph [![GitHub version](https://img.shields.io/static/v1?label=version&message=cg2020&color=green)](https://badge.fury.io/gh/WonJunior%2FCodeGraph)[](https://reposs.herokuapp.com/?path=WonJunior/CodeGraph&color=ff69b4) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Node based programming editor** to create code with a visual interface.

This is very much a work in progress! Objective for 2021/2022 has shifted towards building a Pytorch binding through a Python kernel.

Read **[specs.pdf](./specs.pdf)** for a full description of the project.

---

##### Codegraph philosophy: code reuse through componentization

Codegraph can work with an existing code base, the objective is not to translate this code into a complete graph. Instead the aim is to rather to create high level components based on this code base. This allows us to use the codebase in the graph to build new components. Codegraph is not a dependency, it should allow anyone to get in and out very easily. Therefore, it needs to be able to compile node graphs into code.
![](https://i.ibb.co/DrnQ3Q4/process.png)

---

##### cg2020 - release 0.1 (Mar 13) - Data propagation and tree execution with detailed logs

![](https://i.ibb.co/pZND4x9/releaseA.png)

---

##### Screenshot from previous build: Linking system, Node Finder and Live feedback

![alt text](https://image.ibb.co/iswbep/first.png)

![alt text](https://image.ibb.co/bZtyc9/finder.png)

![alt text](https://image.ibb.co/ezvpjp/action.png)

