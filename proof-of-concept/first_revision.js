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

class Maze {
    constructor(graph, value) {
        this.graph = graph
        this.value = value
        this.parent = null
    }

    isEqual(node) {
        if (node instanceof Maze) {
            return this.value === node.value
        }

        return this.value === node
    }

    isExit(node) {
        return this.value === node
    }

    extend() {
        let children = this.graph[this.value].map(child => new Maze(this.graph, child))

        for (let child of children) {
            child.parent = this
        }

        return children
    }

    findPath() {
        let path = []
        let currentNode = this

        while (currentNode.parent !== null) {
            path.unshift(currentNode.value)
            currentNode = currentNode.parent
        }

        path.unshift(currentNode.value)

        return path
    }

    toString() {
        let totalPath = this.findPath()
        let path = ''

        for (let index = 0; index < totalPath.length; index++) {
            if (index === totalPath.length - 1)
                path += `${totalPath[index]} `
            else
                path += `${totalPath[index]} -> `
        }

        return `${path}\nPath length: ${totalPath.length - 1}`
    }
}

class BFS {
    constructor(graph, exit) {
        this.graph = graph
        this.exit = exit
        this.stack = [this.graph]
        this.checked = []
        this.path = []
    }

    insert(node) {
        this.stack.push(node)
    }

    remove() {
        const firstNode = this.stack.shift()
        this.checked.push(firstNode)

        return firstNode
    }

    isEmpty() {
        if (this.stack.length === 0) return true

        return false
    }

    search() {
        while(true) {
            if (this.isEmpty()) {
                console.log('No solution found')
                break
            }

            const selectedNode = this.remove()

            if (selectedNode.isExit(this.exit)) {
                console.log(selectedNode.toString())
                break
            }

            const newNodes = selectedNode.extend()

            if (newNodes.length > 0) {
                for (const newNode of newNodes) {
                    if (!this.stack.includes(newNode) && !this.checked.includes(newNode)) {
                        this.insert(newNode)
                    }
                }
            }
        }
    }
}

const maze = new Maze(graph, "A")
const bfs = new BFS(maze, "B")
bfs.search()