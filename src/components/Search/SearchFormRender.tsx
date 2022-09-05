import {FormEvent} from 'react'
import {Field} from 'react-final-form'
import type {FormRenderProps} from 'react-final-form'
import {Form} from 'reactstrap'
import Input from '../Shared/Input'
import SubmitButton from '../submitButton/SubmitButton'
import {CommonConsts} from '../../../interfaces'

type Props = FormRenderProps & {
  commonConsts?: CommonConsts
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
  text?: string
  className?: string
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default ({commonConsts, ...props}: Props): JSX.Element => {
  // console.log('props render', props)
  return <Form onSubmit={props.handleSubmit} inline className="d-flex mt-1">
  <Field
    name='term'
    type="search"
    placeholder={commonConsts?.search}
    className="me-2"
    component={Input}
  />
  <SubmitButton
    text={commonConsts?.search}
    className='btn-outline-light'
    {...props}
  />
</Form>
}


// import React from "react";
// import { render } from "react-dom";
// import Styles from "./Styles";
// import { Form, Field } from "react-final-form";
// import CheckboxInput from "./components/CheckboxInput";
// import RadioInput from "./components/RadioInput";
// import TextInput from "./components/TextInput";
// import NumberInput from "./components/NumberInput";
// import TextAreaInput from "./components/TextAreaInput";
// import SelectInput from "./components/SelectInput";
// import MultiSelectInput from "./components/MultiSelectInput";
// import MultiCheckboxInput from "./components/MultiCheckboxInput";

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// type Stooge = "larry" | "moe" | "curly";
// interface Values {
//   firstName?: string;
//   lastName?: string;
//   employed: boolean;
//   favoriteColor?: string;
//   toppings?: string[];
//   sauces?: string[];
//   stooge: Stooge;
//   notes?: string;
// }

// const onSubmit = async (values: Values) => {
//   await sleep(300);
//   window.alert(JSON.stringify(values, undefined, 2));
// };

// const App: React.FC = () => (
//   <Styles>
//     <h1>🏁 React Final Form</h1>
//     <h2>Strongly Typed Values with TypeScript</h2>
//     <p>
//       Strongly Typed form values and field values. Each input requires a
//       specific type, which is provided by a JSX generic specification on the
//       Field component.
//     </p>
//     <a href="https://github.com/erikras/react-final-form#-react-final-form">
//       Read Docs
//     </a>
//     <Form
//       onSubmit={onSubmit}
//       initialValues={{ stooge: "larry", employed: false }}
//       render={({ handleSubmit, form, submitting, pristine, values }) => (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>First Name</label>
//             <Field<string>
//               name="firstName"
//               component={TextInput}
//               placeholder="First Name"
//             />
//           </div>
//           <div>
//             <label>Last Name</label>
//             <Field<string>
//               name="lastName"
//               component={TextInput}
//               placeholder="Last Name"
//             />
//           </div>
//           <div>
//             <label>Age</label>
//             <Field<number>
//               name="age"
//               component={NumberInput}
//               placeholder="Age"
//             />
//           </div>
//           <div>
//             <label>Employed</label>
//             <Field<boolean>
//               name="employed"
//               type="checkbox"
//               component={CheckboxInput}
//             />
//           </div>
//           <div>
//             <label>Favorite Color</label>
//             <Field<string> name="favoriteColor" component={SelectInput}>
//               <option />
//               <option value="#ff0000">❤️ Red</option>
//               <option value="#00ff00">💚 Green</option>
//               <option value="#0000ff">💙 Blue</option>
//             </Field>
//           </div>
//           <div>
//             <label>Toppings</label>
//             <Field<string[]> name="toppings" component={MultiSelectInput}>
//               <option value="chicken">🐓 Chicken</option>
//               <option value="ham">🐷 Ham</option>
//               <option value="mushrooms">🍄 Mushrooms</option>
//               <option value="cheese">🧀 Cheese</option>
//               <option value="tuna">🐟 Tuna</option>
//               <option value="pineapple">🍍 Pineapple</option>
//             </Field>
//           </div>
//           <div>
//             <label>Sauces</label>
//             <div>
//               <label>
//                 <Field<string>
//                   name="sauces"
//                   component={MultiCheckboxInput}
//                   type="checkbox"
//                   value="ketchup"
//                 />{" "}
//                 Ketchup
//               </label>
//               <label>
//                 <Field<string>
//                   name="sauces"
//                   component="input"
//                   type="checkbox"
//                   value="mustard"
//                 />{" "}
//                 Mustard
//               </label>
//               <label>
//                 <Field<string>
//                   name="sauces"
//                   component="input"
//                   type="checkbox"
//                   value="mayonnaise"
//                 />{" "}
//                 Mayonnaise
//               </label>
//               <label>
//                 <Field<string>
//                   name="sauces"
//                   component="input"
//                   type="checkbox"
//                   value="guacamole"
//                 />{" "}
//                 Guacamole 🥑
//               </label>
//             </div>
//           </div>
//           <div>
//             <label>Best Stooge</label>
//             <div>
//               <label>
//                 <Field<Stooge>
//                   name="stooge"
//                   component={RadioInput}
//                   type="radio"
//                   value="larry"
//                 />{" "}
//                 Larry
//               </label>
//               <label>
//                 <Field<Stooge>
//                   name="stooge"
//                   component={RadioInput}
//                   type="radio"
//                   value="moe"
//                 />{" "}
//                 Moe
//               </label>
//               <label>
//                 <Field<Stooge>
//                   name="stooge"
//                   component={RadioInput}
//                   type="radio"
//                   value="curly"
//                 />{" "}
//                 Curly
//               </label>
//             </div>
//           </div>
//           <div>
//             <label>Notes</label>
//             <Field name="notes" component={TextAreaInput} placeholder="Notes" />
//           </div>
//           <div className="buttons">
//             <button type="submit" disabled={submitting || pristine}>
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={form.reset}
//               disabled={submitting || pristine}
//             >
//               Reset
//             </button>
//           </div>
//           <pre>{JSON.stringify(values, undefined, 2)}</pre>
//         </form>
//       )}
//     />
//   </Styles>
// );

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);
