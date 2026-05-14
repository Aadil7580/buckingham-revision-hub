app.jsfunction App() {
  const [selectedModule, setSelectedModule] = React.useState(null);
  const modules = [
    { term: 'Term 1', name: 'Molecules, Genes and Disease', chapters: 11 },
    { term: 'Term 1', name: 'Tissues of the Body', chapters: 11 },
    { term: 'Term 1', name: 'Metabolism & Clinical Problem Solving 1', chapters: 11 },
    { term: 'Term 2', name: 'Musculoskeletal System', chapters: 11 },
    { term: 'Term 2', name: 'HaDPop', chapters: 11 },
    { term: 'Term 2', name: 'Infection', chapters: 11 },
    { term: 'Term 2', name: 'Mechanisms of Disease', chapters: 11 },
    { term: 'Term 3', name: 'Cardiovascular System', chapters: 11 },
    { term: 'Term 3', name: 'Urinary System', chapters: 11 },
    { term: 'Term 3', name: 'Respiratory System', chapters: 11 },
    { term: 'Term 3', name: 'Health Psychology and Diversity', chapters: 11 },
    { term: 'Term 4', name: 'Gastrointestinal System', chapters: 11 },
    { term: 'Term 4', name: 'Reproductive System', chapters: 11 },
    { term: 'Term 4', name: 'Principles of Pharmacology', chapters: 11 },
    { term: 'Term 5', name: 'HaDSoc', chapters: 11 },
    { term: 'Term 5', name: 'Nervous System', chapters: 11 },
    { term: 'Term 5', name: 'Head and Neck', chapters: 11 }
  ];

  if (selectedModule) {
    const mod = selectedModule;
    return (
      <div>
        <button onClick={() => setSelectedModule(null)}>\u2190 Back</button>
        <h2>{mod.name} - {mod.term}</h2>
        <ul>
          {Array.from({length: mod.chapters}, (_, i) => (
            <li key={i}>Chapter {i + 1}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1>Buckingham Revision Hub</h1>
      <p>Select a module:</p>
      <ul>
        {modules.map((mod, index) => (
          <li key={index} onClick={() => setSelectedModule(mod)}>
            {mod.term}: {mod.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
