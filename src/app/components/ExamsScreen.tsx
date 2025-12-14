import { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react';

interface ExamsScreenProps {
  onNavigate: (screen: string) => void;
}

interface ExamCategory {
  id: string;
  name: string;
  exams: Exam[];
  expanded: boolean;
}

interface Exam {
  id: string;
  subject: string;
  units: Unit[];
  expanded: boolean;
}

interface Unit {
  id: string;
  name: string;
  topics: string[];
  expanded: boolean;
}

export default function ExamsScreen({ onNavigate }: ExamsScreenProps) {
  const [categories, setCategories] = useState<ExamCategory[]>([
    {
      id: '1',
      name: 'Semester Exams',
      expanded: true,
      exams: [
        {
          id: '1-1',
          subject: 'Data Structures',
          expanded: false,
          units: [
            { id: '1-1-1', name: 'Unit 1: Arrays & Linked Lists', topics: ['Array basics', 'Linked list operations', 'Circular lists'], expanded: false },
            { id: '1-1-2', name: 'Unit 2: Stacks & Queues', topics: ['Stack implementation', 'Queue types', 'Applications'], expanded: false },
            { id: '1-1-3', name: 'Unit 3: Trees', topics: ['Binary trees', 'BST', 'Traversals'], expanded: false },
          ],
        },
        {
          id: '1-2',
          subject: 'Database Management',
          expanded: false,
          units: [
            { id: '1-2-1', name: 'Unit 1: Introduction', topics: ['DBMS concepts', 'ER diagrams', 'Normalization'], expanded: false },
            { id: '1-2-2', name: 'Unit 2: SQL', topics: ['DDL commands', 'DML commands', 'Joins'], expanded: false },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Competitive Exams',
      expanded: false,
      exams: [
        {
          id: '2-1',
          subject: 'GATE Preparation',
          expanded: false,
          units: [
            { id: '2-1-1', name: 'Algorithms', topics: ['Sorting', 'Searching', 'Graph algorithms'], expanded: false },
          ],
        },
      ],
    },
  ]);

  const toggleCategory = (categoryId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
      )
    );
  };

  const toggleExam = (categoryId: string, examId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              exams: cat.exams.map(exam =>
                exam.id === examId ? { ...exam, expanded: !exam.expanded } : exam
              ),
            }
          : cat
      )
    );
  };

  const toggleUnit = (categoryId: string, examId: string, unitId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              exams: cat.exams.map(exam =>
                exam.id === examId
                  ? {
                      ...exam,
                      units: exam.units.map(unit =>
                        unit.id === unitId ? { ...unit, expanded: !unit.expanded } : unit
                      ),
                    }
                  : exam
              ),
            }
          : cat
      )
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1617565084799-c4c60ea9ad7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJjaG1lbnQlMjBwYXBlciUyMHRleHR1cmV8ZW58MXx8fHwxNzY1NzQzOTczfDA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 rounded-lg bg-card/80 backdrop-blur-sm hover:bg-card transition-colors border border-primary/20"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>

          <h1 
            className="text-primary"
            style={{ 
              fontFamily: "'Parisienne', cursive",
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            Exams
          </h1>

          <div className="w-10" />
        </div>

        {/* Nested collapsible structure */}
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-primary/5 transition-colors"
              >
                <span 
                  className="text-sm text-primary"
                  style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}
                >
                  {category.name}
                </span>
                <ChevronRight 
                  className={`w-4 h-4 text-muted-foreground transition-transform ${category.expanded ? 'rotate-90' : ''}`}
                />
              </button>

              {/* Exams */}
              {category.expanded && (
                <div className="border-t border-primary/10">
                  {category.exams.map(exam => (
                    <div key={exam.id} className="border-b border-primary/5 last:border-b-0">
                      <button
                        onClick={() => toggleExam(category.id, exam.id)}
                        className="w-full px-6 py-2.5 flex items-center justify-between hover:bg-primary/5 transition-colors"
                      >
                        <span 
                          className="text-sm"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {exam.subject}
                        </span>
                        <ChevronDown 
                          className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${exam.expanded ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Units */}
                      {exam.expanded && (
                        <div className="bg-muted/10">
                          {exam.units.map(unit => (
                            <div key={unit.id}>
                              <button
                                onClick={() => toggleUnit(category.id, exam.id, unit.id)}
                                className="w-full px-8 py-2 flex items-center justify-between hover:bg-primary/5 transition-colors"
                              >
                                <span 
                                  className="text-xs"
                                  style={{ fontFamily: "'Lora', serif" }}
                                >
                                  {unit.name}
                                </span>
                                <ChevronDown 
                                  className={`w-3 h-3 text-muted-foreground transition-transform ${unit.expanded ? 'rotate-180' : ''}`}
                                />
                              </button>

                              {/* Topics */}
                              {unit.expanded && (
                                <div className="px-10 py-2 space-y-1 bg-muted/20">
                                  {unit.topics.map((topic, idx) => (
                                    <div 
                                      key={idx}
                                      className="text-xs text-muted-foreground py-1"
                                      style={{ fontFamily: "'Lora', serif" }}
                                    >
                                      • {topic}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
