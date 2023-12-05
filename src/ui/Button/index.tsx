import styles from "./styles.module.css";

interface ButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={disabled ? styles.buttonDisabled : styles.buttonEnabled}
    >
      {label}
    </button>
  );
};
