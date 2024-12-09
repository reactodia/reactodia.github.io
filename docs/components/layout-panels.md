---
title: Layout Panels
---

# Resizable and Collapsible Layout Panels

Reactodia provides layout panel components to display a row or a column of resizable and collapsible sub-components in a accordion-like view:

| Layout panel component | Description |
|------------------------|-------------|
| [WorkspaceLayoutRow](/docs/api/workspace/functions/WorkspaceLayoutRow) | Displays a horizontal row with resizable child columns or items which can be expanded or collapsed. |
| [WorkspaceLayoutColumn](/docs/api/workspace/functions/WorkspaceLayoutColumn) | Displays a vertical accordion column with resizable child items which can be expanded or collapsed. |
| [WorkspaceLayoutItem](/docs/api/workspace/functions/WorkspaceLayoutItem) | Displays a child component within the layout row or column. |

### Example: layout with central area and side columns

```tsx live
function SomeLayout() {
  return (
    <div style={{height: '300px'}}>
      <Reactodia.WorkspaceLayoutRow>
        <Reactodia.WorkspaceLayoutColumn>
          <Reactodia.WorkspaceLayoutItem heading='First'>
            First item
          </Reactodia.WorkspaceLayoutItem>
          <Reactodia.WorkspaceLayoutItem heading='Second'>
            Second item
          </Reactodia.WorkspaceLayoutItem>
          <Reactodia.WorkspaceLayoutItem heading='Third'>
            Third item
          </Reactodia.WorkspaceLayoutItem>
        </Reactodia.WorkspaceLayoutColumn>
        <Reactodia.WorkspaceLayoutItem>
          Central area
        </Reactodia.WorkspaceLayoutItem>
        <Reactodia.WorkspaceLayoutColumn>
          <Reactodia.WorkspaceLayoutItem heading='Only item in right panel'>
            Right panel
          </Reactodia.WorkspaceLayoutItem>
        </Reactodia.WorkspaceLayoutColumn>
      </Reactodia.WorkspaceLayoutRow>
    </div>
  )
}
```
