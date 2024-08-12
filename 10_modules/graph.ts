export function buildGraph(edges: string[][]) {
  const graph = Object.create(null);
  function addEdge(from: string, to: string) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (const [from, to] of edges) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
