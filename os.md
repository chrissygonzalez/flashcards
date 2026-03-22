Question: What does the control unit in the CPU do?
Answer: 
- Fetches instructions
- Keeps track of the next instruction with the program counter
- Selects the ALU operations (there are 50 to 60)
- Executes **load** (read data to a CPU register) and **store** (write data from CPU register to system memory) instructions
---
Question: 3 categories of machine instructions
Answer:
1. **Move Load Store instructions**: move data to/from main memory and CPU registers, and between CPU registers
2. **Arithmetic and Logic instructions**: perform operations on data stored in the CPU registers
3. **Program Control instructions**: branching, conditionals, may save return address
---
Question: What happens to the registers in an interrupt?
Answer: 
- the state of the CPU registers is saved into the stack memory of the interrupted process
- Register contents are restored when the process is resumed
---
Question: What runs on computer power up?
Answer: The boot routine / boot loader / bootstrap loader. The reset vector also has a branch instruction to its memory location.
---
Question: What does the boot routine do?
Answer: 
- Initializes hardware resources (serial, USB, etc.)
- Locates the kernel, loads it into memory, starts it running
- Sometimes, it loads a secondary boot loader from disk
---
Question: Why might the interrupt vector table move?
Answer: 
On boot, the kernel is moved into main memory. It may then move the interrupt vector table to also be within main memory.
---
Question: What happens if the R/nW signal is high?
Answer: the data bus is driven by the memory chip, the memory produces data
---
Question: What happens if the R/nW signal is low?
Answer: the data bus is driven by the CPU, the memory accepts data
---
Question: How do you seed a random number?
Answer: `srand(time(NULL));`
---
Question: Generate a random number between 1 and 5?
Answer: `(rand() % 5) + 1;`
---
Question: `open()` function signature
Answer: `open(char *path, int flags)`
- flags must include an access mode: `O_RDONLY | O_WRONLY | O_RDWR`
---
Question: `read()` function signature
Answer: `read(int fd, void buf[count], size_t count)`
- `buf` is the address where the buffer starts
- reads from the fd into the buffer
---
Question: `write()` function signature
Answer: `write(int fd, const void buf[count], size_t count)`
---
Question: What is a jiffy?
Answer: The interval between two system timer interrupt ticks (in Linux).
- `jiffies` is the number of ticks that have occurred since the system booted
- `HZ` is the number of timer interrupts per second
- there are `HZ` jiffies in a second, and there are `HZ` timer interrups in a second
---
Question: What are some jiffy conversion functions?
Answer:
- `jiffies_to_msecs(jiffies)` - convert to milliseconds
- `jiffies_to_usecs(jiffies)` - convert to microseconds
- `msecs_to_jiffies(number)` = convert to jiffies
- `usecs_to_jiffies(number)` = convert to jiffies
---
Question: What does `ktime_get_boottime()` do?
Answer: Returns the total elapsed time since the system booted, including time spent in suspend (`ktime_get()` is similar but stops when suspended)
---
Question: What are some ktime convenience functions?
Answer:
- `ktime_sub(const ktime_t lhs, const ktime_t rhs)` - good for calculating elapsed time
- `ktime_to_ms` - converts ktime_t to ms
---
Question: How do you convert HZ to milliseconds?
Answer: milliseconds = 1000 / HZ
---
Question: What are the system calls for get process ID, open a file, close a file, read a file, print to the console, and sleep?
Answer:
- `getpid()`
- `openat()`
- `close()`
- `read()`
- `write()`
- `clock_nanosleep()`
---
Question: How do you print a descriptive error message to `stderr`?
Answer: `perror("descriptive string here");`
---
Question: What is the function signature to create shared memory?
Answer: `shm_open(const char *name, int oflag, mode_t mode);`
- flags: `O_CREAT` (create if doesn't exist), `O_RDWR` (read-write access), `O_RDONLY` (read access)
- mode: permissions in octal
- unlink with `shm_unlink(const char *name);`
---
Question: What do you call after opening shared memory?
Answer: `ftruncate(int file_desc, off_t length);`
- return -1 on error, sets `errno`
---
Question: What is the function signature for `mmap`?
Answer: `void *mmap(void addr[length], size_t length, int prot, int flags, int fd, off_t offset);`
- starting address is in `addr` -- if NULL, the kernel will choose
- `prot` is what's allowed: `PROT_READ`, `PROT_WRITE`, etc., separate with `|`
- flags: use `MAP_SHARED`
- unmap with `munmap(void *addr, size_t len);`
---
Question: How many bytes can be addressed with N address bits?
Answer: 2^N
---
Question: How does the CPU communicate with devices?
Answer:
- writing to control registers (do something)
- reading from status registers (is it complete?)
- moving data between main memory and local buffers
---
Question: What are the common storage notations?
Answer:
- kilobyte (KB): 1024 bytes (2^10)
- megabyte (MB): 1024 bytes^2  aka 1 million bytes
- gigabyte (GB): 1024 bytes^3  aka 1 billion bytes
- terabyte (TB): 1024 bytes^4
- petabyte (PB): 1024 bytes^5
- exabyte (EB): 1024 bytes^6
---
Question: What happens when a program makes a system call?
Answer:
The CPU pauses the running process, executes the ISR:
- looks up the interrupt vector table
- finds the entry point for the corresponding ISR
- switches to kernel mode
- when the handler finishes, it returns from the interrupt and resumes the interrupted process
---
Question: Where are the timer registers?
Answer: In a device controller, not the CPU
---
Question: What does the scheduler schedule?
Answer: user processes and kernel threads
---
Question: How are system calls implemented?
Answer: There is a system call table that contains pointers to subroutines that implement system calls
- trap -> ISR -> system call table -> routine
- there are about 50-100 system calls
---
Question: How does a process pass parameters to a system call?
Answer:
1. In registers, although there could be more parameters than registers
2. Store them in a block of memory, then pass the address as a param in a register (Linux and Solaris do this)
3. Push them onto the stack (belonging to the process), and the kernel will pop them off
---
Question: In OS design, what's the difference between mechanism and policy?
Answer: A mechanism is how to do something (preempt with OS timer), while a policy is what specifically will be done (the exact tick time).
---
Question: What are the different OS structures (architecture)?
Answer:
- monolithic (original Unix)
- layered / hierarchical
- microkernel (Mach, Minix, part of OS X Darwin)
- modular subsystems / loadable modules (Linux, OSX, Windows)
- hybrid (most modern OSs aren't one pure model)
---
Question: How are user mode programs translated into machine code?
Answer:
1. coding: files (.c or .asm) are written
2. compiling: files are compiled into binary object files (.o) and library files are included (.lib)
3. linking: object files are linked into an absolute module (.out)
---
Question: What is the structure of machine code files?
Answer:
- .txt (low address) contains machine code
- .const contains constants, string literals, etc.
- .data contains global variable (initialized)
- .bss (high address) contains global variables (uninitialized)
- in memory, .txt and .const are stored in the txt segment, .data and .bss are stored in the data segment
---
Question: How are arrays and pointers different?
Answer:
- pointers can be assigned any value, but an array can only represent the same elements it pointed to at instantiation
- a pointer declaration allocates memory to hold an address, but an array declaration allocates memory for the number of elements it holds
- array (and function) names are symbols, can be seen as constant pointers
---
Question: What is a process vs. a program?
Answer: A program is passive, but a process is active. A process is a program in execution or scheduled for execution
---
Question: Starting from the lowest data address, what does a process contain in main memory?
Answer:
- text segment: program code and constants
- data segment: global variables
- heap: memory dynamically allocated at runtime, grows up
- stack: temporary data like saved CPU registers, function parameters, local variables; grows down
---
Question: What states can a process have (generic)?
Answer:
- new: process is being created
- ready: process waiting to be assigned processor
- running: instructions are being executed
- waiting: process waiting for an event to occur (multiple queues)
- terminated: process has finished execution
---
Question: What are some things included in the PCB?
Answer:
- process ID
- process state
- CPU registers, including the program counter
- CPU scheduling info
- memory management info
- accounting info
- process numbers of parents and children
- allocated resources (I/O, open files)
---
Question: What are the different kinds of schedulers?
Answer:
- short term: runs frequently (ms) so has to be fast, selects while process should run next and allocates CPU for it
- long term: occurs in batch systems, runs infrequently (s or min), controls number of processes admitted for scheduling (degree of multiprogramming)
- medium term: the swapping scheduler, removes a process from memory and stores on disk (suspended)
---
Question: What does the process manager contain?
Answer:
- list or queue with the PCBs as nodes
- scheduler
- dispatcher
---
Question: What is process context switching?
Answer: the CPU registers of the running process are saved prior to selecting another process to run (done by the dispatcher)
---
Question: What is functional context switching?
Answer: the CPU registers of a calling function are saved prior to invoking a called function.
- Responsibility is split between caller and callee
- interrupt function called from the interrupt vector table
- saving the CPU registers of the interrupted routine is the responsibility of the ISR
---
Question: What is the significance of a pid < 0, a pid below 1000, and a pid >= 1000?
Answer:
- below 0 is not valid, this is an error
- 1 - 999: this is a kernel space process
- 1000+: this is a user space process
---
Question: What processes have the lowest pids?
Answer:
1. init is the parent of all user processes, it has no parent (pid = 1)
2. kthreadd is the parent of all kernel processes (pid = 2)
---
Question: What happens when a process terminates?
Answer: 
- its resources are deallocated, except for its entry in the process table
- the process table is released when the parent reads its exit status with `wait()`
- until then, the process is a **zombie**
- if the parent terminates before the child, it becomes an **orphan** and its new parent is `init`
---
Question: What is shared memory, and how is it used?
Answer: Shared memory is one model for inter process communication.
- it's administered by the processes, not the OS
- a major issue is synchronization of actions
- to create use `shm_open()`
- then set the size with `ftruncate()`
- finally memory map it with `mmap()`
---
Question: What is message passing and how is it used?
Answer: Message passing is one model for inter process communication
- message size is fixed or variable
- the IPC facility (from the OS) provides `send()` and `receive()`
- establish a communication link, then exchange messages
- direct (bi-directional): name both processes or just recipient explicitly
- indirect (uni- or bi-directional): messages are sent to/from ports or mailboxes
---
Question: What are the options for synchronization?
Answer:
blocking (synchronous)
- send: sender is blocked until OS accepts message
- receive: receiver is blocked until message available
non-blocking (asynchronous)
- send: sends and continues
- receive: receive either valid msg or NULL
if both are blocking, it's a rendezvous (matchmaker)
---
Question: What is buffering?
Answer: a queue of messages attached to a link
- zero capacity = rendezvous
- bounded: sender waits if full
- unbounded: sender never waits
---
Question: Which is better, shared memory or message passing?
Answer:
- message passing is good for smaller data because no synchronization is needed
- shared memory is faster for large data
- message passing is more efficient in multicore systems due to cache coherency difficulties
---
Question: What are pipes?
Answer: a conduit allowing two processes to communicate
---
Question: Describe an ordinary pipe?
Answer:
- can't be accessed outside of the creating process
- typically used between parent/child processes
- producer writes to the write end, consumer reads from the read end
- unidirectional
---
Question: Describe a named pipe?
Answer:
- can be accessed without parent/child relationship
- bidirectional
- several process can use
- blocking by default
---
Question: What 3 networking facts were we supposed to memorize?
Answer:
1. port numbers are 16-bit values
2. all ports below 1024 are well-known
3. the loopback address (127.0.0.1) refers to the system on which the process is running
---
Question: How do you open a socket?
Answer:
- the client opens a socket by specifying its protocol type (TCP or UDP)
- the OS assigns the socket
---
Question: How do remote procedure calls work?
Answer:
- the client side uses a stub as a proxy for the actual procedure on a server
- it locates the server and marshalls the parameters
- the server side stub receives the message, unpacks parameters, and runs the procedure
- stubs have to handle endianness, failure scenarios, and ensure procedure runs exactly once
- typically uses matchmaker service as connection
---
Question: What don't threads share?
Answer: Threads have their own stack, including
- CPU registers of the caller
- function parameters
- local variables
---
Question: What do threads share?
Answer: Threads share:
- the code segment (machine instructions, constants)
- the data segment (global variables)
- files (open file table)
- heap
---
Question: What's the difference between concurrency and parallelism?
Answer:
- Concurrency: time-sharing
- Parallelism: tasks can be performed simultaneously across multiple CPUs
---
Question: What are two kinds of parallelism?
Answer:
- **data parallelism**: different subsets of data distributed across cores, but all performing same task 
- **task parallelism**: different tasks distributed across cores
---
Question: What is Amdahl's law?
Answer: identifies performance gains from adding additional cores to an application with both serial and parallele components
- speedup <= 1 / (S + (1 - S) / N)
- S = serial portion
- N = processing cores
As N approaches infinity, speedup approaches 1 / S
---
Question: What are four multithreading models?
Answer:
1. many-to-one (rare): many user-level threads map to one kernel thread
2. one-to-one: each user-level thread maps to a kernel thread
3. many-to-many: many user-level threads map to many kernel threads (not same num)
4. hybrid: many-to-many, but important threads are one-to-one
NOTE: number of kernel threads is always <= number of user threads
---
Question: What is implicit threading?
Answer: Libraries and compiler features that let you not manage threads at all. Examples include thread pools, OpenMP, Grand Central Dispatch