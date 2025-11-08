---
title: <AnnotationSupport />
---

# Annotation Support

[`<AnnotationSupport />`](/docs/api/workspace/functions/AnnotationSupport.md) component is a [canvas widget](/docs/components/canvas.md#widgets) to provide UI for the [annotation](/docs/concepts/graph-model.md#annotations) elements and links.

:::important
`<AnnotationSupport />` widget must be provided to the canvas to in order to enable annotation UI features such as creating a new annotation with [`<SelectionActionAnnotate />`](/docs/components/selection.md#selecting-elements), linking annotation to an element with [`<SelectionActionEstablishLink />`](/docs/components/selection.md#selecting-elements) or [`<LinkActionMoveEndpoint />`](/docs/components/selection.md#selecting-links).
:::

The component observes [`AnnotationTopic`](/docs/api/workspace/variables/AnnotationTopic.md) [command bus topic](/docs/concepts/event-system.md#command-bus).

### Example: annotation elements and links

```tsx live noInline
function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, view, performLayout} = context;
    const entity = model.createElement('http://example.com/entity1');
    const annotation1 = new Reactodia.AnnotationElement({
      elementState: Reactodia.TemplateState.empty
        .set(Reactodia.TemplateProperties.AnnotationContent, {
          type: 'plaintext',
          text: 'Double-click to edit\nnote about "entity1"',
        }),
    });
    const annotation2 = new Reactodia.AnnotationElement({
      elementState: Reactodia.TemplateState.empty
        .set(Reactodia.TemplateProperties.AnnotationContent, {
          type: 'plaintext',
          text: 'Note about entity AND annotation',
        })
        .set(Reactodia.TemplateProperties.ColorVariant, 'primary'),
    });
    model.addElement(annotation1);
    model.addElement(annotation2);
    model.addLink(new Reactodia.AnnotationLink({
      sourceId: annotation1.id,
      targetId: entity.id,
    }));
    model.addLink(new Reactodia.AnnotationLink({
      sourceId: annotation2.id,
      targetId: entity.id,
    }));
    model.addLink(new Reactodia.AnnotationLink({
      sourceId: annotation2.id,
      targetId: annotation1.id,
      linkState: Reactodia.TemplateState.empty
        .set(
          Reactodia.TemplateProperties.CustomLabel,
          'note about another note'
        ),
    }));
    await performLayout({signal});
  }, []);

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace ref={onMount}
        defaultLayout={defaultLayout}>
        <Reactodia.WorkspaceRoot>
          <Reactodia.Canvas>
            <Reactodia.Halo />
            <Reactodia.HaloLink />
            <Reactodia.Selection />
            <Reactodia.AnnotationSupport />
          </Reactodia.Canvas>
        </Reactodia.WorkspaceRoot>
      </Reactodia.Workspace>
    </div>
  );
}

render(<Example />);
```
