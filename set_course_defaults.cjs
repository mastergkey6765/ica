const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

const titleTarget = `const [title, setTitle] = useState(initialData?.title || '');`;
const titleReplacement = `const [title, setTitle] = useState(initialData?.title || 'ICA Fundamentals of TDI Course Exam');`;

const descTarget = `const [description, setDescription] = useState(initialData?.description || '');`;
const descReplacement = `const [description, setDescription] = useState(initialData?.description || 'This Exam addresses all four modules of the Fundamentals of TDI course. To pass you will need to achieve a score of 90% correct answers or better. There is also a Bonus Question included at the end. This Exam is self-grading, meaning that when you press Submit, the Exam platform will automatically email you your test results to the email you list below. Should you fall short of the needed 90% score, you will need to leave the Exam form and re-enter from the original Exam link as you did to arrive here, and simply retake the Exam. ICA tracks all exam submissions related to your email address and a passing score will automatically trigger your Certification Diploma to be sent to the Email Address that you share with us via this Exam Form in the space indicated below. We welcome your feedback in the form of questions or comments. This helps us improve our training and clarify any confusion for learners. Direct your feedback to Info@ICAcares.com at your convenience. Thank you ~ ICA Team.');`;

content = content.replace(titleTarget, titleReplacement);
content = content.replace(descTarget, descReplacement);

fs.writeFileSync(path, content);
