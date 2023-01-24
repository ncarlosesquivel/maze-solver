// each key is a node, value is all the nodes connected to it
const graph = {
    'A': ['C', 'G', 'F', 'D'],
    'B': ['K', 'I', 'J'],
    'C': ['A'],
    'D': ['A', 'F', 'E'],
    'E': ['D', 'J'],
    'F': ['A', 'I', 'D'],
    'G': ['A', 'I'],
    'H': ['I', 'K'],
    'I': ['G', 'K', 'H', 'F', 'J'],
    'J': ['I', 'B', 'E'],
    'K': ['B', 'I', 'H']
}

/**
 * 
 * @param {object} graph The graph representing the maze
 * @param {string} start Our entry node
 * @param {string} end Exit node
 * @returns {string} The shortest path found
 */
function findShortestPath(graph, start, end) {
    const queue = [ start ]
    const visited = new Set()
    const parent = new Map()

    parent.set(start, null)
    visited.add(start)

    // while we still have nodes to visit until the exit
    while (queue.length > 0) {
        const node = queue.shift()

        // if the node we visit is the exit we build the path and return it
        if (node === end) {
            const path = [end]

            // append all the parents until the entry node
            while (path[path.length - 1] !== start) {
                path.push(parent.get(path[path.length - 1]))
            }

            return path.reverse()
        }

        // a neighbor is a node we can move to from the current node
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor)
                parent.set(neighbor, node)
                queue.push(neighbor)
            }
        }
    }

    return null
}

console.log(findShortestPath(graph, 'A', 'B'))