import { IQuestion } from "./question.interface";

export const CROSSWORD_IMAGE_URL =
  "https://talentica-js-saviour-hunt-public-files.s3.ap-south-1.amazonaws.com/Round-2-Crossword.png";

const CODE_SNIPPET_FOR_E_FREQUENCY = `const text = \`Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Nam condimentum viverra libero, non vehicula magna dignissim
  eget. Duis eleifend consectetur tortor ac interdum. Donec sem
  sapien, cursus nec lectus a, semper tempus purus. Aliquam sit amet
  augue lobortis, viverra metus ac, fringilla ante. Aliquam neque
  nisi, ultrices quis risus at, porta iaculis odio. Aliquam lectus
  tellus, tempus eu nulla sed, tincidunt venenatis sapien. Sed varius
  enim sed massa maximus efficitur. Sed in diam ut augue pharetra
  faucibus eu sed ex. Morbi vel augue ac justo auctor condimentum quis
  eu elit. Ut efficitur tincidunt sodales. Aenean at velit eu justo
  facilisis euismod. Etiam eleifend elementum ante at aliquet.\`;

function simple_count(text) {
  const N = 10000;
  console.time("simple benchmarking");
  for (let i = 0; i < N; i++) {
    var count = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "e") {
        count += 1;
      }
    }
  }
  console.timeEnd("simple benchmarking");
  return count;
}

function complicated_count(text) {
  const N = 10000;
  console.time("complicated benchmarking");
  for (let i = 0; i < N; i++) {
    var count = 0;
    while (text.length) {
      if (text.charAt(0) === "e") {
        count += 1;
      }
      text = text.slice(1);
    }
  }
  console.timeEnd("complicated benchmarking");
  return count;
}

simple_count(text); // 28.193 ms
complicated_count(text); // 0.376 ms
`;

const CODE_SNIPPET_FOR_REACTIVE_VALUE = `const person: { name: string, age: number } = { name: "Alice", age: 12 };
const reactivePerson: { name: string, age: number } = useGetReactiveValue(person);
reactivePerson.name = "Bob";
`;

const QUESTION_FOR_MATRIX_MULTIPLICATION = `Why does one of the O(n^3) methods significantly outperform the others in matrix multiplication, including the Strassen Matrix Multiplication Algorithm with a complexity of O(n lg 7), especially when the input size is 1024, despite their near-identical nature? and which one is faster?
Method 1: This function iterates over each row of matrix A and each column of matrix B. For each cell, it calculates the sum of the products of the corresponding elements from the ith row of matrix A and the jth column of matrix B. The result is then stored in the corresponding cell of the result matrix, which is at the ith row and jth column.
Method 2: This function iterates over each column of matrix B and each column of matrix A. For each cell, it calculates the sum of the products of the corresponding elements from the ith row of matrix A and the jth column of matrix B. The result is then stored in the corresponding cell of the result matrix, which is at the ith row and jth column.
Method 3: Strassen Matrix Multiplication (Divide and conquer)`;

export const ACROSS_QUESTIONS: Array<IQuestion> = [
  {
    position: 3,
    question:
      "We aim to determine the frequency of 'e' in a provided text. Our approach involves a straightforward logic where we iterate through each character, incrementing the count each time we encounter 'e'. However, a friend presents a more complex method, asserting that it's faster. Initially, we were skeptical, but after benchmarking both solutions, we found that not only was our friend's method faster, but it was also 100 times quicker. What could be the reason for the superior speed of the second solution?",
    codeSnippet: CODE_SNIPPET_FOR_E_FREQUENCY,
    hint: "Hint: (5, 6)",
  },
  {
    position: 6,
    question: QUESTION_FOR_MATRIX_MULTIPLICATION,
    hint: "Hint: (3, 7)",
  },
  {
    position: 8,
    question:
      "In traditional programming languages such as C and Java, there's a clear distinction between functions and data structures. However, in languages like JavaScript, this boundary can be blurred, allowing us to use functions alone, without relying on built-in data structures, to create complex data structures such as linked lists and trees. OR This feature allows us to create a tuple like data structure in JavaScript without using any internal data structures of JavaScript such as arrays, sets, maps etc. What is this feature?",
    hint: "Hint: (7)",
  },
];

export const DOWN_QUESTIONS: Array<IQuestion> = [
  {
    position: 1,
    question:
      "Suppose a malicious actor has embedded an invisible iframe of your banking transaction page on a different site. If an unsuspecting user interacts with it, a transaction could be initiated on their behalf. This is possible because the user is already logged in on another tab, and the browser automatically sends the session cookie. The server, assuming it's a legitimate request, executes the transaction. Let's assume that there's no OTP required for smaller Answer transactions. What measure can we implement to prevent such a situation?",
    hint: "Hint: (8, 6)",
  },
  {
    position: 2,
    question:
      "React in its document have guideline for hooks, for example you can't use it inside the loops or condition. What react might be using for such limitations?",
    hint: "Hint: (5)",
  },
  {
    position: 4,
    question:
      "A web application depends largely on dynamic script generation. How can CSP be configured to allow dynamic script execution without using 'unsafe-inline,' while keeping a solid security posture?",
    hint: "Hint: (6)",
  },
  {
    position: 5,
    question:
      "In Node.js, which library is responsible for handling asynchronous I/O operations and interfacing with the operating system?",
    hint: "Hint: (5)",
  },
  {
    position: 7,
    question:
      "In a React project, you come across a custom hook useGetReactiveValue that returns an object. When a property of this object is modified, it triggers a re-render of the component. Which JavaScript feature is likely being used inside this hook, alongside useState , to create this behaviour?",
    codeSnippet: CODE_SNIPPET_FOR_REACTIVE_VALUE,
    hint: "Hint: (5)",
  },
];
