interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export default function CreateChannelButton({ onClick, children }: Props) {
  return (
    <button onClick={onClick} className="bg-brand-yellow text-brand-black p-1">
      {children}
    </button>
  );
}
