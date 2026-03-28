Question: What are programming language design evaluation criteria?
Answer:
- readability
- writability
- reliability
- cost
---
Question: What are two influences on language design?
Answer:
1. **computer architecture**: the von Neumann fetch-execute-cycle lends itself to imperative programming
2. **program design methodologies**: they lead to paradigms, which influence language design
---
Question: What are categories of languages?
Answer:
- **imperative**: variables, assignments, iteration (C, C++, Perl, scripting and OOP lang)
- **functional**: make computations by applying functions to parameters (LISP, Scheme, ML)
- **logic**: rule-based, no particular order (Prolog)
- **markup/programming hybrid**: markup languages extended to support programming (JSTL, XSLT)
---
Question: What are some design tradeoffs?
Answer:
- **reliability vs cost of execution**: Java checks indexes of all array references
- **readability vs writability**: APL provides many operators, complex programs are compact and hard to read
- **writability vs reliability**: C++ pointers are flexible but unreliable
---
Question: What are some implementation methods?
Answer:
1. **Compilation**: runs on the CPU, program translated to machine language, good for large commercial applications
2. **Pure interpretation**: doesn't run directly on the CPU, interpreted by interpreter, good for small programs
3. **Hybrid**: compromise between compilation and pure interpretation, like Java
---
Question: What are the phases of compilation?
Answer:
1. **lexical analysis**: convert characters to lexical units
2. **syntax analysis**: transform lexical units into parse trees (syntactic structure)
3. **semantics analysis**: generate intermediate code
4. **code generation**: generate machine code
---
Question: What is an interpreter?
Answer: A compiled program running natively on the system. Some tasks are performed every time the program runs, making interpreted programs 10-100x slower than compiled programs
---
Question: How does a hybrid language run?
Answer: It takes the parts of compilation that can be done once, does them, then uses an interpeter for the rest. It uses a high level language translated to an intermediate language that allows easy interpretation.
---
Question: What are some early programming languages?
Answer:
- Zuse's Plankalkül (1945) - published in 1972, never implemented
- Pseudocode: like assembly, better than machine coding (40s and 50s)
- Fortran: 1 (1957) index registers, floating point hardware, genealogy begins here. ints start with i, j, k, l, m, or n
- Lisp: List Processing Language, atoms and lists, used for AI
- Scheme: small, MIT 1970s, func as first class entities
---
Question: What was ALGOL 60 like?
Answer:
- result of attempt to design a universal language
- added begin and end, no I/O
- first language with syntax formally defined (BNF)
- all subsequent imperative languages based on it
- never widely used
---
Question: What was COBOL like?
Answer:
- goal was a computer language the common man could use to write code in natural language
- computerizing business records
- verb was first
- super specific compiler versions
- required for DoD projects
---
Question: What was BASIC like?
Answer:
- Dartmouth wanted to create a 'pleasant and friendly' language
- first time user was a primary concern
- beginning of time sharing
- no loops, just GOTOs
---
Question: What were APL and SNOBOL like?
Answer:
- dynamic typing and dynamic storage allocation
- APL programs are very difficult to read
- SNOBOL had powerful string pattern matching
---
Question: What are some later languages?
Answer:
- PASCAL: used for teaching programming
- C: popular because it was used in Unix
- Ada: huge design effort, compiler took 5 years, required by DoD for a time
- Smalltalk: first OO language, pioneered GUI
- C++: procedural and OOP
- Swift: Apple replacement for Objective C
- Java: based on C++ but simplified, only OOP, references, no pointers
---
Question: What are syntax and semantics?
Answer: Syntax and semantics define a language
- **syntax**: form or structure of expressions, statements
- **semantics**: meaning of the expressions, statements
---
Question: What is some language design terminology?
Answer:
- **sentence**: string of characters over an alphabet
- **language**: set of sentences
- **lexeme**: lowest level syntactic unit of a language
- **token**: category of lexemes
- **recognizers**: reads input strings and decides if they belong to the language (syntax analyzer)
- **generators**: generates sentences of a language
---
Question: What are context free grammars?
Answer: language generators, meant to describe the syntax of natural language
---
Question: What is Backus-Naur Form (BNF)?
Answer:
- like a context-free grammar, invented to describe the syntax of ALGOL 58
- abstractions represent nonterminal and terminal symbols (lexemes & tokens)
- rule has LHS (nonterminal) and RHS (string of terminals and nonterminals)
- goal of syntax analysis is to look at code and decide if it's syntactically correct
- lists are described using recursion
- a LHS can have more than one RHS
---
Question: What is a derivation?
Answer: A repeated application of rules, starting with start and ending with a sentence (all terminals)
- every string of symbols is a **sentential form**
- a **sentence** is a sentential form that has only terminal symbols
- can be done top-down or bottom-up: all can be done bottom-up, some can't be done top down
---
Question: What is a leftmost derivation?
Answer: the leftmost nonterminal in each sentential form is the one that is expanded (LL parser)
---
Question: What is a parse tree?
Answer: a hierarchical representation of a derivation that shows the order of execution
- leaf nodes are the source code
- root should be the start symbol
---
Question: What is an ambiguous grammar?
Answer: A grammar whose sentential form has two or more parse trees
- for an unambiguous grammar, break the rule into two
- higher precedence has to be done lower in the parse tree
---
Question: How are semantics notated?
Answer: There's no single notation for semantics
- **operational semantics**: describe the meaning of a program by executing its statements on a machine, relies on natural language, have to compare start to end to see what changed
- **denotational semantics**: define a mathematical object for each language entity, state of the program is the values of all current variables
- **axiomatic semantics**: based on formal logic (predicate calculus), has precondition, postcondition
---
Question: What are the two parts of syntax analysis?
Answer:
1. **lexical analyzer**: low level, a finite automaton based on a regular grammar
2. **syntax analyzer**: parser, a push-down automaton based on a context-free grammar (BNF - nearly all syntax analysis is based on BNF)
---
Question: Why separate lexical and syntax analysis?
Answer:
- lexical analysis is less complex, separating them simplifies the parser
- separation allows the optimization of the lexical analyzer
- syntax analyzer is portable, lexical analyzer is not
---
Question: What is a lexical analyzer?
Answer: a pattern matcher for character strings
- it identifies substrings of the source that belong together (lexemes)
- lexemes match a character pattern associated with a category (tokens)
- there's usually a `lex()` function called by the parser when it needs the next token
---
Question: What are 3 approaches to lexical analysis?
Answer:
1. formal description of tokens: construct a table-driven lexical analyzer
2. state diagram of tokens: write program that implements the state diagram
3. state diagram of tokens: hand-construct a table-driven implementation of the state diagram
---
Question: What is the goal of the parser?
Answer:
- find all syntax errors
- produce the parse tree
---
Question: What are the two categories of parsers?
Answer:
**Top Down**
- starts at the root, order is a leftmost derivation, build parse tree in preorder
- recursive descent (coded)
- LL parsers (table driven)
**Bottom Up**
- starts at the leaves, order is a rightmost derivation
- given right sentential form, determine substring that it's the RHS of
- most common are in the LR family
---
Question: What is recursive descent parsing?
Answer:
- an LL parser
- there's a subprogram for every nonterminal in the grammar
- EBNF is ideal because it minimizes the number of nonterminals
---
Question: What is the left recursion problem?
Answer: If a grammar has left recursion, it can't be the basis of a top-down parser.
- example: a non-terminal as the first element on the RHS
- the grammar can be modified to remove it
---
Question: What is the pairwise disjointness test?
Answer: the inability to determine the correct RHS on the basis of one token of a lookahead
- left factoring can resolve this problem
---
Question: What does a bottom-up parser do?
Answer: Find the correct RHS in a right-sentential form to reduce to get the previous right-sentential form in the derivation
- the handle of a sentential form is its leftmost simple phrase
- most common is the LR family of shift-reduce parsers
---
Question: What are the steps of the shift reduce algorithm?
Answer:
- **reduce**: replace the handle on the top of the parse stack with its corresponding LHS
- **shift**: move the next token to the top of the parse stack
---
Question: What are the advantages of LR parser?
Answer:
- they work for nearly all grammars
- work on more grammars than other bottom-up parsers
- as efficient as other bottom-up parsers
- detect syntax errors quickly
---
Question: What are attributes that characterize variables?
Answer:
- name
- address
- value
- type
- lifetime
- scope
---
Question: What's the difference between a keyword and a reserved word?
Answer: A **keyword** is only reserved in certain contexts (requires a more complex lexical analyzer), a **reserved word** is a special word that can't be used as a user-defined name
---
Question: What is binding, and when does it happen?
Answer: association between an entity and an attribute
- language design time (operator symbols to operations)
- language implementation time (floating point type to representation)
- compile time (variable to type in Java)
- load time (C static var to memory cell)
- runtime (nonstatic local var to memory cell)
---
Question: Define static vs dynamic
Answer:
- a binding is **static** if it first occurs before runtime and doesn't change during execution
- a binding is **dynamic** if it first occurs during execution or changes during execution
---
Question: What is lifetime?
Answer: the time between allocation and deallocation
---
Question: What are the four different lifetimes?
Answer:
1. **static**: bound prior to runtime, through execution, can't do recursion
2. **stack dynamic**: the usual kind
3. **explicit heap dynamic**: allocated with malloc/free or new/delete
4. **implicit heap dynamic**: allocation/deallocations caused by assignment (string and array in JS)
---
Question: What is scope?
Answer: the range of statements over which a variable is visible
- local: inside a unit
- non-local: visible in unit but not declared there
- global: special category of non-local
---
Question: What is the referencing environment?
Answer: the collection of all names visible in a statement
---
Question: What are the different kinds of constants?
Answer:
- **named constants**: bound to value only when bound to storage, like `final` in Java, dynamic but read-only
- **manifest constants**: what C++ does, finds all mentions and replaces them, easy to write
---
Question: Explain Fortran's historical significance. Why did it "dramatically change forever the way computers are used"?
Answer: Fortran (1957) was the first widely used high-level compiled language. Before Fortran, all scientific programming was done in assembly or machine code. Its success demonstrated that the overhead of a compiler was acceptable. It essentially invented the concept of a practical programming language, shifting computing from a hardware-centric to a software-centric activity.
---
Question: Lisp pioneered functional programming. What are the key characteristics of functional programming as illustrated by Lisp, and what does it mean to say there is "no need for variables or assignment"?
Answer: Functional programming, as pioneered by Lisp, computes results by applying and composing functions rather than by sequentially updating the state of variables. In a pure functional style, there is no "state" to modify—computation is expressed through recursion (instead of loops) and conditional expressions (instead of branching on mutable state).
---
Question: Describe two ways in which ALGOL 60 influenced subsequent programming languages, even though it never achieved widespread commercial use.
Answer:
1. BNF notation: ALGOL 60 introduced the use of Backus-Naur Form (BNF) as the formal method for describing programming language syntax. This became the universal standard for language specification and is still used today. 
2. Structural concepts: ALGOL 60 introduced block structure (nested scopes with local variables), recursive procedures, and a clean type system. These concepts were inherited by virtually every major imperative language that followed, including Pascal, C, and Ada.
---
Question: COBOL was designed for business data processing. What design requirements drove its features, and who led the effort to create it?
Answer: COBOL (Common Business Oriented Language) was designed to process business records efficiently. Key requirements included: (1) the ability to handle large volumes of decimal data and file I/O for record-keeping; (2) an English-like syntax so that non-technical managers could read (if not write) programs; and (3) machine independence so programs could run across different hardware.
---
Question: What problem was PL/I intended to solve, and why was its approach ultimately considered a failure by many in the language design community?
Answer: PL/I was designed to be a single language that could handle both scientific and business applications. However, the resulting language was enormous and overly complex. Many new features were poorly designed, making it too large and too complex to learn and use well.
---
Question: Compare and contrast C and Ada in terms of their design goals, intended application domains, and historical context.
Answer: C (1972) was designed for systems programming. C prioritizes power and low-level control—it has a powerful set of operators but intentionally weak type checking, giving programmers flexibility at the cost of safety. Ada was the result of a massive design effort spanning nearly a decade. It was designed for safety-critical, real-time, embedded systems. Ada includes strong type checking, elaborate exception handling, generic units, and built-in concurrency via tasking. Where C prioritizes programmer freedom, Ada prioritizes correctness and reliability.
---
Question: How does Java's design philosophy differ from C++? What features did Java deliberately omit from C++, and why?
Answer: Java was designed to be a simpler, safer, and more portable alternative to C++. It was originally aimed at embedded electronic devices. Java omitted struct, union, enum, pointer arithmetic, and half of C++'s assignment coercions. Java uses references instead of raw pointers. It supports only OOP, which simplifies the language model. Java's portability is achieved through the Java Virtual Machine (JVM) concept with JIT compilers—programs compile to bytecode that runs on any JVM, not to native machine code.
---
Question: The chapter covers programming languages spanning roughly 70 years of history. Identify what you consider the three most pivotal "turning points" in programming language evolution covered in this chapter and justify your choices.
Answer: 1. Fortran I (1957): The first practical compiled high-level language, proving compilation was viable and shifting computing from assembly-level thinking to algorithmic thinking.
2. SIMULA 67 / Smalltalk: The invention and then full realization of object-oriented programming. SIMULA 67 introduced classes and objects; Smalltalk showed that a full OOP paradigm was practical.
3. ALGOL 60: Even though it wasn't commercially successful, ALGOL 60 introduced block structure, recursion, and BNF syntax description