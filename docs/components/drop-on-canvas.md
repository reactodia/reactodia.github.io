---
title: <DropOnCanvas />
---

# Drop on Canvas

[`<DropOnCanvas />`](/docs/api/workspace/functions/DropOnCanvas) component is a [canvas widget](/docs/components/canvas.md#widgets) to allow creating entity elements on the diagram by dragging then dropping a [URL (IRI)](/docs/concepts/data-provider.md#iri-and-rdf) to the canvas.

### Example: palette to drag annotations from

```tsx live noInline
function Palette() {
  const {model} = Reactodia.useWorkspace();
  const variants = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
  return (
    <Reactodia.ViewportDock dock='n'>
      <div style={{
        display: 'flex',
        gap: 5,
        padding: 5,
        background: 'var(--reactodia-background-color-surface)',
      }}>
        {variants.map(variant =>
          <a key={variant}
            href={`urn:my:annotation:${variant}`}
            className={`reactodia-note-annotation--variant-${variant}`}
            style={{
              width: 16,
              height: 16,
              borderWidth: 8,
              borderStyle: 'solid',
            }}
            onClick={e => { e.preventDefault(); }}
          />
        )}
      </div>
    </Reactodia.ViewportDock>
  );
}

function Example() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const getDroppedItems = React.useCallback(
    (e: Reactodia.CanvasDropEvent): Reactodia.DropOnCanvasItem[] => {
      return Reactodia.defaultGetDroppedOnCanvasItems(e).map(item => {
        if (
          item.type === 'element' &&
          item.element instanceof Reactodia.EntityElement
        ) {
          const match = /^urn:my:annotation:([a-z]+)$/.exec(item.element.iri);
          if (match) {
            const element = new Reactodia.AnnotationElement({
              elementState: Reactodia.TemplateState.empty
                .set(Reactodia.TemplateProperties.ColorVariant, match[1]),
            });
            return {...item, element};
          }
          return item;
        }
      });
    }
  );

  return (
    <div className='reactodia-live-editor'>
      <Reactodia.Workspace defaultLayout={defaultLayout}>
        <Reactodia.WorkspaceRoot>
          <Reactodia.Canvas>
            <Reactodia.AnnotationSupport />
            <Reactodia.Halo />
            <Reactodia.HaloLink />
            <Reactodia.Selection />
            <Reactodia.DropOnCanvas
              getDroppedItems={getDroppedItems}
            />
            <Palette />
          </Reactodia.Canvas>
        </Reactodia.WorkspaceRoot>
      </Reactodia.Workspace>
    </div>
  );
}

render(<Example />);
```
