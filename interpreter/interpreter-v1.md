# Directed node path:
##The following algorithm will interpret this graph node:
[![enter image description here][1]][1]

Some more details on the node graph:

 1. Green docks are variables that come from other nodes, so they are
    necessarily objects outputted by a previous node. On the other hand
    square docks are constants.

 2. I will refer to "control object" the object that holds all links between docks in the graph.


----------

**-- START OF ALGORITHM --**

   - search all input nodes, meaning all nodes that have no links attached on their left (no parameter).

   > there are five on this graph: A, B, C, E, and K they have only constant docks on their left: A1, B1, B2, C1, E1, E2, K1 and K2 are all
   defined variables.

   - nodes are functions, and input nodes are functions without parameters. No other values are needed, therefore we can calculate
   the output of those five nodes.

   > these outputs are: A2, B3, C2, E3, E4, K3.

   - with our control object we know which docks are connected to these four outputs

   > they link like so: A2 -> D1; B3 -> D2; C2 -> D3; C2 -> F1; E3 -> G2; E4 -> J1; K3 -> N3


NOTE: pink docks who link up to multiple green docks are processed as  if there were multiple identical pink docks. Here for exemple the    output C2 of the node C can be seen as C2 and C2' (because C2 links    up to D3 AND to F1). In total we have 7 links to analyze.


   - yet again with our control object we will look at were those 7 links end up.

   > they end in the D, F, G, J and N nodes

   - they end up on five different nodes. Now, can we calculate the D output, the F output, the G output, the J output and the N output? Or
   do we need other variables that we don't have right now?

   > node D has three parameters and it just happens that we have all three parameters: D1, D2, D3 so we can calculate D's output right
   now: D4
   > node F has only one parameter and we have F1, we can calculate F's output: F2
   > node G has two parameters but we only have G2, we can't calculate G's output => store G2 in G's waiting queue in the control object
   > node J same thing we have J1 but not J2 => store J1 in J's waiting queue in the control object
   > node N has three parameters but we only have N3

   - at the end of this step we have calculated D4 and F2 and stored in our control object the following values: N3 (which hasn't been used
   because we don't yet have N1, N2), G2 (because we don't have G1) and
   J1 (because we don't have J2). Now let's look at were D4 and F2 end
   up

   [![enter image description here][2]][2]

   > D4 ends up on the G node: on the G1 dock (therefore the object in D4 dock equals the object in G1)
   > F2 ends up on J node: on the J2 dock (same here)

   - can we calculate G and J?

   > for G we have 2 parameters on 2 so we can get G3
   > for J we have 2 parameters on 2 so we can get J3

   [![enter image description here][3]][3]

   - check were G3 and J3 end

   > H, I and L nodes

   - can we calculate them?

   > H has two parameters: H2 equal to G3 and the other one is set => we calculate H3
   > I has two parameters: I1 equal to G3 and the other one is set => we calculate I3
   > L has only one parameter: L1 => we calculate L2

   - where does H3, I3, L2 end up at?

   > M and N

   - can we calculate M and N?

   > M has two parameters, we have M1 and M2 => we can calculate M3
   > N has three parameters, we have N3 from the first step stored in N's parameters array and N2 is equal to L2 => we cannot calculate N

   - we have a last vertex to sort out: M3

   > it goes to N, M3 = N1

   - can we calculate N?

   > now we can because we have N1, N2, N3 => we can calculate node N (no output in this case)


   - No more vertices to sort


**-- END OF ALGORITHM --**

  [1]: https://i.stack.imgur.com/CXlz4.png
  [2]: https://i.stack.imgur.com/m3OKp.png
  [3]: https://i.stack.imgur.com/5Gm89.png
