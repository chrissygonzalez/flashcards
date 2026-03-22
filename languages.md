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
3. **hybrid**: compromise between compilation and pure interpretation, like Java
---
Question: What are the phases of compilation?
Answer:
1. **lexical analysis**: convert characters to lexical units
2. **syntax analysis**: transform lexical units into parse trees (syntactic structure)
3. **semantics analysis**: generate intermediate code
4. **code generation**: generate machine code
---
Question: What is an interpreter?
Answer: A compiled program running natively on the system. Some tasks are performed every time the program runs, making interpreted programs 10-100x slowerthan compiled programs
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
- Smalltalk: first OO language, pioneerd GUI
- C++: procedural and OOP
- Swift: Apple replacement for Objective C
- Java: based on C++ but simplified, only OOP, reference no pointers
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
- **recognizers**: reads input strings and decides if they belong to the langugage (syntax analyzer)
- **generators**: generates sentences of a language
---
Question: What are context free grammars?
Answer: language generators, meant to describe the syntax of natural language
---
Question: What is Backus-Naur Form (BNF)?
Answer:
- like a context-free grammar, invented to describe the syntax of ALGOL 58
- abstractions represent nonterminal and termimal symbols (lexemes & tokens)
- rule has LHS (nonterminal) and RHS (string of terminals and nonterminals)
- goal of syntax analysis is to look at code and decide if it's syntactically correct
- lists are described using recursion
- a LHS can have more than one RHS
---
Question: What is a derivation?
Answer: A repeated application of rules, starting with start and ending with a sentence (all terminals)
- every string of symbols is a **sentential form**
- a **sentence** is a sentential form that has only terminal symbols
---