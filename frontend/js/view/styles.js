// Pure style builders for the sidebar controls. No state, just inputs -> style
// objects the template binds to.
window.GraphExplorer = window.GraphExplorer || {};

(function () {
  const C = () => GraphExplorer.constants;

  function baseButton() {
    return {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      width: '100%', padding: '11px 13px', borderRadius: '9px',
      font: "500 13px/1 'Helvetica Neue',Arial,sans-serif", cursor: 'pointer',
      border: '1px solid #e7e7e3', background: '#fff', color: '#27272a',
    };
  }

  function activeButton() {
    const { accent, softAccent } = C();
    return { ...baseButton(), border: '1px solid ' + accent, background: softAccent, color: 'oklch(0.48 0.15 264)' };
  }

  function modeButton(active) {
    return active ? activeButton() : baseButton();
  }

  function deleteButton(canDelete) {
    return canDelete
      ? { ...baseButton(), borderColor: '#f0d9d9', color: 'oklch(0.5 0.16 25)' }
      : { ...baseButton(), opacity: 0.42, cursor: 'default' };
  }

  function physicsButton(on) {
    const { accent, softAccent } = C();
    return {
      flex: '1', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
      padding: '9px 12px', borderRadius: '8px',
      border: '1px solid ' + (on ? accent : '#e7e7e3'),
      background: on ? softAccent : '#fff',
      color: on ? 'oklch(0.48 0.15 264)' : '#76766f',
      font: "500 12px/1 'Helvetica Neue',Arial,sans-serif", cursor: 'pointer',
    };
  }

  function pathRow(active) {
    const { accent, softAccent } = C();
    return active
      ? { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', border: '1px solid ' + accent, background: softAccent }
      : { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #eeeeec', background: '#fff' };
  }

  GraphExplorer.styles = { baseButton, activeButton, modeButton, deleteButton, physicsButton, pathRow };
})();
