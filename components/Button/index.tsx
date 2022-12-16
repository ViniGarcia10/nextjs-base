import { Button } from "./styles";

type PropsBtnSubmit = {
  loading?: boolean;
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined 
};

export function ButtonSubmit({ loading, title, onClick, type = 'submit' }: PropsBtnSubmit) {
  return (
    <Button onClick={onClick} disabled={loading} type={type}>
      {(loading && (
        <div className="spinner-border spinner-border-sm " role="status" />
      )) ||
        title}
    </Button>
  );
}
