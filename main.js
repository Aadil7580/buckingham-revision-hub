function App() {
  const [moduleIndex, setModuleIndex] = React.useState(null);
  const [chapterIndex, setChapterIndex] = React.useState(null);

  const modules = [
    { id: 't1-mgd', term: 'Term 1', name: 'Molecules, Genes and Disease', chapters: 11 },
    { id: 't1-tissues', term: 'Term 1', name: 'Tissues of the Body', chapters: 11 },
    { id: 't1-metabolism', term: 'Term 1', name: 'Metabolism', chapters: 11 },
    { id: 't1-cps1', term: 'Term 1', name: 'Clinical Problem Solving 1', chapters: 11 },
    { id: 't2-msk', term: 'Term 2', name: 'Musculoskeletal System', chapters: 11 },
    { id: 't2-hadpop', term: 'Term 2', name: 'HaDPop', chapters: 11 },
    { id: 't2-infection', term: 'Term 2', name: 'Infection', chapters: 11 },
    { id: 't2-mod', term: 'Term 2', name: 'Mechanisms of Disease', chapters: 11 },
    { id: 't3-cardio', term: 'Term 3', name: 'Cardiovascular System', chapters: 11 },
    { id: 't3-urinary', term: 'Term 3', name: 'Urinary System', chapters: 11 },
    { id: 't3-respiratory', term: 'Term 3', name: 'Respiratory System', chapters: 11 },
    { id: 't3-hpd', term: 'Term 3', name: 'Health Psychology and Diversity', chapters: 11 },
    { id: 't4-gi', term: 'Term 4', name: 'Gastrointestinal System', chapters: 11 },
    { id: 't4-repro', term: 'Term 4', name: 'Reproductive System', chapters: 11 },
    { id: 't4-pharm', term: 'Term 4', name: 'Principles of Pharmacology', chapters: 11 },
    { id: 't5-hadsoc', term: 'Term 5', name: 'HaDSoc', chapters: 11 },
    { id: 't5-neuro', term: 'Term 5', name: 'Nervous System', chapters: 11 },
    { id: 't5-headneck', term: 'Term 5', name: 'Head and Neck', chapters: 11 },
  ];

  if (moduleIndex !== null && chapterIndex !== null) {
    const module = modules[moduleIndex];
    return (
      <div>
        <button onClick={() => setChapterIndex(null)}>\u2190 Back to Chapters</button>
        <h2>{module.name} – Chapter {chapterIndex + 1}</h2>
        <p>Once you upload the lecture PDF, this will be populated with questions.</p>
      </div>
    );
  }

  if (moduleIndex !== null) {
    const module = modules[moduleIndex];
    return (
      <div>
        <button onClick={() => setModuleIndex(null)}>\u2190 Back to Modules</button>
        <h2>{module.name} ({module.term})</h2>
        <ul>
          {Array.from({ length: module.chapters }, (_, i) => (
            <li key={i}>
              <button onClick={() => setChapterIndex(i)}>Chapter {i + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1>Buckingham MBChB Revision Hub</h1>
      <p>Select a module:</p>
      <ul>
        {modules.map((mod, index) => (
          <li key={mod.id}>
            <button onClick={() => setModuleIndex(index)}>
              {mod.term}: {mod.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
