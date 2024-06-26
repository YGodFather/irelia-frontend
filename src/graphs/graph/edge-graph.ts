import { threadId } from "worker_threads";
import { Bag } from "../data-struct/bag";
import tinyEWG from './tinyEWG.txt?raw'
import mediumEWG from './mediumEWG.txt?raw'
export class EdgeWeightedDirectGraph {

    public V: number;
    public E: number;
    public adj: Bag<DirectedEdge>[]
    constructor() {
        const tinyEWGS = tinyEWG.split('\n')
        this.V = parseInt(tinyEWG[0], 10)
        this.E = parseInt(tinyEWG[1], 10)
        this.adj = Array.from({ length: this.V }, () => new Bag())
        for (let i = 2; i < tinyEWGS.length; i++) {
            const [v, w, weight] = tinyEWGS[i].split(' ').map(item => parseFloat(item))
            const edge = new DirectedEdge(v, w, weight)
            this.addEdge(edge)
        }
    }


    public addEdge(e: DirectedEdge): void {
        this.adj[e.from()].addItem(e)
        this.E++
    }


    public toString(): string {
        let s = this.V + " " + this.E + '\n'
        for (let v = 0; v < this.V; v++) {
            const bag = this.adj[v]
            let head = bag.head
            s += `${v}: `
            while (head) {
                s += `${head.val.toString()} `
                head = head.next
            }
            s += '\n'
        }
        return s
    }
}


export class EdgeWeightedGraph {

    public V: number;
    public E: number;
    public adj: Bag<Edge>[]
    constructor(size: string = 'tiny') {
        const data = size === 'tiny' ? tinyEWG : mediumEWG
        const datas = data.split('\n')
        this.V = parseInt(datas[0], 10)
        this.E = 0
        this.adj = Array.from({ length: this.V }, () => new Bag())
        for (let i = 2; i < datas.length; i++) {
            const [v, w, weight] = datas[i].split(' ').map(item => parseFloat(item))
            const edge = new Edge(v, w, weight)
            this.addEdge(edge)
        }
    }


    public addEdge(e: Edge): void {
        const v = e.either()
        const w = e.other(v)
        this.adj[v].addItem(e)
        this.adj[w].addItem(e)
        this.E++
    }

    public adjToArray(v: number) {
        const bag = this.adj[v]
        const vals = []
        let head = bag.head
        while (head) {
            vals.push(head.val)
            head = head.next
        }
        return vals
    }

    public toString(): string {
        let s = this.V + " " + this.E + '\n'
        for (let v = 0; v < this.V; v++) {
            const bag = this.adj[v]
            let head = bag.head
            s += `${v}: `
            while (head) {
                s += `${head.val.toString()} `
                head = head.next
            }
            s += '\n'
        }
        return s
    }
}


class DirectedEdge {
    public w: number;
    public v: number
    public weight: number;
    constructor(v: number, w: number, weight: number) {
        this.v = v
        this.w = w
        this.weight = weight
    }

    public from() {
        return this.v
    }

    public to() {
        return this.w
    }

    public toString() {
        return `${this.v} -> ${this.w} ${this.weight}`
    }
}

class SP {

    public graph: EdgeWeightedGraph
    public s: number

    constructor(graph: EdgeWeightedGraph, s: number) {
        this.graph = graph
        this.s = s
    }

    public distTo(v: number) {

    }

    public hasPathTo(v): boolean {
        return true
    }


}

export class Edge {
    private v: number
    private w: number
    private wieght: number
    constructor(v: number, w: number, wieght: number) {
        this.v = v
        this.w = w
        this.wieght = wieght
    }

    public either() {
        return this.v
    }

    public getWeight() {
        return this.wieght
    }

    public other(v: number) {
        if (v === this.v) return this.w
        else if (v === this.w) return this.v
        else throw new Error('Inconsistent edge')
    }

    public compareTo(that: Edge) {
        if (this.getWeight() < that.getWeight()) return -1
        else if (this.getWeight() > that.getWeight()) return 1
        else return 0
    }

    public toString() {
        return `${this.v} - ${this.w} ${this.wieght}`
    }

}

export function initEWD() {
    const graph = new EdgeWeightedGraph()
    console.log(graph.toString())
}