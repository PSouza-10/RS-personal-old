import { useState } from "react";
import { CheckupContainer } from "./style";

export const CheckupController: React.FC = () => {
  return <CheckupContainer></CheckupContainer>;
};
// const [score, setScore] = useState(2);
//   const [options, setOptions] = useState([
//     { label: "Diabetes", checked: false },
//     { label: "Hipertensão", checked: true },
//     { label: "Colesterol", checked: false },
//     { label: "Triglicerides", checked: false },
//     { label: "Obesidade", checked: false },
//     { label: "Coronariopatia", checked: false },
//   ]);

//   const onOptChange = (idx: number, checked: boolean) => {
//     let newOpts = [...options];
//     newOpts[idx].checked = checked;
//     setOptions(newOpts);
//     if (checked) {
//       setScore(score + 2);
//     } else {
//       setScore(score - 2);
//     }
//   };
//   return (
//     <CheckupContainer>
//       <h1>{score}</h1>
//       <CheckList options={options} onOptionChange={onOptChange} />
//     </CheckupContainer>
//   );
