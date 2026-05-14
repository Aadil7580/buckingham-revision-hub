import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
const CheckCircle2 = () => <span>✅</span>;
const Circle = () => <span>⚪</span>;
const BookOpen = () => <span>📘</span>;
const BarChart3 = () => <span>📊</span>;
const SearchIcon = () => <span>🔍</span>;
const Brain = () => <span>🧠</span>;
const Target = () => <span>🎯</span>;
const Layers = () => <span>🧩</span>;
import { motion } from "framer-motion";

const makeChapters = (prefix, count = 11) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-c${i + 1}`,
    title: `Chapter ${i + 1}`,
    status: "not-started",
    questions: []
  }));

const initialModules = [
  {
    id: "t1-mgd",
    term: "Term 1",
    name: "Molecules, Genes and Disease",
    focus: true,
    chapters: [
      {
        id: "t1-mgd-c1",
        title: "Chapter 1 — Upload PDF to rename",
        status: "not-started",
        questions: [
          {
            type: "Recall",
            q: "Placeholder SBA: Which statement best matches this chapter’s core mechanism?",
            options: ["Option A", "Option B", "Option C", "Option D", "Option E"],
            answer: 0,
            explanation: "Once you upload the lecture PDF, this will become a proper UK MLA-style SBA with explanation."
          }
        ]
      },
      ...makeChapters("t1-mgd", 10).map((c, i) => ({ ...c, id: `t1-mgd-c${i + 2}`, title: `Chapter ${i + 2} — Upload PDF to rename` }))
    ]
  },
  { id: "t1-tissues", term: "Term 1", name: "Tissues of the Body", chapters: makeChapters("t1-tissues") },
  { id: "t1-metabolism", term: "Term 1", name: "Metabolism", chapters: makeChapters("t1-metabolism") },
  { id: "t1-cps1", term: "Term 1", name: "Clinical Problem Solving 1", chapters: makeChapters("t1-cps1") },

  { id: "t2-msk", term: "Term 2", name: "Musculoskeletal System", chapters: makeChapters("t2-msk") },
  { id: "t2-hadpop", term: "Term 2", name: "HaDPop", chapters: makeChapters("t2-hadpop") },
  { id: "t2-infection", term: "Term 2", name: "Infection", chapters: makeChapters("t2-infection") },
  { id: "t2-mod", term: "Term 2", name: "Mechanisms of Disease", chapters: makeChapters("t2-mod") },

  { id: "t3-cardio", term: "Term 3", name: "Cardiovascular System", chapters: makeChapters("t3-cardio") },
  { id: "t3-urinary", term: "Term 3", name: "Urinary System", chapters: makeChapters("t3-urinary") },
  { id: "t3-resp", term: "Term 3", name: "Respiratory System", chapters: makeChapters("t3-resp") },
  { id: "t3-hpd", term: "Term 3", name: "Health Psychology and Diversity", chapters: makeChapters("t3-hpd") },

  { id: "t4-gi", term: "Term 4", name: "Gastrointestinal System", chapters: makeChapters("t4-gi") },
  { id: "t4-repro", term: "Term 4", name: "Reproductive System", chapters: makeChapters("t4-repro") },
  { id: "t4-pharm", term: "Term 4", name: "Principles of Pharmacology", chapters: makeChapters("t4-pharm") },

  { id: "t5-hadsoc", term: "Term 5", name: "HaDSoc", chapters: makeChapters("t5-hadsoc") },
  { id: "t5-nervous", term: "Term 5", name: "Nervous System", chapters: makeChapters("t5-nervous") },
  { id: "t5-headneck", term: "Term 5", name: "Head and Neck", chapters: makeChapters("t5-headneck") }
];

const revisionModes = [
  "50–60 SBAs per chapter",
  "Pure Recall",
  "Clinical Application",
  "Mechanism Chains",
  "Integrated Pathology",
  "Investigation Interpretation",
  "2-Step UKMLA Thinking",
  "Daily Recall Builder"
];

const questionTypes = [
  { label: "Recall", icon: Brain, text: "Direct fact / definition" },
  { label: "Application", icon: Target, text: "Clinical use of concept" },
  { label: "2-layer", icon: Layers, text: "Mechanism + consequence" }
];

export default function BuckinghamRevisionTracker() {
  const [modules, setModules] = useState(initialModules);
  const [selectedModule, setSelectedModule] = useState("t1-mgd");
  const [selectedChapter, setSelectedChapter] = useState("t1-mgd-c1");
  const [search, setSearch] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const allChapters = modules.flatMap((m) => m.chapters.map((c) => ({ ...c, moduleName: m.name, term: m.term })));
  const completed = allChapters.filter((c) => c.status === "done").length;
  const reviewing = allChapters.filter((c) => c.status === "reviewing").length;
  const total = allChapters.length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  const currentModule = modules.find((m) => m.id === selectedModule);
  const filteredChapters = useMemo(() => {
    return (currentModule?.chapters || []).filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));
  }, [currentModule, search]);

  const currentChapter = currentModule?.chapters.find((c) => c.id === selectedChapter) || filteredChapters[0];

  function markChapter(status) {
    if (!currentChapter) return;
    setModules((prev) =>
      prev.map((m) =>
        m.id !== selectedModule
          ? m
          : { ...m, chapters: m.chapters.map((c) => (c.id === currentChapter.id ? { ...c, status } : c)) }
      )
    );
  }

  function chooseAnswer(questionIndex, optionIndex) {
    setSelectedAnswers((prev) => ({ ...prev, [`${currentChapter.id}-${questionIndex}`]: optionIndex }));
  }

  const terms = [...new Set(modules.map((m) => m.term))];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Buckingham MBChB Term 1–5 Revision Hub</h1>
              <p className="mt-2 text-slate-600">Core modules only. 18 modules × 11 chapters = 198 chapter slots. Built for high-intensity Buckingham UKMLA-style revision with recall + clinical application SBAs.</p>
            </div>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <BarChart3 className="h-8 w-8" />
                <div>
                  <p className="text-sm text-slate-500">Overall progress</p>
                  <p className="text-2xl font-bold">{percentage}%</p>
                  <p className="text-xs text-slate-500">{completed} done · {reviewing} reviewing · {total} total</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[330px_1fr]">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="space-y-5 p-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Core modules</p>
                <div className="space-y-4">
                  {terms.map((term) => (
                    <div key={term}>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">{term}</p>
                      <div className="space-y-2">
                        {modules.filter((m) => m.term === term).map((m) => (
                          <Button
                            key={m.id}
                            variant={selectedModule === m.id ? "default" : "outline"}
                            className="w-full justify-start rounded-xl text-left"
                            onClick={() => {
                              setSelectedModule(m.id);
                              setSelectedChapter(m.chapters[0]?.id);
                            }}
                          >
                            <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                            <span className="truncate">{m.name}</span>
                            {m.focus && <Badge className="ml-auto">Focus</Badge>}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="space-y-4 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{currentModule?.term}</p>
                    <h2 className="text-2xl font-bold text-slate-900">{currentModule?.name}</h2>
                    <p className="mt-1 text-sm text-slate-600">Each chapter will have its own PDF-based question bank: 50–60 UKMLA-style SBAs mixing recall, clinical application, mechanism integration, investigations, pathology links, and multi-step reasoning.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="rounded-xl" variant="outline" onClick={() => markChapter("reviewing")}>Mark Reviewing</Button>
                    <Button className="rounded-xl" onClick={() => markChapter("done")}>Mark Done</Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed bg-white p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Chapter PDF Upload Workflow</h3>
                      <p className="text-sm text-slate-500">Final goal: upload one lecture PDF into the selected chapter, then generate 50–60 chapter-specific UKMLA-style SBAs. Current ChatGPT preview cannot truly read uploaded files here yet, but the website structure is designed for that exact workflow.</p>
                    </div>
                    <Button className="rounded-xl">Upload PDF to Selected Chapter</Button>
                  </div>
                </div>

                <div className="rounded-2xl border bg-white p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Daily Recall</h3>
                      <p className="text-sm text-slate-500">Later this will pull short recall questions only from chapters you have already revised, so your daily review grows with your progress.</p>
                    </div>
                    <Button className="rounded-xl" variant="outline">Start Daily Recall</Button>
                  </div>
                </div>

                <div className="mb-2 flex flex-wrap gap-2">
                  {revisionModes.map((mode) => (
                    <Badge key={mode} className="rounded-full px-3 py-1">{mode}</Badge>
                  ))}
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {questionTypes.map(({ label, icon: Icon, text }) => (
                    <div key={label} className="rounded-2xl border bg-white p-3">
                      <div className="flex items-center gap-2 font-semibold"><Icon className="h-4 w-4" /> {label}</div>
                      <p className="mt-1 text-xs text-slate-500">{text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
              <Card className="rounded-2xl shadow-sm">
                <CardContent className="space-y-4 p-4">
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 text-slate-400"><SearchIcon /></div>
                    <Input className="rounded-xl pl-9" placeholder="Search chapters" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    {filteredChapters.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedChapter(c.id)}
                        className={`flex w-full items-center gap-2 rounded-xl border p-3 text-left text-sm transition ${selectedChapter === c.id ? "border-slate-900 bg-white" : "border-slate-200 bg-slate-50 hover:bg-white"}`}
                      >
                        {c.status === "done" ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                        <span>{c.title}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardContent className="space-y-5 p-5">
                  <div>
                    <p className="text-sm text-slate-500">Selected chapter</p>
                    <h3 className="text-xl font-semibold">{currentChapter?.title}</h3>
                  </div>

                  {currentChapter?.questions?.length ? (
                    currentChapter.questions.map((question, qi) => {
                      const selected = selectedAnswers[`${currentChapter.id}-${qi}`];
                      return (
                        <div key={qi} className="rounded-2xl border bg-white p-4">
                          <Badge variant="outline" className="mb-2">{question.type || "SBA"}</Badge>
                          <p className="font-medium">Q{qi + 1}. {question.q}</p>
                          <div className="mt-3 space-y-2">
                            {question.options.map((option, oi) => {
                              const isCorrect = selected !== undefined && oi === question.answer;
                              const isWrong = selected === oi && oi !== question.answer;
                              return (
                                <button
                                  key={oi}
                                  onClick={() => chooseAnswer(qi, oi)}
                                  className={`w-full rounded-xl border p-3 text-left text-sm ${isCorrect ? "border-green-500 bg-green-50" : isWrong ? "border-red-500 bg-red-50" : "border-slate-200 hover:bg-slate-50"}`}
                                >
                                  {String.fromCharCode(65 + oi)}. {option}
                                </button>
                              );
                            })}
                          </div>
                          {selected !== undefined && <p className="mt-3 text-sm text-slate-700"><strong>Explanation:</strong> {question.explanation}</p>}
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-2xl border border-dashed p-6 text-center text-slate-500">
                      Upload this chapter’s PDF/slides and I’ll add UK MLA-style questions here.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
