/*
  # Insert exam questions for all modules

  1. Programming Basics Questions (20)
  2. JavaScript Questions (20)  
  3. React Questions (20)
*/

-- Get module IDs
DO $$
DECLARE
  programming_basics_id uuid;
  javascript_id uuid;
  react_id uuid;
BEGIN
  -- Get module IDs
  SELECT id INTO programming_basics_id FROM modules WHERE title = 'Programming Basics';
  SELECT id INTO javascript_id FROM modules WHERE title = 'JavaScript';
  SELECT id INTO react_id FROM modules WHERE title = 'React';

  -- Insert Programming Basics questions
  INSERT INTO questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (programming_basics_id, 'Which of the following is a valid variable name?', '1value', 'value1', 'value-1', '#value', 'b', 1),
    (programming_basics_id, 'What is the output of 5 % 2?', '2', '2.5', '1', '0', 'c', 2),
    (programming_basics_id, 'Which data structure works on FIFO principle?', 'Stack', 'Queue', 'Linked List', 'Tree', 'b', 3),
    (programming_basics_id, 'Which sorting algorithm has the best average case time complexity?', 'Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort', 'c', 4),
    (programming_basics_id, 'Which of these is not an OOP principle?', 'Encapsulation', 'Abstraction', 'Inheritance', 'Compilation', 'd', 5),
    (programming_basics_id, 'In programming, recursion means:', 'Function calling itself', 'Loop inside loop', 'Using multiple classes', 'Infinite loop', 'a', 6),
    (programming_basics_id, 'Which language is known as "mother of all languages"?', 'C', 'Java', 'Python', 'Pascal', 'a', 7),
    (programming_basics_id, 'Which search works only on sorted arrays?', 'Linear search', 'Binary search', 'Hashing', 'BFS', 'b', 8),
    (programming_basics_id, 'Which operator is used to allocate memory in C++?', 'malloc', 'new', 'create', 'alloc', 'b', 9),
    (programming_basics_id, 'The size of int in most 64-bit compilers is:', '2 bytes', '4 bytes', '8 bytes', 'Depends on system', 'b', 10),
    (programming_basics_id, 'Which data structure is used in DFS?', 'Queue', 'Stack', 'Heap', 'Graph', 'b', 11),
    (programming_basics_id, 'Which is not a linear data structure?', 'Array', 'Stack', 'Tree', 'Queue', 'c', 12),
    (programming_basics_id, 'Which language is platform-independent?', 'C++', 'Java', 'Assembly', 'C', 'b', 13),
    (programming_basics_id, 'In C, printf is defined in:', 'iostream.h', 'stdio.h', 'conio.h', 'math.h', 'b', 14),
    (programming_basics_id, 'What is time complexity of accessing element in array?', 'O(1)', 'O(n)', 'O(log n)', 'O(n²)', 'a', 15),
    (programming_basics_id, 'Which of these is NOT a programming paradigm?', 'Procedural', 'Object-Oriented', 'Functional', 'Derivative', 'd', 16),
    (programming_basics_id, 'Which of these is immutable?', 'Array', 'String', 'Linked List', 'Stack', 'b', 17),
    (programming_basics_id, 'Which file extension is used for Java?', '.jav', '.class', '.java', '.js', 'c', 18),
    (programming_basics_id, 'Which of these is a low-level language?', 'Python', 'Java', 'Assembly', 'C#', 'c', 19),
    (programming_basics_id, 'What is Big-O of bubble sort worst case?', 'O(n)', 'O(n log n)', 'O(n²)', 'O(1)', 'c', 20);

  -- Insert JavaScript questions
  INSERT INTO questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (javascript_id, 'Which of the following is NOT a JavaScript data type?', 'Number', 'Boolean', 'Character', 'Undefined', 'c', 1),
    (javascript_id, 'typeof null returns:', '"null"', '"undefined"', '"object"', '"boolean"', 'c', 2),
    (javascript_id, 'Which keyword is block-scoped?', 'var', 'let', 'static', 'global', 'b', 3),
    (javascript_id, 'What is output of "5" + 3?', '8', '"53"', '15', 'Error', 'b', 4),
    (javascript_id, 'Which operator checks value & type?', '==', '===', '=', '!==', 'b', 5),
    (javascript_id, 'Convert JSON string to object:', 'JSON.toObject()', 'JSON.parse()', 'JSON.stringify()', 'parseJSON()', 'b', 6),
    (javascript_id, 'What is output of [1,2]==[1,2]?', 'true', 'false', 'error', 'undefined', 'b', 7),
    (javascript_id, 'Closures allow:', 'Inner function to access outer variables', 'Private variables only', 'Only async execution', 'None', 'a', 8),
    (javascript_id, 'NaN stands for:', 'Not a Null', 'Not a Number', 'Null and Null', 'None', 'b', 9),
    (javascript_id, 'Which function is asynchronous?', 'setTimeout', 'console.log', 'parseInt', 'eval', 'a', 10),
    (javascript_id, 'Which ES6 feature allows default function params?', 'Template strings', 'Arrow functions', 'Default parameters', 'Destructuring', 'c', 11),
    (javascript_id, 'Spread operator is represented as:', '...', '::', '**', '=>', 'a', 12),
    (javascript_id, 'Which array method modifies the original array?', 'map', 'filter', 'slice', 'splice', 'd', 13),
    (javascript_id, 'Which object is global in Node.js?', 'window', 'global', 'document', 'process', 'b', 14),
    (javascript_id, 'What is event bubbling?', 'Event goes from child to parent', 'Parent to child', 'Event destroyed immediately', 'None', 'a', 15),
    (javascript_id, 'Which is a Promise state?', 'Running', 'Pending', 'Loading', 'Restarting', 'b', 16),
    (javascript_id, 'const obj = {a:1}; obj.a=2; → Valid?', 'Yes', 'No', 'Throws error', 'Undefined', 'a', 17),
    (javascript_id, 'Which keyword stops execution inside loop?', 'stop', 'break', 'exit', 'return', 'b', 18),
    (javascript_id, 'Which method is used to merge arrays?', 'push', 'concat', 'join', 'reduce', 'b', 19),
    (javascript_id, 'Which statement defines a function?', 'def', 'fun', 'function', 'fn', 'c', 20);

  -- Insert React questions
  INSERT INTO questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (react_id, 'In React, data is passed from parent to child using:', 'state', 'props', 'hooks', 'context', 'b', 1),
    (react_id, 'Hook for side effects:', 'useState', 'useEffect', 'useMemo', 'useRef', 'b', 2),
    (react_id, 'Virtual DOM is:', 'Copy of real DOM in memory', 'Debugging tool', 'Browser cache', 'None', 'a', 3),
    (react_id, 'Which is NOT a React hook?', 'useState', 'useEffect', 'useFetch', 'useRef', 'c', 4),
    (react_id, 'Keys in React help:', 'Style components', 'Identify list items for re-render', 'Create state', 'Handle props', 'b', 5),
    (react_id, 'State in React is:', 'Immutable', 'Mutable', 'Temporary variable', 'Prop alias', 'a', 6),
    (react_id, 'JSX stands for:', 'JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'None', 'a', 7),
    (react_id, 'Which function updates state in class component?', 'updateState', 'setState', 'changeState', 'this.update', 'b', 8),
    (react_id, 'Which hook is used for performance optimization?', 'useEffect', 'useMemo', 'useState', 'useContext', 'b', 9),
    (react_id, 'Context API avoids:', 'State', 'Prop drilling', 'Lifecycle methods', 'Hooks', 'b', 10),
    (react_id, 'Which lifecycle method runs after component mounts?', 'componentDidMount', 'componentWillUnmount', 'render', 'shouldComponentUpdate', 'a', 11),
    (react_id, 'React Router <Link> is used for:', 'Styling', 'Navigation', 'State management', 'Animations', 'b', 12),
    (react_id, 'React is maintained by:', 'Google', 'Facebook', 'Microsoft', 'Apple', 'b', 13),
    (react_id, 'Which is not a valid React component type?', 'Functional', 'Class', 'Arrow', 'Pure', 'c', 14),
    (react_id, 'In React, fragments help in:', 'Multiple return elements', 'CSS styling', 'State changes', 'Performance only', 'a', 15),
    (react_id, 'Controlled component in React means:', 'State is managed by DOM', 'State is managed by React', 'Props only', 'None', 'b', 16),
    (react_id, 'useRef hook is used for:', 'Styling', 'Referencing DOM elements', 'State update', 'Context API', 'b', 17),
    (react_id, 'StrictMode in React is used for:', 'Debugging', 'Styling', 'Routing', 'Performance', 'a', 18),
    (react_id, 'Suspense in React is used for:', 'State', 'Lazy loading', 'Routing', 'Styling', 'b', 19),
    (react_id, 'Server-side rendering (SSR) is mainly supported in:', 'React Native', 'Next.js', 'Angular', 'Express', 'b', 20);

END $$;