import { useState } from "react";
import { Button, Input } from "../../../../common";

export const SearchBar = (props) => {
  const [input, setInput] = useState("");

  return (
    <form
      className={props.className}
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(input);
      }}
    >
      <Input
        className="form-control"
        type="search"
        id="search"
        inputPlaceholder={props.inputPlaceholder}
        inputValue={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Button type="submit" buttonText="Search" />
      <Button
        handleClick={() => {
          setInput("");
          props.onSubmit(input);
        }}
        buttonText="Clear"
      />
    </form>
  );
};

export default SearchBar;
