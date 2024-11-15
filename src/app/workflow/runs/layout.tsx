export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col w-full h-screen">{children}</div>;
}
