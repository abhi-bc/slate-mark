## Plate (aka Slate) to Markdown
This plugin was originally forked from https://github.com/palerdot/slate-mark, which has a few bugs and hasn't been updated in quite a while. It works out of the box with [PlateJS](https://platejs.org), but still has quite a few bugs. Additionally, in Towns, we have implemented a few features that are not present in the original PlateJS plugin, e.g. @mentions, #channel-hashtags, and emoji support.

Following features were added to the original plugin:
1. Nested list support - both ordered and unordered. Initial plugin didn't support nested lists at all. Logic was re-written using depth-first search algorithm with a queue.
2. Code block support - initial plugin didn't support code blocks correctly
3. `@mentions` support for users
4. `#hashtags` support for channels
5. emoji support through lookup
6. Typescript fixes were added to work with latest PlateJS version

## Usage
```javascript
import { plateToMarkdownAsync } from './utils/slateToMD';

const onSend = async () => {
  const markdown = await plateToMarkdownAsync(editor.children);
  // send markdown to server
}
```

For more usage, see original README.md in the [original repo](https://github.com/palerdot/slate-mark)