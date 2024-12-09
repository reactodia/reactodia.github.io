# Unified Search

[UnifiedSearch](/docs/api/workspace/functions/UnifiedSearch.md) is a component to display a search input with a dropdown for results.

One or many available search sections (providers) can be specified:

| Section component | Description |
|-------------------|-------------|
| [SearchSectionElementTypes](/docs/api/workspace/functions/SearchSectionElementTypes.md) | Allows to lookup entity types displayed in the tree form and create new entities in [authoring mode](/docs/concepts/graph-authoring.md). |
| [SearchSectionEntities](/docs/api/workspace/functions/SearchSectionEntities.md) | Allows to lookup entities using [data provider](/docs/concepts/data-provider.md). |
| [SearchSectionLinkTypes](/docs/api/workspace/functions/SearchSectionLinkTypes.md) | Allows to lookup displayed link types and change their [visibility settings](/docs/api/workspace/classes/DiagramModel.md#getlinkvisibility). |

[useUnifiedSearchSection()](/docs/api/workspace/functions/useUnifiedSearchSection.md) hook can be used to implement a custom search section.
