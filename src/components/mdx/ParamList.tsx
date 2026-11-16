import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode
} from 'react';

const isElement = (
  node: ReactNode
): node is ReactElement<{ children?: ReactNode }> => isValidElement(node);

const parseStringTerm = (value: string) => {
  const match = value.match(/^\s*['"]([^'"]+)['"]:\s*(.*)$/s);
  if (!match) return null;
  return { term: match[1], rest: match[2] };
};

const splitTerm = (children: ReactNode) => {
  const nodes = Children.toArray(children);
  const [first, second, ...tail] = nodes;

  if (typeof first === 'string') {
    const parsed = parseStringTerm(first);
    if (!parsed) return null;
    return {
      term: parsed.term,
      rest: [parsed.rest, second, ...tail].filter(Boolean)
    };
  }

  return null;
};

const splitListItem = (item: ReactElement<{ children?: ReactNode }>) => {
  const itemChildren = Children.toArray(item.props.children);
  const [first, ...tail] = itemChildren;

  if (isElement(first) && first.type === 'p') {
    const parsed = splitTerm(first.props.children);
    if (!parsed) return null;
    return {
      term: parsed.term,
      description: [
        parsed.rest.length > 0 ? <p key="term">{parsed.rest}</p> : null,
        ...tail
      ].filter(Boolean)
    };
  }

  const parsed = splitTerm(itemChildren);
  if (!parsed) return null;
  return {
    term: parsed.term,
    description: parsed.rest
  };
};

const collectEntries = (children: ReactNode) => {
  const entries: Array<{ term: string; description: ReactNode[] }> = [];

  const visit = (nodes: ReactNode, inListContainer = false) => {
    for (const child of Children.toArray(nodes)) {
      if (!isElement(child)) continue;

      const parsed = splitListItem(child);
      if (parsed) {
        entries.push(parsed);
        continue;
      }

      const childElements = Children.toArray(child.props.children).filter(
        isElement
      );
      const hasDirectItems = childElements.some(item => !!splitListItem(item));
      if (hasDirectItems) {
        visit(child.props.children, true);
        continue;
      }

      if (inListContainer && entries.length > 0) {
        entries[entries.length - 1].description.push(child);
        continue;
      }

      visit(child.props.children, false);
    }
  };

  visit(children);
  return entries;
};

/**
 * Turns a list of `- 'Name': description` items into a definition list.
 */
export const ParamList = (props: { children: ReactNode }) => (
  <dl>
    {collectEntries(props.children).map((entry, index) => (
      <Fragment key={index}>
        <dt>{entry.term}</dt>
        <dd>{entry.description}</dd>
      </Fragment>
    ))}
  </dl>
);
