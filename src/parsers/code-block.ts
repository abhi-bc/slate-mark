import { NodeType, SlateNode, isLeaf, Children, recurseParse, LeafNode } from '../utils'
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
  return node.type === NodeType.CodeBlock
}

export function isCodeLine(node: SlateNode): boolean {
  return isLeaf(node.children) && node.type === NodeType.CodeLine
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

function parse(input: Children): string {
  const FENCE = '```'
  const content = recurseParse(input)

  // IMPORTANT: insert two new lines to prevent
  // following blank lines to be included in codeblock

  return `${FENCE}\n${content}\n${FENCE}\n\n`
}

export function parseCodeLine(node: SlateNode): string {
  return parseMarks(node.children as LeafNode[]) + '\n'
}

export default parse
