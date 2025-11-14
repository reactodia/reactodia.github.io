---
title: <Selection />, <Halo /> and <HaloLink />
---

# Halo and Selection

There are several [canvas widget](/docs/components/canvas.md#widgets) components which can be used to display actions on the selected diagram elements or links.

## Selecting elements

[`<Halo />`](/docs/api/workspace/functions/Halo) widget allows selecting a single element to perform an element action on it.

[`<Selection />`](/docs/api/workspace/functions/Selection) widget allows selecting more than one element via rectangular selection box to move them together and perform an element action on them.

There are several built-in element actions that can be used:
| Action component | Description |
|------------------|-------------|
| [`<SelectionAction />`](/docs/api/workspace/functions/SelectionAction.md) | Base component to display a custom element action. |
| [`<SelectionActionSpinner />`](/docs/api/workspace/functions/SelectionActionSpinner.md) | Displays a loading spinner (useful as building block for other action components). |
| [`<SelectionActionRemove />`](/docs/api/workspace/functions/SelectionActionRemove.md) | [Removes an element](/docs/api/workspace/classes/EditorController.md#removeitems) from the diagram. |
| [`<SelectionActionZoomToFit />`](/docs/api/workspace/functions/SelectionActionZoomToFit.md) | Zooms-in or zooms-out the viewport to [fit](/docs/api/workspace/interfaces/CanvasApi.md#zoomtofit) all selected elements. |
| [`<SelectionActionLayout />`](/docs/api/workspace/functions/SelectionActionLayout.md) | Performs graph layout algorithm on the sub-graph formed from the selected elements. |
| [`<SelectionActionExpand />`](/docs/api/workspace/functions/ToolbarActionExport.md) | Toggles expanded state for the selected elements. |
| [`<SelectionActionAnchor />`](/docs/api/workspace/functions/SelectionActionAnchor.md) | Displays a link to the entity IRI. |
| [`<SelectionActionConnections />`](/docs/api/workspace/functions/SelectionActionConnections.md) | Opens the [connections menu](/docs/components/connections-menu.md) for the selected entities. |
| [`<SelectionActionAddToFilter />`](/docs/api/workspace/functions/SelectionActionAddToFilter.md) | Adds the selected entity to the [instances search](/docs/components/instances-search.md) filter. |
| [`<SelectionActionGroup />`](/docs/api/workspace/functions/SelectionActionGroup.md) | [Groups or ungroups](/docs/api/workspace/functions/groupEntities.md) selected elements. |
| [`<SelectionActionEstablishLink />`](/docs/api/workspace/functions/SelectionActionEstablishLink.md) | Starts creating a [relation](/docs/concepts/graph-authoring.md) or [annotation link](/docs/concepts/graph-model.md#annotations) to an element by dragging it. |
| [`<SelectionActionAnnotate />`](/docs/api/workspace/functions/SelectionActionAnnotate.md) | Creates a new [annotaion](/docs/api/workspace/classes/AnnotationElement.md) connected to the selected elements. |

## Selecting links

[`<HaloLink />`](/docs/api/workspace/functions/HaloLink) widget allows selecting a single link to perform a link action on it.

There are several built-in link actions that can be used:
| Action component | Description |
|------------------|-------------|
| [`<LinkAction />`](/docs/api/workspace/functions/LinkAction.md) | Base component to display an action on the selected link. <br/>[`useLinkActionContext()`](/docs/api/workspace/functions/useLinkActionContext.md) hook can be used to get additional context for the selected link, including path geometry. |
| [`<LinkActionSpinner />`](/docs/api/workspace/functions/LinkActionSpinner.md) | Displays a loading spinner (useful as building block for other action components). |
| [`<LinkActionEdit />`](/docs/api/workspace/functions/LinkActionEdit.md) | Starts [editing the relation](/docs/concepts/graph-authoring.md). |
| [`<LinkActionDelete />`](/docs/api/workspace/functions/LinkActionDelete.md) | Deletes the [relation](/docs/concepts/graph-authoring.md) or [annotation link](/docs/concepts/graph-model.md#annotations). |
| [`<LinkActionMoveEndpoint />`](/docs/api/workspace/functions/LinkActionMoveEndpoint.md) | Displays a handle which allows to change the [relation](/docs/concepts/graph-authoring.md) or [annotation link](/docs/concepts/graph-model.md#annotations) by moving its endpoint (source or target) to another element. |
| [`<LinkActionRename />`](/docs/api/workspace/functions/LinkActionRename.md) | Starts [renaming a link](/docs/api/workspace/interfaces/RenameLinkProvider.md) (change the label on the diagram only). |

## Styles

The component look can be customized using the following CSS properties (see [design system](/docs/concepts/design-system.mdx) for more information):

| Property | Description |
|----------|-------------|
| `--reactodia-selection-icon-filter`  | [CSS filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) for the element selection action icons. |
| `--reactodia-selection-link-color`   | Link path highlight color when a link is selected. |
| `--reactodia-selection-multiple-box-shadow` | Box shadow for the selection rectangle with multiple elements. |
| `--reactodia-selection-single-box-color` | Rectangle border color for selection with a single element. |
| `--reactodia-selection-single-box-margin` | Margin from the element bounds for the selection rectange with a single element. |
| `--reactodia-selection-single-box-shadow` | Box shadow for the selection rectangle with a single element. |
