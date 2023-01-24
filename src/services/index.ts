export interface Graph {
  [node: string]: string[];
}

export const findShortestPath = (
  graph: Graph,
  start: string,
  end: string
): string | null => {
  const queue: string[] = [start];
  const visited: Set<string> = new Set();
  const parent: Map<string, string> = new Map();

  visited.add(start);
  parent.set(start, null);

  // while we still have nodes to visit until the exit
  while (queue.length > 0) {
    const node = queue.shift();

    // if the node we visit is the exit we build the path and return it
    if (node === end) {
      const path = [end];

      // append all the parents until the entry node
      while (path[path.length - 1] !== start) {
        path.push(parent.get(path[path.length - 1]));
      }

      const pathInOrder = path.reverse();

      return pathToString(pathInOrder);
    }

    // a neighbor is a node we can move to from the current node
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, node);
        queue.push(neighbor);
      }
    }
  }

  return null;
};

const pathToString = (pathArray: string[]): string => {
  let path = '';

  for (let index = 0; index < pathArray.length; index++) {
    if (index === pathArray.length - 1) path += `${pathArray[index]} `;
    else path += `${pathArray[index]} -> `;
  }

  return `${path}   |   Path length: ${pathArray.length}`;
};
