## START ALGORITHM

>> get array of vertices

>> determine where they are going and store nodes in node[]

>> forEach node[] element check if there is the necessary number of parameters
if true: we can calculate the output of this node
else: we can't so we simple store the parameter in the node's parameter array

>> get the array of vertices

# repeat the process until there are no more vertices in the array

## END OF ALGORITHM

getInputNodes() :: returns an array of all nodes that have no variable parameters (right-nodes)

calculateNodes(array nodes) :: get in parameter an array of nodes and calculate all nodes that can be calculated, the output are store in the vertices array

VertexLink(array vertices) :: takes an array of vertices (right side docks) tells where their link end up at store parameter in nodes's parameter arrays and return the array of nodes affected
