export function ButtonToggle(props: {
  states: readonly string[];
  value: string;
  onChange: (nextValue: string) => void;
}) {
  const {states, value, onChange} = props;
  return (
    <div className='reactodia-btn reactodia-btn-group'>
      {states.map(state =>
        <button key={state}
          type='button'
          className={`reactodia-btn reactodia-btn-default ${value === state ? 'active' : ''}`}
          onClick={() => onChange(state)}>
          {state}
        </button>
      )}
    </div>
  );
}
