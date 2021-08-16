import { NodeType, LeafChildren, SlateNode, isLeaf } from '../utils'
import { parseMarks } from './mark'

/* 
 'Code Block' detection

 {
    type: 'code_block',
    children: [
      {
        text: 'porumai code block',
      },
    ],
  },
 */
export function isCodeBlock(node: SlateNode): boolean {
  return isLeaf(node.children) && node.type === NodeType.CodeBlock
}

/*
 * Code Block (parser)
 *
 * Output:
 * ```
 * text
 * ```
 * \n
 */

function parse(input: LeafChildren) {
  const FENCE = '```'

  return `${FENCE}\n${parseMarks(input)}\n${FENCE}\n`
}

export default parse
