import { LeafNode, NodeType, SlateNode } from '../utils'
import { parseMarks } from './mark'

type ListChild = {
  type: NodeType.ListChild
  children: LeafNode[]
}

type ListElement = {
  type: NodeType.List
  children: Array<ListChild | OrderedList | UnorderedList>
}

type OrderedList = SlateNode & {
  type: NodeType.OrderedList
  children: ListElement[]
}

type UnorderedList = SlateNode & {
  type: NodeType.UnorderedList
  children: ListElement[]
}
// const allListTypes = [NodeType.OrderedList, NodeType.UnorderedList, NodeType.ListChild, NodeType.List]

function isUnorderedList(node: SlateNode) {
  return node.type === NodeType.UnorderedList
}

function isOrderedList(node: SlateNode) {
  return node.type === NodeType.OrderedList
}

export function isList(node: SlateNode): boolean {
  return isUnorderedList(node) || isOrderedList(node)
}

const generateSpacedAsterisk = (nestLevel: number, isOrderedList = false, index = 1) => {
  const delimiter = isOrderedList ? `${index}. ` : '- '
  return ' '.repeat(nestLevel * 4) + delimiter
}

/*
 * List (parser)
 *
 * Ordered List:
 * 1) Item 1
 * 2) Item 2
 *   1) Item 2.1
 *   2) Item 2.2
 * 3) Item 3
 *
 * Unordered List:
 * * Item 1
 *   * Item 1.1
 *   * Item 1.2
 * * Item 2
 * * Item 3
 *
 */

type QueueElement = ListElement & { nestLevel: number; ordered: boolean; index: number }

const generateQueue = (rootNode: OrderedList | UnorderedList, nestLevel = 0): QueueElement[] => {
  return (rootNode.children as ListElement[]).map((li, index) => ({
    ...li,
    nestLevel,
    index: index + 1,
    ordered: rootNode.type === NodeType.OrderedList,
  }))
}

export const whileListMD = (rootNode: OrderedList | UnorderedList): string => {
  let result = '\n'
  const queue: QueueElement[] = generateQueue(rootNode)

  while (queue.length > 0) {
    const node = queue.shift() as QueueElement

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]

      if (child.type === NodeType.ListChild) {
        result += generateSpacedAsterisk(node.nestLevel, node.ordered, node.index) + parseMarks(child.children as LeafNode[]) + '\n'
      } else if ([NodeType.OrderedList, NodeType.UnorderedList].includes(child.type as NodeType)) {
        queue.unshift(...generateQueue(child, node.nestLevel + 1))
      }
    }
  }

  return result + '\n'
}

function parse(node: SlateNode): string {
  if (!isList(node)) {
    return ``
  }

  try {
    return whileListMD(node as OrderedList | UnorderedList)
  } catch (error) {
    console.log('Error in parsing list', error)
    return '\n'
  }
}

export default parse
