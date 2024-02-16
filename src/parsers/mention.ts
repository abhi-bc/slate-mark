import { NodeType, SlateNode } from '../utils'

export function isMention(node: SlateNode): boolean {
  return node.type === NodeType.Mention
}

function parse(node: SlateNode): string {
  if (typeof node.value === 'string') {
    return node.value
  }
  return ''
}

export default parse