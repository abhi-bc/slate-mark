import { NodeType, recurseParse, SlateNode } from '../utils'

export function isLink(node: SlateNode): boolean {
  return node.type === NodeType.Link
}

function parse(node: SlateNode): string {
  const url = node.url
  const text = recurseParse(node.children)
  return `[${text}](${url})`
}

export default parse